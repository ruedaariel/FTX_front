use pruebaftx;

select * from usuario;
select * from ejercicio_basico;
select * from datospersonales;

select * from datos_fisicos;

/*listado de todos los usuarios (todos los datos)*/
SELECT * FROM usuario u
LEFT JOIN datospersonales dp ON u.id = dp.id
LEFT JOIN datos_fisicos df ON u.id = df.id;


/* buscar un ususario completo por mail*/
SELECT * FROM usuario u
LEFT JOIN datospersonales dp ON u.id = dp.id
LEFT JOIN datos_fisicos df ON u.id = df.id
WHERE u.email = 'ariel@correo.com';

/* listar un usuario (id) (incluye el plan)*/
SELECT 
  u.*, 
  dp.*, 
  df.*, 
  p.*
FROM usuario u
LEFT JOIN datospersonales dp ON u.id = dp.id
LEFT JOIN datos_fisicos df ON u.id = df.id
LEFT JOIN plan p ON dp.plan_id_plan = p.id_plan;
/*WHERE u.id = 1;*/


/* listar un usuario (id) (incluye el plan y rutina)*/
SELECT 
  u.*, 
  dp.*, 
  df.*, 
  p.*,
  r.*
FROM usuario u
LEFT JOIN datospersonales dp ON u.id = dp.id
LEFT JOIN datos_fisicos df ON u.id = df.id
LEFT JOIN plan p ON dp.plan_id_plan = p.id_plan
LEFT JOIN rutina r ON u.id = r.id_usuario
WHERE u.id = 2;

/*modificar un campo*/
UPDATE usuario
SET estado = 'inactivo' -- o 'activo', 'archivado'
WHERE id = 5;

UPDATE datospersonales
SET imagen_perfil = 'usuario.png' -- o 'activo', 'archivado'
WHERE id = 16;

/*borrar un ususario OJO NO BORRA EN CASCADA*/
DELETE FROM datos_fisicos WHERE id = 18;
DELETE FROM datospersonales WHERE id = 18;
DELETE FROM usuario WHERE id = 18;