import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SaleDetail } from './SaleDetail';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerName!: string;

  @Column()
  customerLastName!: string;

  @Column({ nullable: true })
  customerTaxId!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Column({ type: 'enum', enum: ['cash'] })
  paymentMethod!: string;

  @OneToMany(() => SaleDetail, (detail) => detail.sale)
  details!: SaleDetail[];
} 