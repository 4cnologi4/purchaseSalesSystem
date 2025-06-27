import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1750991722461 implements MigrationInterface {
    name = 'CreateInitialTables1750991722461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('percentage') NOT NULL, \`value\` decimal(5,2) NOT NULL, \`startDate\` date NOT NULL, \`endDate\` date NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`unitPrice\` decimal(10,2) NOT NULL, \`unitOfMeasure\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_99c39b067cfa73c783f0fc49a6\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_detail\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`unitPrice\` decimal(10,2) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, \`discount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` decimal(10,2) NOT NULL, \`saleId\` varchar(36) NULL, \`productId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale\` (\`id\` varchar(36) NOT NULL, \`customerName\` varchar(255) NOT NULL, \`customerLastName\` varchar(255) NOT NULL, \`customerTaxId\` varchar(255) NULL, \`total\` decimal(10,2) NOT NULL, \`paymentMethod\` enum ('cash') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`FK_63f33bfcb610459080764863792\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`FK_dc3d2ad8c7954be23118706f29d\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`FK_1835112e3800deefbf854724554\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`FK_1835112e3800deefbf854724554\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`FK_dc3d2ad8c7954be23118706f29d\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`FK_63f33bfcb610459080764863792\``);
        await queryRunner.query(`DROP TABLE \`sale\``);
        await queryRunner.query(`DROP TABLE \`sale_detail\``);
        await queryRunner.query(`DROP INDEX \`IDX_99c39b067cfa73c783f0fc49a6\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`discount\``);
    }

}
