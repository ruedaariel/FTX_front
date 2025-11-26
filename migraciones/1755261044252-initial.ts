import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1755261044252 implements MigrationInterface {
    name = 'Initial1755261044252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ejercicio_basico\` (\`id_ejercicio_basico\` int NOT NULL AUTO_INCREMENT, \`nombre_ejercicio\` varchar(255) NOT NULL, \`imagen_link\` varchar(255) NULL, \`video_link\` varchar(255) NULL, UNIQUE INDEX \`IDX_69df2566fd028d03fe70c7c43a\` (\`nombre_ejercicio\`), PRIMARY KEY (\`id_ejercicio_basico\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_69df2566fd028d03fe70c7c43a\` ON \`ejercicio_basico\``);
        await queryRunner.query(`DROP TABLE \`ejercicio_basico\``);
    }

}
