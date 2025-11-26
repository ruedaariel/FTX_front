import React from "react";
import "./style_en_construccion.css"; // Asegurate de importar los estilos
import "../../../styles/colores.css";    // Ruta relativa según tu estructura
import logo from '../../../assets/Recursos/IconosLogos/logo.png';
import iconofacebook from '../../../assets/Recursos/IconosLogos/Logo_facebook.png';
import iconoinstagram from '../../../assets/Recursos/IconosLogos/logo_instagram.png';
import iconox from '../../../assets/Recursos/IconosLogos/logo_x.png';
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
const EnConstruccion = () => {
  return (

    <div className="container">
      <HeaderCrud title="Seguimos trabajando ..." widthPercent={100} />
    <div className="container-en-construccion">
      <header className="header-en-construccion">
        <img
          src={logo} // Asegurate que esté en public/assets/
          alt="Logo FTX"
          className="logo-en-construccion"
        />
      </header>

      <main>
        <h1 className="h1-en-construccion">Estamos trabajando en esta sección</h1>
        <p className="p-en-construccion">
          Esta página aún está en desarrollo. Estamos mejorando la experiencia
          para que pronto puedas acceder a todas las funcionalidades.
        </p>

        <div className="progress-bar-container-en-construccion">
          <div className="progress-bar-en-construccion"></div>
        </div>

        <div className="percentage-en-construccion">75% completado</div>

        <div className="contact-info-en-construccion">
          <p className="contact-info-p-en-construccion">Mientras tanto, puedes seguirnos en nuestras redes sociales:</p>
          <div className="social-icons-en-construccion">
            
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
              <img src={iconoinstagram} alt="Instagram" className="social-icons-img"/>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
              <img src={iconofacebook} alt="Facebook" className="social-icons-img" />
            </a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" title="X">
              <img src={iconox} alt="X" className="social-icons-img" />
            </a>
          </div>
        </div>
      </main>

      <footer className="footer-en-construccion">
        <p className="footer-p-en-construccion">FTX &copy; 2025 — Todos los derechos reservados</p>
      </footer>
    </div>
    </div>
  );
};

export default EnConstruccion;
