import { Injectable } from "@nestjs/common";
import * as path from 'path';
import * as fs from 'fs';
import { ErrorManager } from "../../config/error.manager";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileImgService {
  constructor( private readonly configService: ConfigService){}

public async borrarImagen(nombreArchivo: string, directorio:string): Promise<boolean> {
    //true: si se borra
    //false si no existe el nombre
    //error si no lo puede borrar (x causa)

    if (nombreArchivo) {

      const rutaBaseProyecto = process.cwd();
      const rutaImagen = path.join(rutaBaseProyecto, 'uploads', `${directorio}`, nombreArchivo);

      try {
        await fs.promises.unlink(rutaImagen);
        return true;
      } catch (err) {
        throw ErrorManager.handle(err);
      }
    }
    return false;
  }

public construirUrlImagen(nombreArchivo: string,directorio:string): string {
    //para mandar al front, construyo la ruta+nombreArchivo

    const port = this.configService.get<string>('PORT') || '8000';
    const host = this.configService.get<string>('HOST') || 'localhost';
    const baseUrl = `http://${host}:${port}/uploads/${directorio}/`;
    return nombreArchivo ? baseUrl + nombreArchivo : "";
  }

}