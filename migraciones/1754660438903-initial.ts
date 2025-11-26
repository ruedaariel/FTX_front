import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1754660438903 implements MigrationInterface {
    name = 'Initial1754660438903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0ea0025a6d2fefd6be0fcb684b\` ON \`datospersonales\``);
        await queryRunner.query(`DROP INDEX \`IDX_599ab045d0bb25e6ad0eb8482a\` ON \`usuario\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_599ab045d0bb25e6ad0eb8482a\` ON \`usuario\` (\`datos_fisicos_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_0ea0025a6d2fefd6be0fcb684b\` ON \`datospersonales\` (\`dni\`)`);
    }

}
