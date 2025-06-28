import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { SaleDetail } from './SaleDetail';
import { User } from './User';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customer_name!: string;

  @Column()
  customer_last_name!: string;

  @Column({ nullable: true })
  customer_tax_id!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Column({ type: 'enum', enum: ['cash'] })
  payment_method!: string;

  @OneToMany(() => SaleDetail, (detail) => detail.sale)
  details!: SaleDetail[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ 
    name: "created_by_user_id", 
    foreignKeyConstraintName: "fk_sale_created_by" 
  })
  created_by?: User;

  @Column({ name: "created_by_user_id" })
  created_by_user_id!: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ 
    name: "updated_by_user_id", 
    foreignKeyConstraintName: "fk_sale_updated_by" 
  })
  updated_by?: User;

  @Column({ name: "updated_by_user_id" })
  updated_by_user_id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;
} 