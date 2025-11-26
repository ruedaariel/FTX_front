function obtenerUsuarioMock() {
  return {
    id: 1,
    email: "ccsc@gmail.com",
    rol: "usuario",
    estado: "activo",
    datosPersonales: {
      nombre: "Glach",
      apellido: "Gch",
      dni: "12345678",
      phone: "1123456789",
      genero: "mujer",
      plan: {
        idPlan: 1,
        nombrePlan: "Plan Pro",
        precio: "30000.00"
      },
      fNacimiento: "09/10/1991",
      imagenPerfil: "http://localhost:8000/uploads/perfiles/usuario.png"
    },
    datosFisicos: {
      actividadDiaria: "Gimnasio 3 veces por semana",
      peso: "80.000",
      estatura: 180,
      metas: "Ganar masa muscular",
      observaciones: "Tiene alergia al polen"
    }
  };
}

export default obtenerUsuarioMock;