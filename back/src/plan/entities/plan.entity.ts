import { IPlan } from "src/interfaces/plan.interface";
//import { DatosPersonalesEntity } from "src/usuario-datos-personales/entities/datos-personales.entity";
import { DatosPersonalesEntity } from "../../usuario-datos-personales/entities/datos-personales.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HistoricoPlanEntity } from "./historico-plan.entity";

@Entity({ name: 'plan' })
export class PlanEntity implements IPlan {
    @PrimaryGeneratedColumn()
    idPlan: number;

    @Column({ type: 'varchar', length: 30, unique: true })
    nombrePlan: string;

    @Column({ type: 'varchar' })
    descripcion: string;

    @Column({ type: 'varchar' })
    beneficios: string;

    @Column({ type: 'varchar' })
    noIncluye: string;

    @Column({ type: 'decimal', precision: 8, scale: 2 })
    precio: number;

     // Nivel entre 0 y 100
    //level 0: primera vez
    //level: 1 no pago
    //level: 10, 20, 30, etc accessos segun el plan (pago)
    //level 90 ->admin
    //level 100 -> superadmin
    @Column({ type: 'smallint', default: 0 })
    level: number;

    @CreateDateColumn({ //agrega automaticamente la fecha-hora del servidor, el name permite la creacion en la bd con snakeCase
        type: 'timestamp'
    })
    fCambio: Date;

    //Relacion Con Usuario
    @OneToMany(() => DatosPersonalesEntity, datosPersonales => datosPersonales.plan)
    datosPersonales: DatosPersonalesEntity[];

    //Relacion con Historico
    @OneToMany(() => HistoricoPlanEntity, historicoPlan => historicoPlan.plan)
    historicoPlanes: HistoricoPlanEntity[];
}
