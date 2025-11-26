import React, { useState } from 'react';
import './PagosAdmin.css';
import Modal from '../../../components/modal/modal';
import PagoManualForm from '../../../components/pagoManualForm/pagoManualForm';
import Button from '../../../components/form/button/button';
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import { useModal } from "../../../context/ModalContext";
import { useNavigate } from 'react-router-dom';




const PagosAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { showModal } = useModal();
  const navigate = useNavigate();

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

  return (
    <div className="container">
      <HeaderCrud title="Gestion de Pagos" widthPercent={100} />
    <div className="pagos-admin">
      {/* <div className="pagos-admin-header">
        <h1 className="page-title">Gestión de Pagos</h1>
        <p className="page-subtitle">
          Administra los pagos manuales y consulta el historial de transacciones
        </p>
      </div> */}

      <div className="pagos-admin-content">
        <div className="actions-section">
          <div className="action-card">
            <div className="card-icon">💳</div>
            <div className="card-content">
              <h3 className="card-title">Registrar Pago Manual</h3>
              <p className="card-description">
                Registra pagos en efectivo o transferencias bancarias realizados fuera del sistema
              </p>
              <Button
                variant="primary"
                size="medium"
                onClick={handleOpenModal}
                className="action-button"
              >
                Registrar Pago Manual
              </Button>
            </div>
          </div>

          {/* Placeholder para futuras funcionalidades */}
          <div className="action-card ">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3 className="card-title">Historial de Pagos</h3>
              <p className="card-description">
                Consulta y filtra el historial completo de pagos de todos los usuarios
              </p>
              <Button
                variant="primary"
                size="medium"
                onClick={ () => navigate("/admin/historialPagos") }
                className="action-button"
              >
                Historial de Pagos
              </Button>
            </div>
          </div>

          <div className="action-card ">
            <div className="card-icon">📊</div>
            <div className="card-content">
              <h3 className="card-title">Historial de Impagos</h3>
              <p className="card-description">
                Consulta y filtra el historial completo de Impagos de todos los usuarios
              </p>
              <Button
                variant="primary"
                size="medium"
                onClick={ () => navigate("/admin/historialImpagos") }
                className="action-button"
              >
                Historial de ImPagos
              </Button>
            </div>
          </div>

          <div className="action-card">
            <div className="card-icon">📈</div>
            <div className="card-content">
              <h3 className="card-title">Reportes</h3>
              <p className="card-description">
                Genera reportes detallados de ingresos y estadísticas de pagos
              </p>
              <Button
                variant="primary"
                size="medium"
                onClick={ () => navigate("/admin/reportes") }
                className="action-button"
              >
                Reportes
              </Button>
            </div>
          </div>
        </div>
      </div>

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

export default PagosAdmin;