import { HttpException, HttpStatus } from "@nestjs/common";
import { MulterError } from "multer";
import { QueryFailedError } from "typeorm";
//video 
export class ErrorManager extends Error { //creo una clase  para manejo de errores que extiende de la clase Error de Node
  constructor(public readonly type: keyof typeof HttpStatus, public readonly customMessage: string) {
    super(`${type} :: ${customMessage}`);
  }

  static handle(error: unknown): never {

    if (error instanceof ErrorManager) {
      throw new HttpException(error.customMessage, HttpStatus[error.type]);
    }
    //error en transferencia de archivos de imagen
    if (error instanceof MulterError) {
      switch (error.code) {
        case 'LIMIT_FILE_SIZE':
          throw new ErrorManager('BAD_REQUEST', 'El archivo excede el tamaño máximo permitido');
        case 'LIMIT_UNEXPECTED_FILE':
          throw new ErrorManager('BAD_REQUEST', 'Archivo inesperado');
        default:
          throw new ErrorManager('BAD_REQUEST', `Error al subir archivo: ${error.message}`);
      }
    }
    //sugerencia de la IA
    // Errores de base de datos
    if (error instanceof QueryFailedError) {
      const code = (error as any).code;

      switch (code) {
        case 'ER_DUP_ENTRY':
          throw new HttpException('Ya existe un registro con ese valor unico', HttpStatus.BAD_REQUEST);

        case 'ER_BAD_DB_ERROR':
          throw new HttpException('La base de datos no existe', HttpStatus.INTERNAL_SERVER_ERROR);

        case 'ER_PARSE_ERROR':
          throw new HttpException('Error de sintaxis en la consulta SQL', HttpStatus.BAD_REQUEST);

        case 'ER_NO_SUCH_TABLE':
          throw new HttpException('La tabla especificada no existe', HttpStatus.INTERNAL_SERVER_ERROR);

        case 'ER_ACCESS_DENIED_ERROR':
          throw new HttpException('Acceso denegado: usuario o contraseña incorrectos', HttpStatus.UNAUTHORIZED);

        case 'ER_LOCK_WAIT_TIMEOUT':
          throw new HttpException('Tiempo de espera agotado al intentar obtener un bloqueo', HttpStatus.REQUEST_TIMEOUT);

        case 'ER_DATA_TOO_LONG':
          throw new HttpException('El dato excede el tamaño permitido para la columna', HttpStatus.BAD_REQUEST);

        case 'ER_NO_REFERENCED_ROW_2':
        case 'ER_ROW_IS_REFERENCED_2':
          throw new HttpException('Referencia inválida: clave foránea no encontrada', HttpStatus.BAD_REQUEST);

        default:
          throw new HttpException(`Error de base de datos: ${(error as any).message}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    // Errores inesperados
    throw new HttpException('Error interno del servidor', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
