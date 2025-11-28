import React from 'react';
import logo from '../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png';
import './HeaderCrud.css';
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";


function HeaderCrud({ 
  title = "Panel", 
  widthPercent = 90, 
  MostrarCerrarSesion = false // 👈 nuevo prop
}) {
  const navigate = useNavigate();

  const volver = () => { 
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); 
    }
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem("ftx_token"); // o localStorage según tu flujo
    sessionStorage.removeItem("mensajeMostrado"); // o localStorage según tu flujo
    navigate('/');
  };

  const computedWidth =
    typeof widthPercent === 'number' ? `${widthPercent}%` : String(widthPercent);

  return (
    <nav className="top-menu" style={{ width: computedWidth }}>
      <a href="../home_administrador.html" className="logo">
        <img src={logo} alt="logo FTX" title={title} />
      </a>
      <h1 className="menu-title">{title}</h1>

{MostrarCerrarSesion ? (
  <button
    className="btn-logout"
    onClick={cerrarSesion}
    aria-label="Cerrar sesión"
    title="Cerrar sesión"
  >
    <span className="btn-icon" aria-hidden="true">
     <BiLogOutCircle size={20} color="#fff" />
    </span>
    <span className="btn-text">Cerrar sesión</span>
  </button>
) : (
  <button className="close-app" onClick={volver} aria-label="Cerrar app">✖</button>
)}

     {/*  {MostrarCerrarSesion ? (
        <button className="btn-logout" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      ) : (
        <button className="close-app" onClick={volver}>✖</button>
      )} */}

{/* {MostrarCerrarSesion ? (
  <button
    className="btn-logout"
    onClick={cerrarSesion}
    aria-label="Cerrar sesión"
    title="Cerrar sesión"
  >
    <span className="btn-icon" aria-hidden="true">
  
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
        <path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.657 6.343a8 8 0 11-11.314 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <span className="btn-text">Cerrar sesión</span>
  </button>
) : (
  <button className="close-app" onClick={volver} aria-label="Cerrar app">✖</button>
)} */}


    </nav>
  );
}

export default HeaderCrud;














