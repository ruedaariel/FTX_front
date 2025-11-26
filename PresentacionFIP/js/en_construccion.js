
  document.getElementById("volver").addEventListener("click", function () {
    if (document.referrer) {
      window.location.href = document.referrer; // Redirige a la página anterior
    } else {

      window.location.href = "./index.html"; // Página por defecto si no hay referrer main
    }
  });

