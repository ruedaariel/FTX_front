# FTX-FitnessTrainingExperience
Diseño de web para trabajo Final OFS

Nuestro desarrollo se centra en la gestión de un emprendimiento de personal trainer. 
Éste no sólo optimiza el trabajo, sino que también abre nuevas oportunidades para generar ingresos. 
La plataforma permitiría ofrecer suscripciones premium con acceso exclusivo a rutinas avanzadas, 
dietas personalizadas y reportes detallados de progreso. Además, se podrían implementar servicios adicionales, 
como asesorías en línea o contenido educativo exclusivo, que serían monetizados.


***************************************************************************************
Integrantes:

Leandro Rueda  --  Gladys Herrera  --  Ariel Rueda

***************************************************************************************

***************************************************************************************
link a drive del proyectoFTX

https://drive.google.com/drive/folders/1IIcywfQIcg7TSjvEWzooir0hSReSqH9t?usp=drive_link
***************************************************************************************

***************************************************************************************
link a figma del proyectoFTX

https://www.figma.com/design/zwNBf6TDoWaksKI3M2e3kZ/FTX?node-id=91-524&t=CgLWjRqYg9zsOKI2-0
***************************************************************************************

***************************************************************************************
link a Trello del proyectoFTX

https://trello.com/b/6YUu1pyr/ftx
***************************************************************************************

***************************************************************************************
link a Carpeta avances Sprint 

https://drive.google.com/drive/folders/15KrbbVwYZnNYGT89tFmmdOzP_D8HUAJw

***************************************************************************************

# FTX_front

Frontend de la plataforma FTX, encargado de brindar la interfaz al usuario y conectar con el backend **FTX:back** para la gestión de entrenadores personales y sus clientes.

---

##  Descripción

El frontend ofrece:
- **Landing page** para presentación y registro.
- **Panel de usuario** para gestionar rutinas, estadísticas y pagos.
- **Panel administrador** para entrenadores, con control de clientes, planes y rutinas.

Se conecta al backend mediante API REST y utiliza JWT para autenticación.

---

##  Tecnologías utilizadas

- **Framework principal:** React + Vite
- **Librerías clave:**
  - React Router DOM
  - Axios
  - Bootstrap / React-Bootstrap
  - Chart.js + React-Chartjs-2
  - Framer Motion
  - React Hook Form + Zod
  - JWT Decode
- Configuración y dependencias completas en `package.json`.

---

##  Requisitos previos

- Node.js (v18+)
- Navegador moderno (desktop y mobile)

---

##  Instalación local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/FTX_front.git
   cd FTX_front

##  Instalar dependencias

    npm install

##  Configurar variables de entorno en .env  

    VITE_API_URL=https://ftxback-production.up.railway.app/apiFtx

##  Ejecutar en modo desarrollo

    npm run dev

##  Variables de entorno

    VITE_API_URL → URL del backend FTX:back (inyectada por Railway)

    Configuración de preview en vite.config.js
    preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: ['ftx.up.railway.app']
    }

##  Estructura de carpetas

    src/components → Componentes reutilizables (UI, formularios, gráficos).
    src/pages → Páginas principales (Landing, Panel Usuario, Panel Entrenador).
    src/services → Conexión con API backend (Axios).
    src/hooks → Hooks personalizados.
    src/assets → Recursos estáticos (imágenes, estilos).

##  Conexion con backend

    El frontend se conecta al backend FTX:back para:

    Registro y login de usuarios.
    Gestión de rutinas y estadísticas.
    Administración de planes y pagos.

##  Autenticación

    Login mediante JWT.
    El token se almacena en localStorage.
    Se utiliza para proteger rutas y validar sesiones.

##  Despliegue

    El proyecto está desplegado en Railway. Las variables de entorno se inyectan automáticamente en el entorno de producción

##  Autores

    Gladys Herrera
    Leandro Rueda
    Ariel Rueda





