import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
export class Discount {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Product, (product) => product.discounts, { nullable: true })
  @JoinColumn({
    name: 'product_id',
    foreignKeyConstraintName: 'fk_discount_product_id'
  })
  product?: Product;

  @Column({ name: "product_id" })
  product_id!: string;

  @Column({ type: 'smallint' })
  type!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value!: number;

  @Column({ type: 'date' })
  start_date!: Date;

  @Column({ type: 'date' })
  end_date!: Date;

  @Column({ type: 'boolean', default: true })
  is_active!: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'created_by_user_id',
    foreignKeyConstraintName: 'fk_discount_created_by'
  })
  created_by?: User;

  @Column({ name: "created_by_user_id" })
  created_by_user_id!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({
    name: 'updated_by_user_id',
    foreignKeyConstraintName: 'fk_discount_updated_by'
  })
  updated_by?: User;

  @Column({ name: "updated_by_user_id" })
  updated_by_user_id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
} 