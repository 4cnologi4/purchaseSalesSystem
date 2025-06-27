import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Discount } from './Discount';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  code!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice!: number;

  @Column()
  unitOfMeasure!: string;

  @OneToMany(() => Discount, (discount) => discount.product)
  discounts!: Discount[];
} 