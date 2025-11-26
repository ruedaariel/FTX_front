import React, { useState } from 'react';
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import BarraBusqueda from '../adminClientes/components/barraBusqueda/BarraBusqueda';
import TablaUsuarios from '../adminClientes/components/clientes/clientes.jsx';
import ModalBusqueda from './components/modalBusqueda/ModalBusqueda.jsx';
import './PantallaClientes.css';

function PantallaClientes() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("activo");
  const [mostrarModalBusqueda, setMostrarModalBusqueda] = useState(false);
  const [filtrosAvanzados, setFiltrosAvanzados] = useState({});

  const handleBuscarAvanzado = (criterios) => {
    setFiltrosAvanzados(criterios);
  };

const handleResetFiltro = () => {
    setFiltrosAvanzados({});
    setEstadoSeleccionado("activo");
  };

  // console.log("setMostrarModalBUasqueda",mostrarModalBusqueda);
  return (
    <>
    <div className="container" >
      <HeaderCrud title="Listado de Clientes" widthPercent={100} />
      <BarraBusqueda
        estadoSeleccionado={estadoSeleccionado}
        onEstadoChange={setEstadoSeleccionado}
        onAbrirBusqueda={() => setMostrarModalBusqueda(true)}
        onResetFiltro={handleResetFiltro}
      />
      <TablaUsuarios
        estadoFiltro={estadoSeleccionado}
        filtrosAvanzados={filtrosAvanzados}
      />
      <ModalBusqueda
        isOpen={mostrarModalBusqueda}
        onClose={() => setMostrarModalBusqueda(false)}
        onBuscar={handleBuscarAvanzado}
      />
      </div>

    </>
  );
}

export default PantallaClientes;