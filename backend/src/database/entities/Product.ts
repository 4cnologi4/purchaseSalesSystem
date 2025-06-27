import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Discount } from './Discount';
import { User } from './User';
import { UnitOfMeasure } from './UnitOfMeasure';

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

  @ManyToOne(() => UnitOfMeasure, { eager: false })
  @JoinColumn({
    name: "unit_of_measure_id",
    foreignKeyConstraintName: "fk_product_unit_of_measure"
  })
  unit_of_measure?: UnitOfMeasure;

  @Column({ name: "unit_of_measure_id" })
  unit_of_measure_id!: number;

  @OneToMany(() => Discount, (discount) => discount.product)
  discounts!: Discount[];

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({
    name: "created_by_user_id",
    foreignKeyConstraintName: "fk_product_created_by"
  })
  created_by?: User;

  @Column({ name: "created_by_user_id" })
  created_by_user_id!: string;

  @ManyToOne(() => User, { eager: false })
  @JoinColumn({
    name: "updated_by_user_id",
    foreignKeyConstraintName: "fk_product_updated_by"
  })
  updated_by?: User;

  @Column({ name: "updated_by_user_id" })
  updated_by_user_id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at?: Date;
} 