const ruta='../../Recursos/Imagenes/';

document.addEventListener('DOMContentLoaded', function () {
  if (typeof perfilData === 'undefined') {
    console.warn("perfilData no está definido.");
    return;
  }

  document.getElementById('imagen_perfil').src = ruta+perfilData.imagen;
  document.getElementById('nombre').textContent = perfilData.nombre;
  document.getElementById('plan').textContent = `Miembro ${perfilData.plan.charAt(0).toUpperCase() + perfilData.plan.slice(1)}`;
  document.getElementById('metas').textContent = `Mi meta: ${perfilData.metas}`;
});
