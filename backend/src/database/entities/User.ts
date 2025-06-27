import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Sale } from './Sale';
import { Product } from './Product';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ default: false })
  is_email_verified!: boolean;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role!: string;

  @OneToMany(() => Product, (product) => product.created_by)
  createdProducts?: Product[];

  @OneToMany(() => Sale, (sale) => sale.created_by)
  createdSales?: Sale[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
} 