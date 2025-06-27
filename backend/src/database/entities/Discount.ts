import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, (product) => product.discounts)
  product!: Product;

  @Column({ type: 'enum', enum: ['percentage'] })
  type!: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value!: number;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;
} 