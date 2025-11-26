use pruebaftx;

select * from Pagos;

select * from Pagos
LEFT JOIN usuario u ON u.id = Pagos.usuarioId;

DELETE FROM Pagos WHERE id_pagos = 4;