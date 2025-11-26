import { PartialType } from '@nestjs/mapped-types';
import { CreateEjercicioRutinaDto } from './create-ejercicio-rutina.dto';

export class UpdateEjercicioRutinaDto extends PartialType(CreateEjercicioRutinaDto) {}
