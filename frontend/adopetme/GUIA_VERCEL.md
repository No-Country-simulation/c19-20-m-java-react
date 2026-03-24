# Guía para Desplegar Adopetme en Vercel

¡Felicidades! Tu proyecto ha sido configurado correctamente para funcionar en el entorno "Serverless" de Vercel. Al seguir estos pasos, tu frontend y tu `json-server` (backend de prueba) correrán bajo el mismo dominio de Vercel (el backend con datos efímeros para pruebas temporales).

## Pasos para Desplegar (Subir a Vercel)

### Paso 1: Guarda todos estos cambios en tu GitHub
Como los archivos han sido modificados, primero debes subir los cambios al repositorio remoto.
Abre tu terminal en la carpeta principal de tu proyecto y ejecuta:

```bash
git add .
git commit -m "Configurar proyecto para Vercel (vercel.json y server.js)"
git push
```

### Paso 2: Importar en Vercel
1. Ve a [Vercel.com](https://vercel.com/) e inicia sesión con Github.
2. Da clic en el botón **"Add New..."** y selecciona **"Project"**.
3. Busca tu repositorio `c19-20-m-java-react` y da clic en **Import**.

### Paso 3: Configurar la Ruta (Solo si el proyecto no está en la raíz)
Si el código principal de React y `server.js` no está en la raíz del repositorio sino en la carpeta `frontend/adopetme`, debes decírselo a Vercel.
- En la sección **Root Directory**, haz clic en **Edit** y selecciona la carpeta correctar (ej. `frontend/adopetme`).
- Framework Preset debe decir **Create React App**.
- Build Command y Output Directory déjalos como están (Vercel los detecta automáticamente).

### Paso 4: La Variable de Entorno (¡Muy importante!)
Para que el frontend se comunique con el backend temporal en Vercel, debes crear una variable de entorno indicándole buscar el backend en `/api`.
- Despliega la pestaña **Environment Variables**.
- En **Name** escribe: `REACT_APP_API_URL`
- En **Value** escribe: `/api`
- Haz clic en **Add**.

¡Listo! Da clic en **Deploy**. 

Vercel construirá tu frontend y montará tu función `server.js` en una misma URL. Cualquier cuenta nueva o mascota que cargues funcionará correctamente pero se borrará automáticamente de los servidores cada cierto tiempo (lo ideal para un demo).
