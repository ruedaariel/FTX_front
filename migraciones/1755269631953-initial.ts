import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1755269631953 implements MigrationInterface {
    name = 'Initial1755269631953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` ADD \`observaciones\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` DROP COLUMN \`observaciones\``);
    }

}
