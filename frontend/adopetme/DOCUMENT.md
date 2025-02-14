# API Endpoints

## 0. Actualizar una mascota.

- **Método**: `PUT`
- **Ruta**: `/pets/:id`
- **Descripción**: Actualiza una mascota.

  #### Parámetros

  - **Ruta**:
  - `id` (requerido): El ID (string) de la mascota.

  - **Cuerpo de la solicitud**:

  - `json` (requerido): El json con los datos de la mascota a actualizar, que debe ser enviado como json de tipo `application/json`.

  #### Ejemplo de solicitud

```bash
PUT http://localhost:4000/pets/jbqgr


{
     "name": "soe update",
      "description": "descripcion update",
      "gender": "macho",
      "specie": "perro",
      "createdBy":"1",
      "status": "active"
}

```

- **Responde con**:

  - `200 OK`.

  ```json
  {
    "name": "soe update",
    "description": "descripcion update",
    "gender": "macho",
    "specie": "perro",
    "createdBy": "1",
    "status": "active",
    "id": "jbqgr",
    "images": [
      "http://localhost:4000/images/40f70-soe-gato-1-1739471048897.png",
      "http://localhost:4000/images/j6xnr-soe-gato-1-1739471048899.png",
      "http://localhost:4000/images/027qj-soe-gato-1-1739471048900.png"
    ]
  }
  ```

## 1. Subir Nueva Imagen para una mascota.

- **Método**: `GET`
- **Ruta**: `/image/:id`
- **Descripción**: Sube una nueva imagen para la mascota.

  #### Parámetros

  - **Ruta**:
  - `id` (requerido): El ID (string) de la mascota.

  - **Cuerpo de la solicitud**:

  - `file` (requerido): El archivo de la imagen que se desea subir, que debe ser enviado como un campo `image` de tipo `multipart/form-data`.

  #### Ejemplo de solicitud

```bash
POST http://localhost:4000/image/i7cqm
```

- **Responde con**:

  - `200 OK`.

  ```json
  {
    "name": "susi",
    "description": "hola soy susi una mascota muy traviesa y juguetona estoy buscando un hogar nuevo",
    "gender": "macho",
    "createdBy": "1",
    "specie": "gato",
    "status": "active",
    "id": "i7cqm",
    "images": [
      "http://localhost:4000/images/55quj-susi-gato-1-1739474170736.png",
      "http://localhost:4000/images/329m8-susi-gato-1-1739474178912.png",
      "http://localhost:4000/images/0lcms-susi-gato-1-1739483777741.png"
    ],
    "ubicacion": {
      "country": "Mexico",
      "state": "Yucatan",
      "city": "Merida"
    }
  }
  ```

## 2. Actualizar imagen de mascota

- **Método**: `PUT`
- **Ruta**: `/images/:id`
- **Descripción**: Actualiza una imagen.

  #### Parámetros

  - **Ruta**:
  - `id` (requerido): El ID (string) de la mascota a la que pertenece la imagen.

  - **Parámetro de consulta (query parameter)**:
  - `imageId` (requerido): El ID de la imagen que se va actualizar. Un identificador adicional de la imagen pasado como parámetro de consulta. <br><br>Se obtiene de la url de la imagen ejemplo: http://localhost:4000/images/<span style="color: red;">4ck8</span>-susi-gato-1-1739474178912.png <br><br><span style="color: red;">4ck8</span> seria el ID de la imagen.

  - **Cuerpo de la solicitud**:
  - `file` (requerido): El archivo de la imagen que se desea subir, que debe ser enviado como un campo `image` de tipo `multipart/form-data`.

  #### Ejemplo de solicitud

```bash
PUT http://localhost:4000/images/i7cqm?imageId=4ck8
```

- **Responde con**:

- `200 OK`: Mascota con las imagen actualizada.

```json
{
  "name": "susi",
  "description": "hola soy susi una mascota muy traviesa y juguetona estoy buscando un hogar nuevo",
  "gender": "macho",
  "createdBy": "1",
  "specie": "gato",
  "status": "active",
  "id": "i7cqm",
  "images": [
    "http://localhost:4000/images/4ck8n-susi-gato-1-1739471532586.webp"
  ]
}
```

## 3. Eliminar una imagen de mascota

- **Método**: `DELETE`
- **Ruta**: `/images/:id`
- **Descripción**: Elimina una imagen.

  #### Parámetros

  - **Ruta**:
  - `id` (requerido): El ID (string) de la mascota a la que pertenece la imagen.

  - **Parámetro de consulta (query parameter)**:
  - `imageId` (requerido): El ID de la imagen que se va a eliminar. Un identificador adicional de la imagen pasado como parámetro de consulta.

  #### Ejemplo de solicitud

```bash
DELETE http://localhost:4000/image/i7cqm?imageId=zq7og
```

- **Responde con**:

- `200 OK`

```json
{
  "message": "Imagen eliminada correctamente"
}
```
