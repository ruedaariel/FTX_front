// import React from 'react';
// // ❌ Rutas incorrectas - NO uses "../src" desde src
// // import Header from '../src/components/header.jsx'

// // ✅ Rutas correctas - Usa "./" para la carpeta actual
// import Header from './components/header.jsx'
// import Carousel from './components/carousel.jsx'
// import Porqueelegirnos from './components/porquelegirnos.jsx'
// import Tutrainer from './components/tutrainner.jsx'
// import Planes from './components/planes.jsx'
// import Testimonios from './components/testimonios.jsx'
// import Faq from './components/faq.jsx'
// import Footer from './components/footer.jsx'
// //import LoginBasico from './components/login/LoginBasico.jsx'
// import LoginApi from './components/login/LoginApi.jsx'
// import AdminDashboard from './pages/adminDashboard/adminDashboard.jsx'
import PagosAdmin from './pages/adminPagos/pagosAdmin.jsx';
// ✅ Agregar la importación

function App() {
  return (
    <div>
      <PagosAdmin />
    </div>
  )
}

export default App
