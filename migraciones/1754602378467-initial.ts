import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1754602378467 implements MigrationInterface {
    name = 'Initial1754602378467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD \`datos_fisicos_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD UNIQUE INDEX \`IDX_599ab045d0bb25e6ad0eb8482a\` (\`datos_fisicos_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_599ab045d0bb25e6ad0eb8482a\` ON \`usuario\` (\`datos_fisicos_id\`)`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_599ab045d0bb25e6ad0eb8482a5\` FOREIGN KEY (\`datos_fisicos_id\`) REFERENCES \`datos_fisicos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_599ab045d0bb25e6ad0eb8482a5\``);
        await queryRunner.query(`DROP INDEX \`REL_599ab045d0bb25e6ad0eb8482a\` ON \`usuario\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP INDEX \`IDX_599ab045d0bb25e6ad0eb8482a\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP COLUMN \`datos_fisicos_id\``);
    }

}
