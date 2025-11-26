//import { DiaEntity } from "src/dia/entities/dia.entity";
import { DiaEntity } from "../../dia/entities/dia.entity";
import { ISemana } from "src/interfaces/semana.interface";
//import { RutinaEntity } from "src/rutina/entities/rutina.entity";
import { RutinaEntity } from "../../rutina/entities/rutina.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum ESTADOSEMANA {
    ENPROCESO = 'en proceso',
    TERMINADA = 'terminada',
    NOINICIADA = 'no iniciada'
}

@Entity({ name: 'semana' })
export class SemanaEntity implements ISemana {
    @PrimaryGeneratedColumn()
    idSemana: number;

    @Column({
        type: 'varchar', //VER SI LO PASAMOS A NUMBER
        length: 1,
    })
    nroSemana: string;

    @Column({type: 'enum', enum: ESTADOSEMANA ,nullable: false, }) //ver si ponemos algun estaqdo por defecto
    estadoSemana: ESTADOSEMANA;

    //relacion con Rutina - si se elimina la rutina, se elimina la semana
   @ManyToOne(()=>RutinaEntity, rutina => rutina.semanas, {onDelete: "CASCADE"})
   @JoinColumn()
   rutina: RutinaEntity;

   //relacion con Dia - si se guarda la semana, permite guardar el dia en el mismo save
   @OneToMany(()=> DiaEntity, dia => dia.semana, {cascade: true})
   dias: DiaEntity[];
}
