import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn, Index } from 'typeorm';
import { UsuarioEntity } from '../../usuario/entities/usuario.entity';
import { timestamp } from 'rxjs';

export enum METODODEPAGO {
  TARJETA = 'tarjeta',
  MERCADOPAGO = 'mercadopago',
  TRANSFERENCIA = 'transferencia',
  EFECTIVO = 'efectivo',
}


@Entity({ name: 'pago' })
@Index('idx_pagos_usuario_fecha', ['usuarioId', 'fechaPago'])
export class PagoEntity {
  @PrimaryGeneratedColumn()
  idPagos: number;

  @Column({ type: 'timestamp' })
  fechaPago: Date;

  @Column({ type: 'timestamp' })
  fechaVencimiento: Date;

  @Column({ type: 'varchar', length: 32 })
  estado: string; // status devuelto por MercadoPago

  @Column({ type: 'int', default: 0 })
  diasAdicionales: number;

  @Column({ type: 'enum', enum: METODODEPAGO})
  metodoDePago: METODODEPAGO;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'varchar' })
  referencia: string; // referencia externa del pago

   @Column({ type: 'int', name: 'usuarioId' })
  usuarioId: number;

   @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pagos, {
    nullable: false,
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'usuarioId' })
  usuario: UsuarioEntity;

  /* // RelationId crea la columna virtual usuarioId en la entidad para poder indexarla y filtrar por ella
  @RelationId((p: PagoEntity) => p.usuario)
  usuarioId: number;
   */
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}