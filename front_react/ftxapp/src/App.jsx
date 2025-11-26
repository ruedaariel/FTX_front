
import { useState, useEffect } from "react";


// src/componentsShare/Modal/ModalGlobal.jsx

import { ModalProvider } from "./context/ModalContext.jsx";
import ModalGlobal from "./components/componentsShare/Modal/ModalGlobal.jsx";
import AppRutas from "./components/rutas/appRutas.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/style.css";
import "./styles/colores.css";

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <AppRutas />
      </BrowserRouter>

      {/* <InicioRutina /> */}
      <ModalGlobal />
    </ModalProvider>
  );

}

export default App;
