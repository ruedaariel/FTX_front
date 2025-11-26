import React from 'react';
import HeroImageSection from './components/HeroImageSection';
import LoginFormSection from './components/LoginFormSection';
import "./loginpage.css";

// Importá las imágenes desde assets
import logoNaranja from '../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png';
import ftxImage13 from '../../../assets/Recursos/Imagenes/FTX_13.jpg';

const LoginPage = () => {
  return (
    <div className="container-fluid login-container p-0">
      <div className="row g-0 min-vh-100">
        {/* Left side: imagen (solo en desktop) 
        <div className="col-lg-6 d-none d-lg-block">*/}
          <HeroImageSection image={ftxImage13} logo={logoNaranja} />
       {/*  </div>*/}

        {/* Right side: formulario */}
        <div className="col-12 col-lg-6 d-flex align-items-center">
          <div className="w-100">
            <LoginFormSection logo={logoNaranja} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
