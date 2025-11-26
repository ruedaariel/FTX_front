import { useState, useEffect } from "react";


// src/componentsShare/Modal/ModalGlobal.jsx


import { ModalProvider } from "../../../context/ModalContext.jsx"
import ModalGlobal from "../../../components/componentsShare/Modal/ModalGlobal.jsx"
import Header from "./components/header.jsx"
import Carousel from "./components/carousel.jsx"
import PorqueElegirnos from "./components/porquelegirnos.jsx"
import TuTrainer from "./components/tutrainner.jsx"
import Planes from "./components/planes.jsx"
import Testimonios from "./components/testimonios.jsx"
import Faq from "./components/faq.jsx"
import Footer from "./components/footer.jsx"
import './landingPage.css'
import EnConstruccion from "../enContruccion/EnConstruccion.jsx";

function landingPage() {
  //para manejar los links en el header y el footer
  const [open, setOpen] = useState(false);

  const handleNavClick = (cb) => {
    setOpen(false);
    if (typeof cb === 'function') cb();
  };
  return (
    <ModalProvider>
      <Header open={open} setOpen={setOpen} handleNavClick={handleNavClick} />
      <Carousel />
      <PorqueElegirnos />
      <TuTrainer />
      <Planes />
      <Testimonios />
      <Faq />
      <Footer handleNavClick={handleNavClick}/>
      <ModalGlobal />
    </ModalProvider>
  );
}

export default landingPage;

