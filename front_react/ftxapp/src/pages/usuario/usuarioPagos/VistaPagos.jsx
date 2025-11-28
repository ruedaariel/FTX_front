import React, { useEffect, useState } from "react";
import PagosListados from "./PagosListados/PagosListados";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral";
import { useModal } from "../../../context/ModalContext";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud";
import { useLocation } from "react-router-dom";
import API_URL from "../../../config/api";


const VistaPagos = () => {
  const [pagos, setPagos] = useState([]);
  const { showModal } = useModal();
  const location = useLocation();
  const usuario = location.state?.usuario;

   console.log("usuario",usuario);

  useEffect(() => {
    fetchGeneral({
      url: `${API_URL}/pagos/${usuario.id}`, // ajustá según tu endpoint real
      method: "GET",
      onSuccess: (data) => {
        setPagos(data);
      },
      onError: () => {
        showModal("Error al cargar los pagos", "error", 3000);
      },
      showModal,
    });
  }, []);

  console.log("Pagos cargados:", pagos);
  return (
  
    <div className="container">
      <HeaderCrud title= "Historial de Pagos" widthPercent={100} MostrarCerrarSesion={false} /> 
  <PagosListados pagos={pagos} />;
    </div>
  )
  
};

export default VistaPagos;
