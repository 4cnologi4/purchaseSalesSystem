import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { Sale } from './Sale';
import { Product } from './Product';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index("idx_user_email_unique", ["email"], { unique: true })
  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ type: 'boolean', nullable: true })
  is_email_verified?: boolean;

  @OneToMany(() => Product, (product) => product.created_by)
  createdProducts?: Product[];

  @OneToMany(() => Sale, (sale) => sale.created_by)
  createdSales?: Sale[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
} 