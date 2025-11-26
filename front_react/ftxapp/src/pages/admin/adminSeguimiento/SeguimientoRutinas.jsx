import React, { useState, useEffect } from "react";
import "./SeguimientoRutinas.css";
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import SeleccionUsuarioyRutinas from "../adminSeguimiento/seleccionUsuarioyRutinas/SeleccionUsuarioyRutinas";
import AvanceRutina from "../../usuario/usuarioEstadistica/avanceRutina.jsx";
import { useModal } from "../../../context/ModalContext.jsx";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";

const SeguimientoRutinas = () => {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [rutinaABuscar, setRutinaABuscar] = useState(null);
    const [rutinaUsuario, setRutinaUsuario] = useState(null);
    const { showModal } = useModal();

  const handleUsuarioChange = (usuario) => {
    console.log("Usuario seleccionado:", usuario);
    setUsuarioSeleccionado(usuario);
    //setRutinaABuscar(null);   // cambia usuario se resetea
    //setRutinaUsuario(null);   // para recargar rutina
  };

  const handleRutinaChange = (rutina) => {
    console.log("Rutina seleccionada:", rutina);
    setRutinaABuscar(rutina);
    //setRutinaUsuario(null);
    
  };

  useEffect(() => {
      if (!rutinaABuscar) return;
        fetchGeneral({
        url: `http://localhost:8000/apiFtx/rutina/${rutinaABuscar.idRutina}`,
        method: "GET",
        onSuccess: (data) => {
          setRutinaUsuario(data);
          
        },
        showModal,
      });
    }, [rutinaABuscar?.idRutina, usuarioSeleccionado]);


  console.log("Renderizando  con rutina:", rutinaUsuario);

  return (
    <div className="container">
      <HeaderCrud title="Seguimiento de Rutinas" widthPercent={100} MostrarCerrarSesion={false} />

      <SeleccionUsuarioyRutinas
        onUsuarioChange={handleUsuarioChange}
        onRutinaChange={handleRutinaChange}
      />

      {/* Solo renderizar AvanceRutina si hay rutina seleccionada */}
      {(rutinaUsuario && rutinaABuscar) && (
        <AvanceRutina rutina={rutinaUsuario} />
      )}
    </div>
  );
};




export default SeguimientoRutinas;



