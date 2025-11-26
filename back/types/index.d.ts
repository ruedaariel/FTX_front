//declaracion para definir las variables de entorno y acceder a ellas en el codigo
declare namespace NodeJS {
    interface ProcessEnv {
        
PORT:number

API_BASE_URL:string


DB_HOST:string
DB_PORT:number
DB_USER:string
DB_PASS:string
DB_NAME:string

MAX_FILE_SIZE:string

MERCADOPAGO_CLIENT_ID:number
MERCADOPAGO_ACCESS_TOKEN:string

HASH_SALT:number
JWT_SECRET : string    }
}