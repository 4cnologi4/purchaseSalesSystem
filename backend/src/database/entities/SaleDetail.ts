import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from './Sale';
import { Product } from './Product';

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Sale, (sale) => sale.details, { nullable: true })
  @JoinColumn({ name: 'sale_id', foreignKeyConstraintName: 'fk_sale_id' })
  sale!: Sale;

  @ManyToOne(() => Product, (product) => product.description, { nullable: true })
  @JoinColumn({ name: 'product_id', foreignKeyConstraintName: 'fk_sale_detail_product_id' })
  product!: Product;

  @Column()
  quantity!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unit_price!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;
} 