import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1751048158985 implements MigrationInterface {
    name = 'CreateInitialTables1751048158985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount\` (\`id\` varchar(36) NOT NULL, \`type\` enum ('percentage') NOT NULL, \`value\` decimal(5,2) NOT NULL, \`start_date\` date NOT NULL, \`end_date\` date NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`product_id\` varchar(36) NULL, \`created_by_user_id\` varchar(36) NULL, \`updated_by_user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`unit_price\` decimal(10,2) NOT NULL, \`unit_of_measure\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by_user_id\` varchar(36) NULL, \`updated_by_user_id\` varchar(36) NULL, UNIQUE INDEX \`idx_product_code_unique\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`is_email_verified\` tinyint NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`idx_user_email_unique\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale\` (\`id\` varchar(36) NOT NULL, \`customer_name\` varchar(255) NOT NULL, \`customer_last_name\` varchar(255) NOT NULL, \`customer_tax_id\` varchar(255) NULL, \`total\` decimal(10,2) NOT NULL, \`payment_method\` enum ('cash') NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by_user_id\` varchar(36) NULL, \`updated_by_user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_detail\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`unit_price\` decimal(10,2) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, \`discount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`total\` decimal(10,2) NOT NULL, \`sale_id\` varchar(36) NULL, \`product_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_id\` FOREIGN KEY (\`sale_id\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_detail_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_detail_product_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_id\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_created_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_created_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_created_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_product_id\``);
        await queryRunner.query(`DROP TABLE \`sale_detail\``);
        await queryRunner.query(`DROP TABLE \`sale\``);
        await queryRunner.query(`DROP INDEX \`idx_user_email_unique\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`idx_product_code_unique\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`discount\``);
    }

}
