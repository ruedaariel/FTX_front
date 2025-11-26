import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1755187407356 implements MigrationInterface {
    name = 'Initial1755187407356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`f_baja\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`estado\` \`estado\` enum ('activo', 'inactivo', 'archivado') NOT NULL DEFAULT 'activo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` CHANGE \`estado\` \`estado\` enum ('activo', 'inactivo') NOT NULL DEFAULT 'activo'`);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`f_baja\``);
    }

}
