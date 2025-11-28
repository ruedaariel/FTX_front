import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Componentes principales
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";

// Contexto de modal
import { useModal } from "../../../context/ModalContext.jsx";

import SelectorRutinasUsuario from "./components/SelectorRutinasUsuario/SelectorRutinasUsuario.jsx";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
// import RutinaPorSemana from "../../../components/usuario/usuarioRutina/RutinaPorSemana.jsx";
import RutinaInteractiva from "./components/RutinaGenericaInteractiva.jsx";
import {
  obtenerRutinasUsuario,
  obtenerRutina,
  cambiarEstadoRutina
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
    async function cargarRutinas() {
      const rutinas = await obtenerRutinasUsuario(
        `${API_URL}/usuario/rutinas/`,
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

  // recorreo el arreglo de las rutinas y detrecta la activa devolviendo el id de la misma
  function obtenerIdRutinaActiva(rutinas) {
  if (!Array.isArray(rutinas)) return null;

  for (let i = 0; i < rutinas.length; i++) {
    if (rutinas[i].estadoRutina === "activa") {
      return rutinas[i].idRutina;
    }
  }

  return null; // si no encuentra ninguna
}



  useEffect(() => {
    if (rutinaAMostrar) {
      console.log("rutinaAMostrar cambió:", rutinaAMostrar);

      // si rutinaAMostrar es proxima debo preguntar y pasarla a activa
      // y pasar la activa a finalizada buscando en rutinasUsuario

      const RutinaAFinalizada = obtenerIdRutinaActiva(rutinasUsuario);
      console.log("RutinaAFinalizada", RutinaAFinalizada);

      // si tienen mas de una rutina
      if (rutinaAMostrar.estadoRutina === "proxima" && rutinas.length() > 1) {

        
        showModal(
         "¿Si cambias esta rutina a ACTIVA la actual será FINALIZADA?",
         "decision",
         0,
         true,
         (respuesta) => {
           if (respuesta) {
            // **Acción si el usuario confirma**
            cambiarEstadoRutina(rutinaAMostrar.idRutina, "activa", showModal);
            cambiarEstadoRutina(RutinaAFinalizada,"finalizada", showModal);
           } 
          }  
       );

       
        
        // busco la rutina activa en rutinasUsuario y la paso a finalizada llamo al backend
      } else {cambiarEstadoRutina(rutinaAMostrar.idRutina, "activa", showModal);}// si no es proxima no hago nada
    }
  }, [rutinaAMostrar]);

  // Render principal
  return (
    <>
      <div className="container">
        <HeaderCrud
          title={`${usuario.datosPersonales.nombre}, esta es tu página de rutinas`}
          widthPercent={100}
        />

        {/* Mostrar el selector solo si NO hay rutina seleccionada */}
        {!rutinaSeleccionada && (
          <SelectorRutinasUsuario
            opciones={rutinasUsuario}
            valorSeleccionado={rutinaSeleccionada}
            onSeleccionar={handleSeleccionarRutina}
            labelTexto={`${usuario.datosPersonales.nombre}`}
          />
        )}

        {/* {(Array.isArray(rutinaAMostrar) && rutinaAMostrar.length > 0) && ( */}
        {rutinaAMostrar && <RutinaInteractiva rutina={rutinaAMostrar} />}

        {/* )} */}
      </div>
    </>
  );
}

export default UsuarioRutina;
