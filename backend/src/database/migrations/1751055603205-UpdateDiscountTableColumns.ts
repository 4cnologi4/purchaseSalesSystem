import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDiscountTableColumns1751055603205 implements MigrationInterface {
    name = 'UpdateDiscountTableColumns1751055603205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_product_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_created_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP FOREIGN KEY \`fk_discount_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`product_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`type\` smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`value\` \`value\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`created_by_user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`updated_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`updated_by_user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_created_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`fk_product_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`created_by_user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updated_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updated_by_user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_email_verified\` \`is_email_verified\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_created_by\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`fk_sale_updated_by\``);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`customer_tax_id\` \`customer_tax_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD \`created_by_user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP COLUMN \`updated_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD \`updated_by_user_id\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` DROP FOREIGN KEY \`fk_sale_detail_product_id\``);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`sale_id\` \`sale_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`product_id\` \`product_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` CHANGE \`sale_id\` \`sale_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_detail_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_detail\` ADD CONSTRAINT \`fk_sale_id\` FOREIGN KEY (\`sale_id\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP COLUMN \`updated_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD \`updated_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD \`created_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale\` CHANGE \`customer_tax_id\` \`customer_tax_id\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`fk_sale_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`is_email_verified\` \`is_email_verified\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`updated_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`updated_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`created_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`fk_product_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`updated_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`updated_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`created_by_user_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`created_by_user_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`discount\` CHANGE \`value\` \`value\` decimal(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`type\` enum ('percentage') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`discount\` DROP COLUMN \`product_id\``);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD \`product_id\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_updated_by\` FOREIGN KEY (\`updated_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_created_by\` FOREIGN KEY (\`created_by_user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`discount\` ADD CONSTRAINT \`fk_discount_product_id\` FOREIGN KEY (\`product_id\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
