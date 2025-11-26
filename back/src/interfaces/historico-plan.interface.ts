
export interface IHistoricoPlan {
    idPlanHistorico: number;
    nombrePlan: string;
    descripcion: string;
    precio: number;
    fCambioInicio: Date;
    fCambioFin:Date;
    detalleCambio:string;
}