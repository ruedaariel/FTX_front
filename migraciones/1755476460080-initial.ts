import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1755476460080 implements MigrationInterface {
    name = 'Initial1755476460080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`rutina\` (\`id_rutina\` int NOT NULL AUTO_INCREMENT, \`nombre_rutina\` varchar(255) NOT NULL, \`estado_rutina\` enum ('activa', 'finalizada', 'proxima') NOT NULL, \`f_creacion\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`f_ultimo_acceso\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`f_baja\` timestamp NULL, \`id_usuario\` int NULL, UNIQUE INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` (\`nombre_rutina\`), PRIMARY KEY (\`id_rutina\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`rutina\` ADD CONSTRAINT \`FK_f629865afcc50d26cf7fad6b892\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rutina\` DROP FOREIGN KEY \`FK_f629865afcc50d26cf7fad6b892\``);
        await queryRunner.query(`DROP INDEX \`IDX_798f7ffeb59bd5210d77155b4f\` ON \`rutina\``);
        await queryRunner.query(`DROP TABLE \`rutina\``);
    }

}
