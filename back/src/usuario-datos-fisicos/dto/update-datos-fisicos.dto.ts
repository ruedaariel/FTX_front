import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosFisicosDto } from './create-datos-fisicos.dto';

export class UpdateDatosFisicosDto extends PartialType(CreateDatosFisicosDto) {}
