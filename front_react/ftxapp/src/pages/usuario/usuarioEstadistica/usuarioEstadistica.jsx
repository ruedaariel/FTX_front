import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes principales
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";
import { useLocation } from "react-router-dom";

// Contexto de modal
import { useModal } from "../../../context/ModalContext.jsx";
import API_URL from "../../../config/api.js";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import AvanceRutina from "./avanceRutina.jsx";
import SelectorRutinasUsuario from "../usuarioRutina/components/SelectorRutinasUsuario/SelectorRutinasUsuario.jsx";
import {
  obtenerRutinasUsuario,
  obtenerRutina,
} from "../components/utils/fetchRutinasUsuario.js";



function UsuarioRutina() {
  const location = useLocation();
  const usuario = location.state?.usuario;
  const navigate = useNavigate();

  // Estados principales
  const [rutinasUsuario, setRutinasUsuario] = useState([]); // listado de rutinas del usuario
  const { showModal } = useModal(); // Modal global
  // Estado para la rutina seleccionada
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null);
  const [rutinaAMostrar, setRutinaAMostrar] = useState(null);

  // const rutinaABuscar = 129; // ID de la rutina del usuario, esto debería venir de la sesión o contexto de usuario

  // console.log("usuario",usuario);

  // Cargar rutinas desde backend con el id de usuario
  useEffect(() => {
    //  console.log("entre al useeffect");

    let urlesta = `${API_URL}/usuario/rutinasEstadistica/`;
    
    async function cargarRutinas() {
      const rutinas = await obtenerRutinasUsuario(
        urlesta,
        usuario.id,
        showModal,
        navigate
      );
      setRutinasUsuario(rutinas);
    }
    if (usuario?.id) {
      cargarRutinas();
    }
  }, [usuario]);

  // console.log("rutinasUsuario",rutinasUsuario);

  const handleSeleccionarRutina = (rutina) => {
    setRutinaSeleccionada(rutina);
  };

  // Cargar rutina desde backend al seleccionar una existente
  useEffect(() => {
    async function cargarRutina() {
      if (rutinaSeleccionada?.idRutina) {
        console.log("Rutina seleccionada cambió:", rutinaSeleccionada.idRutina);
        const rutina = await obtenerRutina(
          rutinaSeleccionada.idRutina,
          showModal
        );
        setRutinaAMostrar(rutina);
        console.log("rutinaAMostrar", rutina);
      }
    }
    cargarRutina();
  }, [rutinaSeleccionada]);

  useEffect(() => {
    if (rutinaAMostrar) {
      console.log("rutinaAMostrar cambió:", rutinaAMostrar);

      // si rutinaAMostrar es proxima debo preguntar y pasarla a activa
      // y pasar la activa a finalizada buscando en rutinasUsuario

      if (rutinaAMostrar.estado === "proxima") {
        // busco la rutina activa en rutinasUsuario y la paso a finalizada llamo al backend
      } // si no es proxima no hago nada
    }
  }, [rutinaAMostrar]);
// Render principal
  return (
    <>
    <div className="container">
      <HeaderCrud title={`${usuario.datosPersonales.nombre}, esta es tu avance de rutinas`} widthPercent={100}/>
    
    {/* Mostrar el selector solo si NO hay rutina seleccionada */}
        {!rutinaSeleccionada && (
          <SelectorRutinasUsuario
            opciones={rutinasUsuario}
            valorSeleccionado={rutinaSeleccionada}
            onSeleccionar={handleSeleccionarRutina}
            labelTexto={`${usuario.datosPersonales.nombre}`}
          />
        )}

    {/* {(Array.isArray(rutinaUsuario) && rutinaUsuario.length > 0) && ( */}
     {/* <AvanceRutina rutina={rutinaUsuario} /> */}
    {rutinaAMostrar && <AvanceRutina rutina={rutinaAMostrar} />}
    {/* )} */}
      </div>
    </>

  );
}

export default UsuarioRutina;