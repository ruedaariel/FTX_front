import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, Matches } from "class-validator";


export class LoginDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'El correo no puede ser vacio' })
    @IsEmail({}, { message: 'El correo no es valido' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'la contraseña no puede ser vacia' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número',
    })
    password: string;

    // @IsNotEmpty({ message: 'El rol no puede ser vacio' })
    // @IsEnum(ROL, { message: 'tipo de usuario invalido, debe ser usuario o admin (enumerado)' })
    // rol:ROL;

}
