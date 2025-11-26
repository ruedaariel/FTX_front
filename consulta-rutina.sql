use pruebaftx;

select * from rutina;

/*listado de rutina-usuario o rutina - nada*/
SELECT * FROM rutina r
LEFT JOIN usuario u ON u.id = r.id_rutina;
