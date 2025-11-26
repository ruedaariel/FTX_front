import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1755094200869 implements MigrationInterface {
    name = 'Initial1755094200869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`estado\` enum ('activo', 'inactivo') NOT NULL DEFAULT 'activo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`estado\``);
    }

}
