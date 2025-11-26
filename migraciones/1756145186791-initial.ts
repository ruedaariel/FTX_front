import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1756145186791 implements MigrationInterface {
    name = 'Initial1756145186791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ejercicio_rutina\` (\`ejercicio_rutina\` int NOT NULL AUTO_INCREMENT, \`repeticiones\` varchar(30) NOT NULL, \`dificultad\` varchar(30) NOT NULL, \`peso\` decimal(6,3) NOT NULL, \`observaciones\` varchar(255) NULL, \`dia_id_dia\` int NULL, \`ejercicio_basico_id_ejercicio_basico\` int NULL, PRIMARY KEY (\`ejercicio_rutina\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dia\` (\`id_dia\` int NOT NULL AUTO_INCREMENT, \`nro_dia\` varchar(1) NOT NULL, \`focus\` varchar(255) NOT NULL, \`semana_id_semana\` int NULL, PRIMARY KEY (\`id_dia\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`semana\` (\`id_semana\` int NOT NULL AUTO_INCREMENT, \`nro_semana\` varchar(1) NOT NULL, \`estado_semana\` enum ('en proceso', 'terminada', 'no iniciada') NOT NULL, \`rutina_id_rutina\` int NULL, PRIMARY KEY (\`id_semana\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` DROP COLUMN \`peso\``);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` ADD \`peso\` decimal(6,3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` CHANGE \`observaciones\` \`observaciones\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_69df2566fd028d03fe70c7c43a\` ON \`ejercicio_basico\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` DROP COLUMN \`nombre_ejercicio\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` ADD \`nombre_ejercicio\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` ADD UNIQUE INDEX \`IDX_69df2566fd028d03fe70c7c43a\` (\`nombre_ejercicio\`)`);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` ADD CONSTRAINT \`FK_c9d9eb80d21b2dfeeebb18be1c5\` FOREIGN KEY (\`dia_id_dia\`) REFERENCES \`dia\`(\`id_dia\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` ADD CONSTRAINT \`FK_2ebabf91110068663bdf6b559e7\` FOREIGN KEY (\`ejercicio_basico_id_ejercicio_basico\`) REFERENCES \`ejercicio_basico\`(\`id_ejercicio_basico\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dia\` ADD CONSTRAINT \`FK_e7fc87289f12535bfc7ded23d95\` FOREIGN KEY (\`semana_id_semana\`) REFERENCES \`semana\`(\`id_semana\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`semana\` ADD CONSTRAINT \`FK_0c017aa74410505ad6fb4176294\` FOREIGN KEY (\`rutina_id_rutina\`) REFERENCES \`rutina\`(\`id_rutina\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`semana\` DROP FOREIGN KEY \`FK_0c017aa74410505ad6fb4176294\``);
        await queryRunner.query(`ALTER TABLE \`dia\` DROP FOREIGN KEY \`FK_e7fc87289f12535bfc7ded23d95\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` DROP FOREIGN KEY \`FK_2ebabf91110068663bdf6b559e7\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_rutina\` DROP FOREIGN KEY \`FK_c9d9eb80d21b2dfeeebb18be1c5\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` DROP INDEX \`IDX_69df2566fd028d03fe70c7c43a\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` DROP COLUMN \`nombre_ejercicio\``);
        await queryRunner.query(`ALTER TABLE \`ejercicio_basico\` ADD \`nombre_ejercicio\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_69df2566fd028d03fe70c7c43a\` ON \`ejercicio_basico\` (\`nombre_ejercicio\`)`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` CHANGE \`observaciones\` \`observaciones\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` DROP COLUMN \`peso\``);
        await queryRunner.query(`ALTER TABLE \`datos_fisicos\` ADD \`peso\` float(12) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`semana\``);
        await queryRunner.query(`DROP TABLE \`dia\``);
        await queryRunner.query(`DROP TABLE \`ejercicio_rutina\``);
    }

}
