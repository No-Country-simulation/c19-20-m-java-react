const jsonServer = require("json-server");
const serverJson = jsonServer.create();
const router = jsonServer.router("db.json"); // db.json es donde están tus datos
const middlewares = jsonServer.defaults();
const auth = require("json-server-auth");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const express = require("express");
const multer = require("multer");
const path = require("path");

const server = express();
const cors = require("cors");
const fs = require("fs");
//const marked = require("marked");
const { marked } = require("marked");

// Usar CORS de forma predeterminada para todas las rutas
server.use(cors());

// Middleware para procesar el cuerpo de las solicitudes
server.use(bodyParser.json());

server.use(jsonServer.defaults()); // Middleware de json-server

server.use(middlewares);

let imageId = null;

//?=================================Users===========================
server.use("/users", (req, res, next) => {
  const validateToken = () => {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado. Token requerido." });
    }

    // Verificar si el token es válido
    jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      // Si el token es válido, agregamos la información del usuario a la solicitud
      req.user = decoded; // Esto puede incluir el id, role, etc. del usuario

      //next(); // Continuamos con la solicitud
    });
  };

  if (req.method === "POST") {
    validateToken();
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "El nombre de usuario y la contraseña son obligatorios.",
      });
    }

    // Validar que el nombre de usuario no exista ya
    const existingUser = server.db.get("users").find({ username }).value();
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso." });
    }
  }
  next();
});

server.use("/users/:id", (req, res, next) => {
  next();
});

//?==================================Pets==============================
// Configuración de multer para almacenar los archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // La carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const petId = req.params.id;
    const urlParams = new URLSearchParams(req.url.split("?")[1]);
    const params = {};
    urlParams.forEach((value, key) => {
      params[key] = value;
    });
    const imageId = params.imageId;
    const pet = router.db.get("pets").find({ id: petId }).value();
    const petImages = pet ? pet.images : [];
    let newImageName = null;

    if (pet && pet.images.length >= 3) {
      //return res.status(400).json({ message: "No puedes subir mas de 3 imagenes" });
      cb(new Error("No puedes subir mas de 3 imagenes"), false);
      return;
    }

    petImages.forEach((image) => {
      //Extraer el nombre de la imagen
      const imageName = path.basename(image);
      const [uniqueId, name, specie, createdBy, timestamp] =
        imageName.split("-");

      if (uniqueId === imageId) {
        newImageName = `${uniqueId}-${name}-${specie}-${createdBy}-${timestamp}`;
      }
    });

    const {
      specie = pet.specie,
      createdBy = pet.createdBy,
      name = pet.name,
    } = req.body || {};

    const generateUniqueId = Math.random().toString(36).substr(2, 5);
    const [originalName, extension] = file.originalname.split(".");
    const fileName = newImageName
      ? newImageName
      : `${generateUniqueId}-${name}-${specie}-${createdBy}-${Date.now()}.${extension}`;
    cb(null, fileName); // Nombre único para cada archivo
  },
});

const fileFilter = async (req, file, cb) => {
  if (req.files && req.files.every((file) => file.size > 0.5 * 1024 * 1024)) {
    cb(new Error("El tamaño del archivo no debe exceder 0.5MB"), false);
  } else {
    cb(null, true);
  }
};

// Configurar multer para aceptar un solo archivo llamado 'file' (puedes cambiar el nombre del campo si lo prefieres)
const upload = multer({ storage, fileFilter });

// Configurar la carpeta 'images' para que se pueda acceder desde la URL
server.use("/images", express.static(path.join(__dirname, "images")));
server.use("/images", express.static(path.join(__dirname, "public")));

