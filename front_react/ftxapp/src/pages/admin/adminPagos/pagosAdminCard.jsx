import React, {useEffect, useState} from 'react';


import '../adminDashboard/adminDashboard.css';
import DashboardGrid from '../../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../../components/dashboardCard/dashboardCard';

import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/modal/modal';
import PagoManualForm from '../../../components/pagoManualForm/pagoManualForm';

import { useModal } from "../../../context/ModalContext";
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import { fetchGeneral } from '../../../components/componentsShare/utils/fetchGeneral';
import { FcStatistics } from "react-icons/fc";
import { TbPasswordUser } from "react-icons/tb";


const PagosAdminCard = () => {
  

  const navigate = useNavigate();
  
  const { showModal } = useModal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(null); // datos del usuario desde backend

  

 const handleOpenModal = () => {
    console.log("voy a abrir modal");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPago = async (pagoData) => {
    setLoading(true);
    
    try {
      // console.log('Enviando pago manual:', pagoData);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // console.log('Pago registrado exitosamente');
      showModal("Pago registrado exitosamente", "success", 2000);
      
      // alert('Pago registrado exitosamente');
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al registrar pago:', error);
      showModal("Error al registrar el pago", "error", 2000);
      // alert('Error al registrar el pago');
    } finally {
      setLoading(false);
    }
  };
  
  const dashboardItems = [
    {
      id: 'pagosManual',
      icon: '💳',
      title: 'Registrar Pago manual',
      description: 'Registra pagos en efectivo o transferencias bancarias realizados fuera del sistema',
      onClick: handleOpenModal
    },
    {
      id: 'historialPagos',
      icon: '📊',
      title: 'Historial de Pagos',
      description: 'Consulta y filtra el historial completo de pagos de todos los usuarios',
      onClick: () => navigate("/admin/historialPagos")
    },
    {
      id: 'historialImpagos',
      icon: '📊',
      title:' Historial de Impagos',
      description: 'Consulta y filtra el historial completo de Impagos de todos los usuarios',
      onClick: () => navigate("/admin/historialImpagos")
    },
    
    
    {
      id: 'reportes',
      icon: '📈',
      title: 'Reportes',
      description: 'Genera reportes detallados de ingresos y estadísticas de pagos',
      onClick: () => navigate("/admin/reportes")
    }
    

  ];

 

  return (

    <div className="container">
      <HeaderCrud title=" Gestion Admnistrador" widthPercent={100} MostrarCerrarSesion={false} />

    <div className="admin-dashboard">
      {/* <HeaderAdmin 
        logo="FTX"
        title="Panel Administrador"
        onLogout={handleLogout}
        logoutText="Cerrar Sesión"
      /> */}
      
      <main className="dashboard-main">
        <DashboardGrid columns={3} gap="2rem">
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              onClick={item.onClick}
              variant="default"
            />
          ))}
        </DashboardGrid>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Registrar Pago Manual"
        size="large"
      >
        <PagoManualForm
          onSubmit={handleSubmitPago}
          onCancel={handleCloseModal}
          loading={loading}
        />
      </Modal>
    </div>
    </div>
  );
};

export default PagosAdminCard;