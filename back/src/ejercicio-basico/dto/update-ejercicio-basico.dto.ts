import { PartialType } from '@nestjs/mapped-types';
import { CreateEjercicioBasicoDto } from './create-ejercicio-basico.dto';

export class UpdateEjercicioBasicoDto extends PartialType(CreateEjercicioBasicoDto) {}