// Ruta personalizada para '/pets' que maneja GET y POST
server.use("/pets", (req, res, next) => {
  if (req.method === "GET") {
    const pets = router.db.get("pets").value();
    const petsFiltered = pets.filter((specie) => specie.status !== "delete");

    const petsWithLocations = petsFiltered.map((pet) => {
      const owner = router.db.get("users").find({ id: pet.createdBy }).value();
      pet.ubicacion = {
        country: owner.country,
        state: owner.state,
        city: owner.city,
      };
      return pet;
    });
  }

  if (req.method === "POST") {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado. Token requerido." });
    }

    // Verificar si el token es válido
    jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      req.user = decoded;
    });
    // Verificar si se está enviando un archivo
    upload.array("images", 3)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const body = [
        "name",
        "description",
        "gender",
        "specie",
        "createdBy",
        "status",
      ];
      const areAllKeysValidWithMessage = (body, obj) => {
        return body.every((key) => {
          if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
            //return res.status(400).json({ message: `'${key}' es requerido.` });
            return false;
          }
          return true;
        });
      };

      //areAllKeysValidWithMessage(body, req.body);
      const isValid = areAllKeysValidWithMessage(body, req.body);
      if (!isValid)
        return res.status(400).json({ message: `Falta parametros` });

      // Si el archivo es válido y la validación de los otros campos pasó, guardamos la información
      if (req.files && req.files.length > 0) {
        const uploadedFiles = req.files.map((file) => ({
          filename: file.filename,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
        }));

        const onlyPath = uploadedFiles.map((file) =>
          file.path.replace(/\\/g, "/")
        );
        const baseUrl = req.protocol + "://" + req.get("host");
        const fullUrls = onlyPath.map((url) => baseUrl + "/" + url);

        const generateUniqueId = () => {
          return Math.random().toString(36).substr(2, 5);
        };

        const newPet = {
          ...req.body,
          id: generateUniqueId(),
          images: req.files ? fullUrls : null, // Aquí guardamos la ruta del archivo subido
        };

        // Agregar la nueva mascota a la base de datos
        router.db.get("pets").push(newPet).write();

        return res.status(201).json(newPet);
      }
    });
  } else {
    next(); // Continuar con el siguiente middleware si es necesario
  }
});

server.use("/pets/:id", (req, res, next) => {
  const petId = req.params.id;
  const pet = router.db.get("pets").find({ id: petId }).value();

  if (!pet) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  if (req.method === "GET") {
    const owner = router.db.get("users").find({ id: pet.createdBy }).value();

    pet.ubicacion = {
      country: owner.country,
      state: owner.state,
      city: owner.city,
    };
  }

  if (req.method === "PUT") {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No autorizado. Token requerido." });
    }

    // Verificar si el token es válido
    jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      req.user = decoded;
    });

    //validate body
    const body = [
      "name",
      "description",
      "gender",
      "specie",
      "createdBy",
      "status",
    ];

    const areAllKeysValidWithMessage = (body, obj) => {
      return body.every((key) => {
        if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
          return res.status(400).json({ message: `'${key}' es requerido.` });
        }
        return true;
      });
    };

    areAllKeysValidWithMessage(body, req.body);

    //Verifica si el actual user le pertenece la mascota
    if (req.user.id !== pet.createdBy) {
      return res
        .status(404)
        .json({ message: "No tiene permitido editar esta mascota" });
    }

    const updatedPet = {
      ...pet,
      ...req.body,
      images: pet.images,
    };

    console.log("updatedPet", updatedPet);
    router.db.get("pets").find({ id: petId }).assign(updatedPet).write();

    return res.status(200).json(updatedPet);
  }

  //console.log("pet", pet);

  next();
});

//?==================================Images==============================
// Middleware personalizado para verificar
const updateMidleware = (req, res, next) => {
  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const imageId = urlParams.get("imageId");
  const petId = req.params.id;
  const pet = router.db.get("pets").find({ id: petId }).value();
  if (!pet) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  if (!imageId) {
    return res.status(400).json({ message: "imageId es requerido." });
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No autorizado. Token requerido." });
  }

  // Verificar si el token es válido
  jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
  });

  // Verificar si el usuario es el creador de la mascota
  if (req.user.id !== pet.createdBy) {
    return res.status(403).json({
      message: "No tiene permiso para actualizar las imágenes de esta mascota",
    });
  }

  next();
};

const newMidleware = (req, res, next) => {
  console.log("newMidleware", req.file);
  const petId = req.params.id;
  const pet = router.db.get("pets").find({ id: petId }).value();
  if (!pet) {
    return res.status(404).json({ message: "Mascota no encontrada" });
  }

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No autorizado. Token requerido." });
  }

  // Verificar si el token es válido
  jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
  });

  // Verificar si el usuario es el creador de la mascota
  if (req.user.id !== pet.createdBy) {
    return res.status(403).json({
      message: "No tiene permiso para actualizar las imágenes de esta mascota",
    });
  }

  next();
};

