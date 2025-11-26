use pruebaftx;
select * from usuario;

select * from rutina;

select * from semana;

select * from dia;

select * from ejercicio_rutina;

select * from ejercicio_basico;

/*datos completos de la rutina*/
SELECT
    *
FROM
    rutina AS r
LEFT JOIN
    usuario AS u ON r.id_usuario = u.id
LEFT JOIN
    semana AS s ON s.rutina_id_rutina = r.id_rutina
LEFT JOIN
    dia AS d ON d.semana_id_semana = s.id_semana
LEFT JOIN
    ejercicio_rutina AS er ON er.dia_id_dia = d.id_dia
LEFT JOIN
    ejercicio_basico AS eb ON er.ejercicio_basico_id_ejercicio_basico = eb.id_ejercicio_basico
ORDER BY
    r.id_rutina, s.id_semana, d.id_dia, er.id_ejercicio_rutina;
