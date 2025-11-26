//import { ESTADO } from "src/constantes/estado.enum";
import { ESTADO } from '../../constantes/estado.enum';

import { IUsuario } from "src/interfaces/usuario.interface";
//import { PagoEntity } from "src/pagos/entity/pago.entity";
import { PagoEntity } from '../../pagos/entity/pago.entity';

//import { RutinaEntity } from "src/rutina/entities/rutina.entity";
import { RutinaEntity } from "../../rutina/entities/rutina.entity";

import { DatosFisicosEntity } from "../../usuario-datos-fisicos/entities/datos-fisicos.entity";
import { DatosPersonalesEntity } from "../../usuario-datos-personales/entities/datos-personales.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ROL } from '../../constantes/rol';


@Entity({ name: 'usuario' })
export class UsuarioEntity implements IUsuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 128 })
    password: string;

    @Column({ type: 'enum', enum: ROL, default: ROL.USUARIO }) //necesario para que la bd lo tome como enumerado, sino lo toma como string
    rol: ROL;

    @Column({ type: 'enum', enum: ESTADO, default: ESTADO.ACTIVO })
    estado: ESTADO;

    // Fecha en que se cambió la contraseña por última vez
    @Column({ type: 'timestamp', name: 'password_changed_at', nullable: true , default: null})
    passwordChangedAt: Date | null;

    // Nivel entre 0 y 100
    //level 0: primera vez
    //level: 1 no pago
    //level: 10, 20, 30, etc accessos segun el plan (pago)
    //level 90 ->admin
    //level 100 -> superadmin
    @Column({ type: 'smallint', default: 0 })
    level: number;

    @Column({ type: 'timestamp', name: 'f_baja', nullable: true }) //para borrado logico
    fBaja: Date | null;

    @CreateDateColumn({ //agrega automaticamente la fecha-hora del servidor, el name permite la creacion en la bd con snakeCase
        type: 'timestamp',
        name: 'f_creacion'
    })
    fCreacion: Date;
    
    @UpdateDateColumn({ type: 'timestamp', name: 'f_ultimo_acceso' })
    fUltimoAcceso: Date;

    //relacion con datos personales
    //nullable = true porque puede ser que no tenga datos personales segun el ROL
    @OneToOne(() => DatosPersonalesEntity, { nullable: true, cascade: true })
    @JoinColumn() //crea una columna que apunta a DatosPersonalesEntity.id
    datosPersonales?: DatosPersonalesEntity; //opcional, dependiendo del tipo de ROL

    //relacion con datos Fisicos
    //nullable = true porque puede ser que no tenga datos fisicos segun el ROL
    @OneToOne(() => DatosFisicosEntity, { nullable: true, cascade: true })
    @JoinColumn()
    datosFisicos?: DatosFisicosEntity; //opcional, dependiendo del tipo de ROL

    //relacion con Rutina
    @OneToMany(() => RutinaEntity, rutina => rutina.usuario) //ojo no esta cascade en true
    rutinas?: RutinaEntity[];

// RELACIÓN UNO A MUCHOS: Un usuario puede tener muchos pagos
    @OneToMany(() => PagoEntity, (pago) => pago.usuario)
    pagos: PagoEntity[];

}
