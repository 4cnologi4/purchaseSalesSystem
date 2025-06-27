import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UnitOfMeasure {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    name!: string;
}