server.put(
  "/image/:id",
  updateMidleware,
  upload.single("image"),
  (req, res) => {
    const petId = req.params.id;
    const pet = router.db.get("pets").find({ id: petId }).value();

    const uploadedFile = {
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    };

    const onlyPath = uploadedFile.path.replace(/\\/g, "/");
    const baseUrl = req.protocol + "://" + req.get("host");
    const fullUrls = baseUrl + "/" + onlyPath;
    console.log("onlyPath", fullUrls);
    // pet.images = fullUrls;

    // router.db.get("pets").find({ id: petId }).assign(pet).write();

    return res.status(200).json(pet);
  }
);

server.post("/image/:id", newMidleware, upload.single("image"), (req, res) => {
  const petId = req.params.id;
  const pet = router.db.get("pets").find({ id: petId }).value();

  const uploadedFile = {
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype,
    size: req.file.size,
  };

  const onlyPath = uploadedFile.path.replace(/\\/g, "/");
  const baseUrl = req.protocol + "://" + req.get("host");
  const fullUrls = baseUrl + "/" + onlyPath;
  console.log("onlyPath", fullUrls);

  pet.images = pet.images ? [...pet.images, fullUrls] : [fullUrls];
  router.db.get("pets").find({ id: petId }).assign(pet).write();

  // router.db.get("pets").find({ id: petId }).assign(pet).write();

  return res.status(200).json(pet);
});

server.delete("/image/:id", updateMidleware, (req, res) => {
  const petId = req.params.id;
  const pet = router.db.get("pets").find({ id: petId }).value();

  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const imageId = urlParams.get("imageId");

  const imageIndex = pet.images.findIndex((image) => {
    const imageName = path.basename(image);
    const [uniqueId] = imageName.split("-");
    return uniqueId === imageId;
  });

  if (imageIndex === -1) {
    return res.status(404).json({ message: "Imagen no encontrada" });
  }

  const imagePath = pet.images[imageIndex];
  const relativeImagePath = imagePath.replace(
    `${req.protocol}://${req.get("host")}/`,
    ""
  );

  fs.unlink(relativeImagePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar la imagen" });
    }

    pet.images.splice(imageIndex, 1);
    router.db.get("pets").find({ id: petId }).assign(pet).write();

    return res.status(200).json({ message: "Imagen eliminada correctamente" });
  });
});

//?=====================ESPECIES===============================
server.use("/species", (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No autorizado. Token requerido." });
  }

  // Verificar si el token es válido
  jwt.verify(token, "mi_clave_secreta", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    // Si el token es válido, agregamos la información del usuario a la solicitud
    req.user = decoded; // Esto puede incluir el id, role, etc. del usuario
  });

  next();

  const species = router.db.get("species").value();
  const postsFiltered = species.filter((specie) => specie.status !== "delete");

  res.jsonp(postsFiltered);
});

server.use("/species/:id", (req, res, next) => {
  const id = req.params.id;
  const specie = router.db.get("species").find({ id: id }).value();

  if (!specie) {
    return res.status(404).json({ message: "specie no encontrada" });
  }

  next();
});

server.db = router.db;
server.use(auth);

//?============================================LOGIN==================================
server.post("/auth-login", (req, res) => {
  const { username, password } = req.body;

  // Buscar al usuario por nombre de usuario y contraseña
  const user = server.db.get("users").find({ username }).value();

  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  //Generate TOKEN
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    "mi_clave_secreta", // Una clave secreta para firmar el token (debe ser algo único)
    { expiresIn: "1h" } // El token expirará en 1 hora
  );

  // Enviar la respuesta con el token
  res.json({
    message: "Login exitoso",
    token: token,
    user: {
      id: user.id,
      username: user.username,
      rol: user.role,
    },
  });
});

//?============================================DOCUMENTACION==================================
// Ruta principal para mostrar la documentación
server.get("/document", (req, res) => {
  // Leemos el archivo README.md
  fs.readFile(path.join(__dirname, "DOCUMENT.md"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo README.md");
    }

    // Convertimos el contenido Markdown a HTML usando marked
    const htmlContent = marked(data);

    // Enviamos el HTML como respuesta
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Documentación API</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #007bff; }
            pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; }
            code { background-color: #f4f4f4; padding: 2px 5px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <h1>Documentación de la API</h1>
          <div>${htmlContent}</div>
        </body>
      </html>
    `);
  });
});

server.use(router);

server.listen(4000, () => {
  console.log("JSON Server is running on http://localhost:4000");
});
