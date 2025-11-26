//estado del usuario

export enum ESTADO {
    ACTIVO = 'activo',
    INACTIVO = 'inactivo', //no esta al dia con el pago, se bloquea los servicios
    ARCHIVADO = 'archivado', // baja logica
}