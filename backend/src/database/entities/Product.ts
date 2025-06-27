import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Discount } from './Discount';
import { User } from './User';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index("idx_product_code_unique", ["code"], { unique: true })
  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price!: number;

  @Column()
  unit_of_measure!: string;

  @OneToMany(() => Discount, (discount) => discount.product)
  discounts!: Discount[];

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ 
    name: "created_by_user_id", 
    foreignKeyConstraintName: "fk_product_created_by" 
  })
  created_by?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ 
    name: "updated_by_user_id", 
    foreignKeyConstraintName: "fk_product_updated_by" 
  })
  updated_by?: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;
} 