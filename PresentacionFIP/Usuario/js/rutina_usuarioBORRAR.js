/*-- ==========================================================================
   Archivo: rutina.js
   Descripción: permite mostrar los ejercicios (y el detalle de los mismos) dependiendo de la semana y dia seleccionado
   ========================================================================== */

   //Muestra una semana
    function abrirSemana(evt, nombreSemana) {
      var i, semanaContainer, weekTabbuttons;
      semanaContainer = document.getElementsByClassName("semana-container");
      for (i = 0; i < semanaContainer.length; i++) {
        semanaContainer[i].style.display = "none";
        semanaContainer[i].classList.remove("active");
      }
      semanaBoton = document.getElementsByClassName("btn-semana");
      for (i = 0; i < semanaBoton.length; i++) {
        semanaBoton[i].classList.remove("active");
      }
      document.getElementById(nombreSemana).style.display = "block";
      document.getElementById(nombreSemana).classList.add("active");
      evt.currentTarget.classList.add("active");

      var btnPrimerDia = document.querySelector(
        "#" + nombreSemana + " .btns-dias-container .btn-dia"
      );
      if (btnPrimerDia) {
        btnPrimerDia.click();
      }
    }

    //Muestra los ejercicios en funcion del boton del dia cliqueado
    function abrirEjDelDia(evt, nombreDia, idSemana) {
      var i, contenidoDia, btnsDia;
      contenidoDia = document.querySelectorAll(
        "#" + idSemana + " .ejercicios-por-dia"
      );
      for (i = 0; i < contenidoDia.length; i++) {
        contenidoDia[i].style.display = "none";
        contenidoDia[i].classList.remove("active");
      }
      btnsDia = document.querySelectorAll(
        "#" + idSemana + " .btns-dias-container .btn-dia"
      );
      for (i = 0; i < btnsDia.length; i++) {
        btnsDia[i].classList.remove("active");
      }
      document.getElementById(nombreDia).style.display = "block";
      document.getElementById(nombreDia).classList.add("active");
      evt.currentTarget.classList.add("active");
    }

    //Muestra el contenido del ejercicio cuando se hace click en el icono desplegable
    function desplegarDetalleEjercicio(elemento) {
      const IdDetalle = elemento.getAttribute('aria-controls');
      const panelDetalle = document.getElementById(IdDetalle);
      const estaExpandido = elemento.getAttribute('aria-expanded') === 'true';
      const icon = elemento.querySelector('i');

      if (panelDetalle) {
        panelDetalle.style.display = estaExpandido ? 'none' : 'block';
        elemento.setAttribute('aria-expanded', !estaExpandido);
        if (estaExpandido) {
          icon.classList.remove('fa-chevron-up');
          icon.classList.add('fa-chevron-down');
        } else {
          icon.classList.remove('fa-chevron-down');
          icon.classList.add('fa-chevron-up');
        }
      }
    }

    document.addEventListener("DOMContentLoaded", function () {
      // Activar la primera pestaña de semana y el primer día
      if (document.getElementsByClassName("btn-semana").length > 0) {
        document.getElementsByClassName("btn-semana")[0].click();
      }

      // Añadir event listeners para los botones de despliegue de detalles
      const btnDesplegable = document.querySelectorAll('.btn-desplegable');
      btnDesplegable.forEach(button => {
        button.addEventListener('click', function () {
          desplegarDetalleEjercicio(this);
        });
      });
    });
