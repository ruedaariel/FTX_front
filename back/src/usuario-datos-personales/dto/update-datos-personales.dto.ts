import { PartialType } from '@nestjs/mapped-types';
import { CreateDatosPersonalesDto } from './create-datos-personales.dto';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseISO } from 'date-fns';

export class UpdateDatosPersonalesDto extends PartialType(CreateDatosPersonalesDto) {

}
//con el PartialType, ya me lo pone como opcional