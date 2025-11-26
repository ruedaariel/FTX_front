//import { ESTADO } from "src/constantes/estado.enum";
import { ESTADO } from "../../constantes/estado.enum";
import { IDatosPersonales } from "src/interfaces/datos-personales.interface";
import { PlanEntity } from "../../plan/entities/plan.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";


export enum GENERO {
    HOMBRE = 'hombre',
    MUJER = 'mujer',
    OTRO = 'otro',
}

@Entity({ name: 'datospersonales' })
export class DatosPersonalesEntity implements IDatosPersonales {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false, })
    nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: false, })
    apellido: string;

    @Column({ type: 'varchar', length: 8, nullable: false, })
    dni: string;

    @Column({ type: 'varchar', length: 10, })
    phone: string;

    @Column({ type: 'enum', enum: GENERO, nullable: false, })
    genero: GENERO;

    @Column({ type: 'date', nullable: true })
    fNacimiento: Date | null;

    @Column({ type: 'varchar', length: 255, default: 'usuario.png', })
    imagenPerfil: string;

    @Column({ type: 'enum', enum: ESTADO, default: ESTADO.ACTIVO })
    estado: ESTADO;


    //relacion con datos_personales
    @ManyToOne(() => PlanEntity, plan => plan.datosPersonales, {
        nullable: true,
        onDelete: 'SET NULL'
    })  // al borrar el plan, pone planId a NULL

    @JoinColumn()
    plan?: PlanEntity | null; //para poder poner null cuando se borra un plan y estado es ARCHIVADO

    constructor() {
        this.imagenPerfil = 'usuario.png'; // Establece el valor por defecto
    }
}
