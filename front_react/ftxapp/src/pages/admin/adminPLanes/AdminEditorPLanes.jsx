import React, { useState, useEffect } from "react";
import PlanesEditor from "./PlanesEditor/PlanesEditor";
import { PlanService } from "../../../services/planService";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral";  
import { useModal } from "../../../context/ModalContext";


const VistaPlanes = () => {
  const [planes, setPlanes] = useState([]);
  const { showModal } = useModal();
  
  useEffect(() => {
      const fetchPlanes = async () => {
        await fetchGeneral({
          url: `${API_URL}/plan/all`,
          method: "GET",
          onSuccess: (data) => {
            setPlanes(data);
          },
          showModal,
        });
      }
      fetchPlanes();
    }, []);


  const actualizarPlanes = (planActualizado) => {
    const nuevos = planes.map(p =>
      p.idPlan === planActualizado.idPlan ? planActualizado : p
    );
    setPlanes(nuevos);
  };

  return (
  
   <div className="container">
      <HeaderCrud title=" Administrador: Gestion de Planes" widthPercent={100} MostrarCerrarSesion={false} /> 
  <PlanesEditor planes={planes} actualizarPlanes={actualizarPlanes} />;
    </div>
  )
};

export default VistaPlanes;
