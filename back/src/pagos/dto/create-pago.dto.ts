import { IsEnum, IsInt, IsNumber, IsOptional, IsString, IsEmail, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { METODODEPAGO } from '../entity/pago.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


// Sub-DTO para información del pagador
export class PayerDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  identification_type?: string; // DNI, CI, etc.

  @IsOptional()
  @IsString()
  identification_number?: string;
}

// Sub-DTO para URLs de retorno
export class BackUrlsDto {
  @IsOptional()
  @IsString()
  success?: string;

  @IsOptional()
  @IsString()
  failure?: string;

  @IsOptional()
  @IsString()
  pending?: string;
}

// DTO para datos que vienen del FRONTEND (para crear la preferencia)
export class IniciarPagoDto {
  @IsInt()
  usuarioId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  monto: number;

  @IsInt()
  diasAdicionales: number;

  @IsEnum(METODODEPAGO)
  metodoDePago: METODODEPAGO;

  @IsString()
  descripcion: string; // Título del producto/servicio

  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => BackUrlsDto)
  back_urls?: BackUrlsDto;

  @IsOptional()
  @IsString()
  external_reference?: string; // Referencia externa (puede ser el ID del usuario o plan)

  @IsOptional()
  @IsString()
  notification_url?: string; // URL para webhooks

  @IsOptional()
  @IsInt()
  expires?: number; // Minutos hasta que expire la preferencia

  @IsOptional()
  @IsString()
  currency_id?: string; // ARS, USD, etc. (por defecto ARS)

  @IsOptional()
  @IsInt()
  installments?: number; // Número de cuotas permitidas
}

// DTO para datos que vienen de MERCADOPAGO (para guardar en BD)
export class CreatePagoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fechaPago?: string; // date_created de MercadoPago

  @ApiProperty()
  @IsString()
  estado: string; // status de MercadoPago

  @ApiPropertyOptional()
  @IsInt()
  diasAdicionales?: number; // del frontend original

  @ApiProperty()
  @IsEnum(METODODEPAGO)
  metodoDePago: METODODEPAGO; // del frontend original

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  monto: number; // transaction_amount de MercadoPago

  @ApiProperty()
  @IsInt()
  usuarioId: number; // del frontend original

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  preferenciaId?: string; // id de MercadoPago

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pagoId?: string; // payment_id de MercadoPago si existe

  @ApiProperty()
  @IsOptional()
  @IsString()
  external_reference?: string; // referencia externa
}