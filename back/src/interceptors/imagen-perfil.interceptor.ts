// src/common/interceptors/imagen-perfil.interceptor.ts
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ErrorManager } from '../config/error.manager';

export const imagenPerfilInterceptor = () =>
  FileInterceptor('imagenPerfil', {
    storage: diskStorage({
      destination: './uploads/perfiles',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Tipos de archivo permitidos
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
        return cb(
          new ErrorManager(
            'BAD_REQUEST',
            'Solo se permiten imágenes JPG, JPEG, WEBP o PNG para perfiles.',
          ),
          false,
        );
      }
      cb(null, true);
    },
    limits: {
      // 4. Tamaño máximo del archivo (2MB por defecto)
      fileSize: parseInt(process.env.MAX_FILE_SIZE || '2097152'),
    },
  });