import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1754591655482 implements MigrationInterface {
    name = 'Initial1754591655482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`datospersonales\` (\`id\` int NOT NULL, \`plan\` enum ('basico', 'pro', 'premium') NOT NULL DEFAULT 'basico', \`nombre\` varchar(100) NOT NULL, \`apellido\` varchar(100) NOT NULL, \`dni\` varchar(8) NOT NULL, \`phone\` varchar(10) NOT NULL, \`genero\` enum ('hombre', 'mujer', 'otro') NOT NULL, \`imagen_perfil\` varchar(255) NULL, UNIQUE INDEX \`IDX_0ea0025a6d2fefd6be0fcb684b\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`rol\` enum ('usuario', 'admin') NOT NULL DEFAULT 'usuario', \`f_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`f_ultimo_acceso\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`datos_personales_id\` int NULL, UNIQUE INDEX \`IDX_2863682842e688ca198eb25c12\` (\`email\`), UNIQUE INDEX \`REL_9ef85d51e2b9120cbcd50dd083\` (\`datos_personales_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`datos_fisicos\` (\`id\` int NOT NULL, \`actividad_diaria\` varchar(255) NOT NULL, \`peso\` float NOT NULL, \`estatura\` int NOT NULL, \`metas\` varchar(255) NOT NULL, \`observaciones\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_9ef85d51e2b9120cbcd50dd083d\` FOREIGN KEY (\`datos_personales_id\`) REFERENCES \`datospersonales\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_9ef85d51e2b9120cbcd50dd083d\``);
        await queryRunner.query(`DROP TABLE \`datos_fisicos\``);
        await queryRunner.query(`DROP INDEX \`REL_9ef85d51e2b9120cbcd50dd083\` ON \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_2863682842e688ca198eb25c12\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ea0025a6d2fefd6be0fcb684b\` ON \`datospersonales\``);
        await queryRunner.query(`DROP TABLE \`datospersonales\``);
    }

}
