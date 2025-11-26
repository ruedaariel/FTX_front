//import { ESTADO } from "src/constantes/estado.enum";
import { ESTADO } from "../../constantes/estado.enum";
import { IDatosFisicos } from "src/interfaces/datos-fisicos.interface";
import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'datos_fisicos' })
export class DatosFisicosEntity implements IDatosFisicos {

  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  actividadDiaria: string;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  peso: number;

  @Column({ type: 'int' })
  estatura: number;

  @Column({ type: 'varchar', length: 100 })
  metas: string;

  @Column({ type: 'varchar', length: 255 })
  observaciones: string;

  @Column({ type: 'enum', enum: ESTADO, default: ESTADO.ACTIVO })
  estado: ESTADO;


}
