import { IRutina } from "src/interfaces/rutina.interface";
//import { SemanaEntity } from "src/semana/entities/semana.entity";
import { SemanaEntity } from "../../semana/entities/semana.entity";
//import { UsuarioEntity } from "src/usuario/entities/usuario.entity";
import { UsuarioEntity } from "../../usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum ESTADORUTINA {
    ACTIVA = 'activa',  //rutina actualmente utilizada por el usuario
    FINALIZADA = 'finalizada', //rutina ya terminada del usuario
    PROXIMARUTINA = 'proxima', //rutina hecha, pero todavia no comenzada por el usuario
    ENPROCESO = 'en proceso',//rutina en proceso por el personal trainer
    COMPLETA = 'completa', //rutina completa, terminada por el personal trainer, lista para usar por el usuario
   // BORRADA = 'borrada',
}

@Entity({ name: 'rutina' })
export class RutinaEntity implements IRutina {
    @PrimaryGeneratedColumn()
    idRutina: number;

    @Column({ type: 'varchar', unique: true,length:100 }) 
    nombreRutina: string;

    @Column({ type: 'enum', enum: ESTADORUTINA }) 
    estadoRutina: ESTADORUTINA;

    @CreateDateColumn({ //agrega automaticamente la fecha-hora del servidor, el name permite la creacion en la bd con snakeCase
        type: 'timestamp',
        name: 'f_creacion'
    })
    fCreacionRutina: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'f_ultimo_acceso'})
    fUltimoAccesoRutina: Date;
    
    @Column({ type: 'timestamp', name: 'f_baja', nullable: true }) //para borrado logico
    fBajaRutina: Date | null; //VER SI LO HACEMOS LOGICO

    //Relacion con Usuario
    @ManyToOne(() => UsuarioEntity, usuario => usuario.rutinas, {
        nullable: true,
        onDelete: 'SET NULL', //Deja la rutina aunque se borre el ususario VER SI LO DEJAMOS ASI
    })
    @JoinColumn({ name: 'id_usuario' }) // crea la FK en rutina
    usuario: UsuarioEntity|null;

    //Relacion con Semana - cascade: true, permite guardar toda la rutina
    @OneToMany(()=> SemanaEntity, semana => semana.rutina, {cascade: true})
    semanas:SemanaEntity[];
}
