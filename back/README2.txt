Paquetes que recuerdo haber instalado (por lo menos desde la parte de base de datos)

//sirve para entregar archivos estáticos (como HTML, CSS, JS, imágenes, etc.) desde tu servidor NestJS
npm i --save @nestjs/serve-static 
//trabajar con bases de datos usando TypeORM en NestJS, y específicamente MySQL como sistema gestor de base de datos
npm i --save @nestjs/typeorm typeorm mysql2

//es para usar SnakeNamingStrategy (usa esa notacion en la base de datos y cuando le paso los nombres a la bd, no hay problemas de formato de escritura de nombres)
//se "usa" en el database.module
npm install typeorm-naming-strategies

//para crear la migracion - ojo ANTES LEVANTAR LA bd - este comando es para CommonJS (no ESM)
npx ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate migraciones/initial --dataSource src/config/data.source.ts

//para la migracion incorporar en el package.json
"scripts": {
  "migration:generate": "ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate migraciones/initial --dataSource src/config/data.source.ts",
  "migration:run": "ts-node --require tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run --dataSource src/config/data.source.ts"
}
ejecutar: npm run migration:generate
npm run migration:run
// EN LAS BD CONTROLAR QUE LOS CAMPOS NO SEAN SENCIBLES S LSD MSYUSCULAS para ello los campos deben tener _ci. por ejemplo utf8mb4_0900_ai_ci (sino no funcionan varias busquedas por nombre, por ejmplo) 
//PARA LA BD, CREAR A MANO en mysql, la base de datos: CREATE DATABASE IF NOT EXISTS pruebaFTX

//Se usan en DTO - da error al levantar el servidor
npm install @nestjs/mapped-types

//tener instalado este Paquete
npm install @nestjs/config
npm install @nestjs/typeorm typeorm @nestjs/config



//Validaciones DTO
npm install class-validator class-transformer

//CREO Q HAY Q INSTALAR ALGO PARA CORS


//PARA SUBIR ARCHIVOS AL servidor
IIinstalar mult
npm install multer
npm install --save-dev @types/multer

# Para encriptar contraseñas de forma segura
npm install --save bcrypt

# Tipos de TypeScript para bcrypt (buena práctica)
npm install --save-dev @types/bcrypt

#Para el token
 npm i jsonwebtoken
 npm i --save-dev @types/jsonwebtoken
 
# Para el mail
npm install nodemailer
npm install @nestjs-modules/mailer

//Para dar formato a las fechas
npm install date-fns


//para mercado pago
npm install mercadopago

//REACT instalacion de ZOD para usar con react-hook-form
npm install zod
npm install @hookform/resolvers

//para movimientos en react
npm install framer-motion

//para iconos en React
npm install lucide-react

//swagger para documentacion
npm install --save @nestjs/swagger

