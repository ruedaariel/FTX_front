//import { DiaEntity } from "src/dia/entities/dia.entity";
import { DiaEntity } from "../../dia/entities/dia.entity";
//import { EjercicioBasicoEntity } from "src/ejercicio-basico/entities/ejercicio-basico.entity";
import { EjercicioBasicoEntity } from "../../ejercicio-basico/entities/ejercicio-basico.entity";
import { IEjercicioRutina } from "src/interfaces/ejercicio-rutina.interface";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'ejercicio_rutina'})
export class EjercicioRutinaEntity implements IEjercicioRutina {

    //CONTROLAR LOS CAMPOS SI SON OBLIGATORIOS O SI HAY ALGO POR DEFECTO
     @PrimaryGeneratedColumn()
        idEjercicioRutina: number;

        @Column({ type: 'varchar',length: 30,}) //VER LA LONG Y SI LO AJUSTAMOS EN EL FRONT
        repeticiones: string;

        @Column({ type: 'varchar',length: 30,})
        dificultad: string;

        @Column({type:"decimal", precision:6, scale:3})
        peso: number; 

        @Column({type: 'varchar', length: 255, nullable:true}) //VER 
        observaciones: string; //VER SI LO DEFINO COMO { type: 'varchar', length: 255 } o como { type: 'text' }

        @Column({type: 'boolean', default: false})
        ejercicioHecho: boolean = false;

        //relacion con dia - se borran los ejercicios si se borran los dias
        @ManyToOne(()=>DiaEntity, dia => dia.ejerciciosRutina,{onDelete: "CASCADE"})
        @JoinColumn()
        dia: DiaEntity;

        //relacion con ejercicio_basico - no permite que borre ejercicioBasico si existe un ejercicioRutina asociado
        //recordar que el restrict va en el muchos de la relacion
        @ManyToOne(()=>EjercicioBasicoEntity, ejercicioBasico => ejercicioBasico.ejerciciosRutina,  {onDelete: "RESTRICT"})
        @JoinColumn()
        ejercicioBasico : EjercicioBasicoEntity;

}
