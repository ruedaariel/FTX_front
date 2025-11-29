# ✅ Checklist Previa al Deploy del Frontend en Railway

Antes de hacer push y desplegar en Railway, revisá estos puntos:

---

## 📂 Archivos y rutas
- [ ] Verificar que **todos los archivos CSS importados existen** en el repo.
- [ ] Confirmar que los nombres de archivos coinciden exactamente con los `import` (Linux distingue mayúsculas/minúsculas).
- [ ] Asegurarse que imágenes y recursos (`.jpg`, `.png`, `.svg`) estén en Git y con el path correcto.
- [ ] Revisar que no haya imports rotos o rutas relativas incorrectas.

---

## 📦 Dependencias
- [ ] Ejecutar `npm run build` localmente para confirmar que compila.
- [ ] Revisar que todas las librerías usadas en producción estén en `dependencies` (ejemplo: `jwt-decode`).
- [ ] Evitar que dependencias críticas estén en `devDependencies`.

---

## ⚙️ Configuración de Railway
- [ ] En **Settings → Root Directory**, apuntar a la carpeta correcta (ej: `front_react/ftxapp`).
- [ ] Definir variable `PORT=3000` en Railway.
- [ ] Configurar `VITE_API_URL` apuntando al dominio del backend:
  ```env
  VITE_API_URL=https://ftx-back-production.up.railway.app/apiFtx
🌐 CORS en el backend
[ ] En el backend, permitir el dominio del frontend:

ts
export const CORS = {
  origin: ['https://ftx-front-production.up.railway.app'],
  credentials: true,
};
🧪 Validación final
[ ] Acceder al dominio público del frontend generado por Railway.

[ ] Confirmar que carga correctamente y consume el backend.

[ ] Probar login/registro o cualquier flujo que use jwt-decode.

[ ] Revisar que Swagger (/docs) y endpoints del backend respondan desde el frontend.