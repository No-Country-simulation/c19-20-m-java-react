const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // db.json es donde están tus datos
const middlewares = jsonServer.defaults();
const auth = require("json-server-auth");
const permissions = require("./permissions");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

// Middleware para procesar el cuerpo de las solicitudes
server.use(bodyParser.json());

server.use(middlewares);

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
    //validate body
    const body = [
      "name",
      "description",
      "gender",
      "specie",
      "createdBy",
      "status",
      "images",
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
  }

  next();
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
      "image",
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
  }

  next();
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

server.use(router);

server.listen(4000, () => {
  console.log("JSON Server is running on http://localhost:4000");
});
