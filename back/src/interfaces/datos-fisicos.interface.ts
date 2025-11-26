export interface IDatosFisicos {
  id: number; // opcional si lo usás antes de persistir en la DB
  actividadDiaria?: string;
  peso?: number;
  estatura?: number;
  metas?: string;
  observaciones?: string;
}