/**
 * Devuelve una rutina vacía con estructura mínima válida
 */
export const crearRutinaNueva = () => ({
  nombreRutina: "",
  nombreUsuario: "",
  semanas: [
    {
      dias: [
        {
          focus: "",
          ejerciciosRutina: [
            {
              idEjercicioBasico: "",
              repeticiones: "",
              peso: "",
              dificultad: "",
              observaciones: "",
            },
          ],
        },
      ],
    },
  ],
});
