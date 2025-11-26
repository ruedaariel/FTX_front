//import { EjercicioRutinaEntity } from "src/ejercicio-rutina/entities/ejercicio-rutina.entity";
import { EjercicioRutinaEntity } from "../../ejercicio-rutina/entities/ejercicio-rutina.entity";
import { IEjercicioBasico } from "src/interfaces/ejercicio-basico";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('ejercicio_basico')
export class EjercicioBasicoEntity implements IEjercicioBasico {

    @PrimaryGeneratedColumn()
    idEjercicioBasico: number;

    @Column({ type: 'varchar', length: 60, unique: true })
    nombreEjercicio: string;

    @Column({ type: 'varchar', nullable: true })
    observaciones: string;

    @Column({ type: 'varchar', nullable: true })
    imagenLink: string;

    @Column({ type: 'varchar', nullable: true })
    videoLink: string;

    //Relacion con ejercicio-Rutina. Se usa restrict porque no puedo borrar el ejercicio basico si esta asignado a una rutina
@OneToMany(()=>EjercicioRutinaEntity, ejercicioRutina => ejercicioRutina.ejercicioBasico)
ejerciciosRutina : EjercicioRutinaEntity[];

}
