import { ApiProperty } from "@nestjs/swagger";
import { IsEmail,  IsNotEmpty } from "class-validator";


export class ResetDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El correo no puede ser vacio' })
    @IsEmail({}, { message: 'El correo no es valido' })
    email: string;
}
