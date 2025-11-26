//import { EjercicioRutinaEntity } from "src/ejercicio-rutina/entities/ejercicio-rutina.entity";
import { EjercicioRutinaEntity } from "../../ejercicio-rutina/entities/ejercicio-rutina.entity";
import { IDia } from "src/interfaces/dia.interface";
//import { SemanaEntity } from "src/semana/entities/semana.entity";
import { SemanaEntity } from "../../semana/entities/semana.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'dia' })
export class DiaEntity implements IDia {
    @PrimaryGeneratedColumn()
    idDia: number;

    @Column({type: 'varchar',length: 1,})
    nroDia: string; // VER SI LO DEJAMOS STRING

    @Column({ type: 'varchar', })
    focus: string; //VER SI LO DEJAMOS - podemos hacer una tabla de frases y su imagen
    //VER SI AGREGAMOS IMAGEN SEGUN FRONT

    //relacion con Semana - si se borra la semana, se borran los dias
    @ManyToOne(() => SemanaEntity, semana => semana.dias, {onDelete: "CASCADE"})
    @JoinColumn()
    semana: SemanaEntity;

    //Relacion con Ejercicio-rutina
    @OneToMany(()=>EjercicioRutinaEntity, ejercicioRutina => ejercicioRutina.dia, {cascade: true})
    ejerciciosRutina: EjercicioRutinaEntity[];
}
