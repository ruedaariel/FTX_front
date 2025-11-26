
export function transformarFecha(fecha: string): Date | null {

  const fechaValida = new Date(fecha);
  if (!isNaN(fechaValida.getTime())) {
    return fechaValida;
  }
  return null
}

export function sumaMes(date: Date, months: number): Date {
  const d = new Date(date.getTime());
  // usar UTC para evitar problemas de zona horaria
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const day = d.getUTCDate();
  const hour = d.getUTCHours();
  const minute = d.getUTCMinutes();
  const second = d.getUTCSeconds();
  const millisecond = d.getUTCMilliseconds();

  // crear nueva fecha en UTC con el mes sumado
  const target = new Date(Date.UTC(year, month + months, day, hour, minute, second, millisecond));

  // Si el día original no existe en el mes destino (ej. 31 ene -> feb), Date.UTC ajusta automáticamente;
  // a la fecha mas cercana.
  return target;
}

export function normalizarDateA0(date: Date): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}

export function isPagoVigente(fechaPago: Date): { activo: boolean; expira: Date } {
  const hoy = new Date();
  const expira = sumaMes(fechaPago, 1);
  return { activo: hoy.getTime() < expira.getTime(), expira };
}

export function calcularFechaVencimiento(fechaPago: Date, fechaPagoEsDateOnly = false): Date {
  const base = fechaPagoEsDateOnly ? normalizarDateA0(fechaPago) : new Date(fechaPago.getTime());
  const fechaVencimiento = sumaMes(base, 1);
  return fechaVencimiento;
}

// normaliza un Date a medianoche local (quita la parte de hora)
export function toLocalDateOnly(d: Date): Date {
  const dt = new Date(d); // clon
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function pad2(n: number) { return n < 10 ? `0${n}` : `${n}`; }

/**
 * Formatea una fecha a "dd/MM/yy" usando getters UTC para evitar corrimientos.
 */
export function formatToDdMmYy(value: unknown): string | null {
  if (value == null) return null;

  // 1) date-only string guardada como "YYYY-MM-DD" o "YYYY/MM/DD" -> manipular por string
  if (typeof value === 'string') {
    if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(value)) {
      const parts = value.includes('/') ? value.split('/') : value.split('-'); // [YYYY,MM,DD]
      const [yyyy, mm, dd] = parts;
      const yy = yyyy.slice(-2);
      return `${dd}/${mm}/${yy}`;
    } else {
        return value
    }

  }

  // 2) si ya es Date -> usar getters UTC (no mutar)
  if (value instanceof Date && !isNaN(value.getTime())) {
    const dd = pad2(value.getUTCDate());
    const mm = pad2(value.getUTCMonth() + 1);
    const yy = String(value.getUTCFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  }

  // 3) timestamp numérico (ms) -> construir Date y usar UTC
  if (typeof value === 'number' && Number.isFinite(value)) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      const dd = pad2(d.getUTCDate());
      const mm = pad2(d.getUTCMonth() + 1);
      const yy = String(d.getUTCFullYear()).slice(-2);
      return `${dd}/${mm}/${yy}`;
    }
    return null;
  }

  // 4) string ISO u otros formatos -> intentar parsear y usar UTC
  if (typeof value === 'string') {
    const d = new Date(value);
    if (!isNaN(d.getTime())) {
      const dd = pad2(d.getUTCDate());
      const mm = pad2(d.getUTCMonth() + 1);
      const yy = String(d.getUTCFullYear()).slice(-2);
      return `${dd}/${mm}/${yy}`;
    }
    return null;
  }

  return null;
}

export function transforma_a_DDMMYY(value: unknown): string | null | unknown {
    console.log("Valor en transform fecha", value);
    if (value == null) return null;               // null | undefined
    if (typeof value === 'string') {
      if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(value)) {
        const [yyyy, mm, dd] = value.split('-');
        return `${dd}/${mm}/${yyyy}`; 
      } else {
        return value;
        /*  const d = new Date(value);
         console.log("en string sin formato", d);
         console.log(d.getTime() ? format(d, 'dd-MM-yyyy') : value);
         return !isNaN(d.getTime()) ? format(d, 'dd-MM-yyyy') : value; */
      }


    }
    if (value instanceof Date && !isNaN(value.getTime())) {

      return formatToDdMmYy(value);
    }
    if (typeof value === 'number') {               // timestamp
      const d = new Date(value);
      if (!isNaN(d.getTime())) return formatToDdMmYy(d);
    }
    return null;
  } //transforma a string con formato y tambien acepta null