

import HeaderCrud from './components/componentsShare/header/HeaderCrud.jsx'
import CrudEjercicioBasico from './components/admin/adminEjercicio/CrudEjercicioBasico.jsx'
import { ModalProvider } from "../src/context/ModalContext.jsx";
import ModalGlobal from "./components/componentsShare/Modal/ModalGlobal.jsx";

function App() {
  return (
    <>

      {/* <Header />
      <Carousel />
      <Porqueelegirnos />
      <Tutrainer />
      <Planes />
      <Testimonios />
      <Faq /> */}
      {/* <Footer /> */}
      {/* <LoginApi /> */}
      <ModalProvider>
       <HeaderCrud title="Gestion de Ejercicios"></HeaderCrud>
        <CrudEjercicioBasico></CrudEjercicioBasico>
        <ModalGlobal></ModalGlobal>
      </ModalProvider>



    </>
  )
}

export default App
