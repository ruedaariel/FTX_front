use pruebaftx;

select * from plan;

select * from historico_plan;

select * from migrations;

drop table migrations;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE Pagos, usuario, plan, historico_plan, datospersonales, datos_fisicos, ejercicio_basico, ejercicio_rutina, dia, semana, rutina, migrations;
SET FOREIGN_KEY_CHECKS = 1;

show tables;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS datos_fisicos;
DROP TABLE IF EXISTS historico_plan;
DROP TABLE IF EXISTS plan;
DROP TABLE IF EXISTS datospersonales;
DROP TABLE IF EXISTS ejercicio_basico;
DROP TABLE IF EXISTS ejercicio_rutina;
DROP TABLE IF EXISTS dia;
DROP TABLE IF EXISTS pagos;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rutina;
DROP TABLE IF EXISTS semana;
DROP TABLE IF EXISTS migrations;
DROP TABLE IF EXISTS typeorm_metadata;

SET FOREIGN_KEY_CHECKS = 1;
