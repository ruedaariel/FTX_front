import { useState, useEffect } from "react";

// Componentes principales
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud.jsx";
import SelectorRutinas from "./components/SelectorRutina/selectorRutina.jsx";
import RutinaUsuario from "./components/rutinaUsuario/rutinaUsario.jsx";
import RutinaVisual from "./components/rutinaVisual/rutinaVisual.jsx";

// Contexto de modal
import { useModal } from "../../../context/ModalContext.jsx";

// Utilidades
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral.js";
import { guardarRutinaEnBackend } from "./utils/guardarRutina.js";
import {
  guardarSemanaCompleta,
  transformarRutinaCompleta,
} from "./utils/rutinaUtils.js";
// import { extraerMensajeError } from "../../../components/componentsShare/utils/extraerMensajeError.js";
import { armarRutinaParaGuardar } from "./utils/armarRutinaParaGuardar.js";
//import { validarRutinaCompleta } from "../../../components/componentsShare/utils/validarRutinaCompleta.js";
import { sanearRutinaCompleta } from "./utils/sanearRutinaCompleta.js";
import { crearRutinaNueva } from "./utils/plantillasRutina.js";
import ModalResumenRutina from "./components/ResumenSemanaRutina/ModalResumenRutina.jsx";
import API_URL from "../../../config/api.js";

function inicioRutina() {
  // Estados principales
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState(null); // Rutina seleccionada desde el selector
  const [rutinaData, setRutinaData] = useState(null); // Rutina cargada desde backend
  const [modoRutina, setModoRutina] = useState("Crear"); // Modo actual: Crear, Copiar o Editar
  const [reiniciarRutina, setReiniciarRutina] = useState(false); // Flag para reiniciar interfaz
  const { showModal } = useModal(); // Modal global
  const [mostrarResumenModal, setMostrarResumenModal] = useState(false);

  const [rutinaPendienteGuardar, setRutinaPendienteGuardar] = useState(null);

  const [rutinaFinal, setRutinaFinal] = useState(null); // Rutina editada lista para guardar
  const [datosRutinaUsuario, setDatosRutinaUsuario] = useState({
    nombreRutina: "",
    idUsuario: null,
  });

  // Cargar rutina desde backend al seleccionar una existente
  useEffect(() => {
    if (rutinaSeleccionada?.idRutina) {
      fetchGeneral({
        url: `${API_URL}/rutina/${rutinaSeleccionada.idRutina}`,
        method: "GET",
        onSuccess: (data) => {
          setRutinaData(data);
        },
        showModal,
      });
    }
  }, [rutinaSeleccionada]);

  // Generar rutina vacía al entrar en modo "Crear"
  useEffect(() => {
    if (modoRutina === "Crear") {
      const rutinaNueva = crearRutinaNueva();
      setRutinaSeleccionada(rutinaNueva);
      setRutinaData(rutinaNueva);
    }
  }, [modoRutina]);

  // Guardar rutina en backend
  const handleGuardarRutina = async () => {
    const payload = rutinaFinal.semanas.map((_, index) =>
      guardarSemanaCompleta(rutinaFinal, index)
    );

    if (!rutinaFinal || !datosRutinaUsuario.nombreRutina) {
      showModal("Faltan datos para guardar la rutina", "error");
      return;
    }

    //console.log("Rutina Final ---->", rutinaFinal);
    //console.log("Datos Rutina Usuario ---->", datosRutinaUsuario);

    const rutinaSaneada = {
      ...sanearRutinaCompleta(rutinaFinal),
      idUsuario: datosRutinaUsuario.idUsuario,
    };
    setRutinaPendienteGuardar(rutinaSaneada);

    //console.log("Rutina Saneada ---->", rutinaSaneada);

    setMostrarResumenModal(true); //  Mostrar modal antes de guardar
  };

  // Guarda Rutina luego de confirmar en el modal
  const guardarRutinaConfirmada = async (rutinaModificada) => {

    console.log("%crutinaModificada----->","color: yellow; font-weight: bold;",rutinaModificada);
    const rutinaParaGuardar = armarRutinaParaGuardar({
      rutinaFinal: rutinaModificada,
      modoRutina,
      datosRutinaUsuario,
      estado: rutinaModificada.estadoRutina,
    });

    

    // borra la prpiredad id que no es necesaria par backend en editar
    if (modoRutina === "Editar") {
      delete rutinaParaGuardar.id;
    }

    console.log("%crutinaParaGuardar----->","color: yellow; font-weight: bold;",rutinaParaGuardar);
    // try {
    const data = await guardarRutinaEnBackend(
      rutinaModificada.idRutina,
      rutinaParaGuardar,
      modoRutina,
      showModal
    );

    if (data) {
      const mensaje =
        modoRutina === "Crear"
          ? "Rutina creada correctamente"
          : modoRutina === "Copiar"
          ? "Rutina copiada y guardada correctamente"
          : "Rutina editada correctamente";

      showModal(mensaje, "success", 1500);
      resetearInterfaz();
    }
    setMostrarResumenModal(false);
  };

  // Reiniciar interfaz después de guardar
  const resetearInterfaz = () => {
    const rutinaNueva = crearRutinaNueva();
    //console.log("rutinaNueva ----->", rutinaNueva);
    setRutinaSeleccionada(rutinaNueva);
    setRutinaData(rutinaNueva);
    setModoRutina("Crear");
    //setReiniciarRutina(!reiniciarRutina);
    //console.log("Interfaz reiniciada para nueva rutina.");
  };

  // Render principal
  return (
    
      <div className="container">
      <HeaderCrud title="Gestion de Rutinas" />

      <SelectorRutinas
        onSeleccionarRutina={setRutinaSeleccionada}
        modoRutina={modoRutina}
        setModoRutina={setModoRutina}
      />

      <RutinaUsuario
        rutinaSeleccionada={rutinaSeleccionada}
        rutinaEditable={rutinaData}
        mostrarModalInfo={showModal}
        modoRutina={modoRutina}
        onResetearInterfaz={resetearInterfaz}
        onDatosRutinaChange={setDatosRutinaUsuario}
        datosRutinaUsuario={datosRutinaUsuario}
      />

      {rutinaData?.semanas?.length > 0 && (
        <RutinaVisual
          rutina={rutinaData}
          modoRutina={modoRutina}
          mostrarModalInfo={showModal}
          onRutinaEditadaChange={setRutinaFinal}
          onGuardarRutina={handleGuardarRutina}
        />
      )}

      <ModalResumenRutina
        isOpen={mostrarResumenModal}
        onClose={() => setMostrarResumenModal(false)}
        onConfirmar={guardarRutinaConfirmada}
        rutina={rutinaPendienteGuardar}
        modoRutina={modoRutina}
      />

      {/* <div className="boton-guardar-global">
        <button
          className="btn-guardar-rutina-visual"
          onClick={handleGuardarRutina}
        >
          Guardar rutina
        </button>
      </div> */}
      </div>
    
  );
}

export default inicioRutina;
