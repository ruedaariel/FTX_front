import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { ErrorManager } from "../config/error.manager";

export const imagenEjercicioInterceptor = () =>
  FileInterceptor('imagenLink', {
    storage: diskStorage({
      destination: './uploads/ejercicios',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(new ErrorManager('BAD_REQUEST', 'Solo se permiten imágenes JPG, JPEG, WEBP o PNG'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: parseInt(process.env.MAX_FILE_SIZE || '2097152'), // 2 MB por defecto
    },
  });