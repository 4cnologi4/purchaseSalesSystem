import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { User } from './User';

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
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by_user_id', foreignKeyConstraintName: 'fk_discount_created_by' })
  created_by?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by_user_id', foreignKeyConstraintName: 'fk_discount_updated_by' })
  updated_by?: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
} 