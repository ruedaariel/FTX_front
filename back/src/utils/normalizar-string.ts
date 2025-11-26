
 export function normalizarSinEspacios(nombre: string): string {
  return nombre.trim().replace(/\s+/g, ' ');
}
