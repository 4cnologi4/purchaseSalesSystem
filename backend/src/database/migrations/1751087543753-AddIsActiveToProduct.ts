import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsActiveToProduct1751087543753 implements MigrationInterface {
    name = 'AddIsActiveToProduct1751087543753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE product
            ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE product
            DROP COLUMN is_active
        `);
    }

}
