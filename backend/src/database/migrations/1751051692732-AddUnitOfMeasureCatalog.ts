import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUnitOfMeasureCatalog1751051692732 implements MigrationInterface {
    name = 'AddUnitOfMeasureCatalog1751051692732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`unit_of_measure\` \`unit_of_measure_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`unit_of_measure\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_email_verified\` \`is_email_verified\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_product_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_created_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`created_by_user_id\` \`created_by_user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`updated_by_user_id\` \`updated_by_user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_created_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`unit_of_measure_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`unit_of_measure_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`created_by_user_id\` \`created_by_user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`updated_by_user_id\` \`updated_by_user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_detail_product_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`sale_id\` \`sale_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_created_by\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`customer_tax_id\` \`customer_tax_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`created_by_user_id\` \`created_by_user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`updated_by_user_id\` \`updated_by_user_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_unit_of_measure\` FOREIGN KEY (\`unit_of_measure_id\`) REFERENCES \`unit_of_measure\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_id\` FOREIGN KEY (\`sale_id\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_detail_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_created_by\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_detail_product_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_created_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_unit_of_measure\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_created_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_product_id\``);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`updated_by_user_id\` \`updated_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`created_by_user_id\` \`created_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`customer_tax_id\` \`customer_tax_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`sale_id\` \`sale_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_detail_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_id\` FOREIGN KEY (\`sale_id\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`updated_by_user_id\` \`updated_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`created_by_user_id\` \`created_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`unit_of_measure_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`unit_of_measure_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`updated_by_user_id\` \`updated_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`created_by_user_id\` \`created_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_email_verified\` \`is_email_verified\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`unit_of_measure\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`unit_of_measure_id\` \`unit_of_measure\` varchar(255) NOT NULL`);
    }

}
