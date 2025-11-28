import React, {useEffect, useState} from 'react';


import './adminDashboard.css';
import DashboardGrid from '../../../components/dashboardGrid/dashboardGrid';
import DashboardCard from '../../../components/dashboardCard/dashboardCard';

import { useNavigate } from 'react-router-dom';
import { getToken } from "../../../auth/token";
import { decodeToken } from "../../../auth/jwt";
import { useModal } from "../../../context/ModalContext";
import HeaderCrud from '../../../components/componentsShare/header/HeaderCrud';
import { fetchGeneral } from '../../../components/componentsShare/utils/fetchGeneral';
import { FcStatistics } from "react-icons/fc";
import { TbPasswordUser } from "react-icons/tb";


const AdminDashboard = () => {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Aquí podrías redirigir al login o limpiar el localStorage
  };

  const navigate = useNavigate();
  const [tokenUsuario, setTokenUsuario] = useState(null);
  const { showModal } = useModal();
  const [usuario, setUsuario] = useState(null); // datos del usuario desde backend


    function isTokenExpired(token) {
  if (!token?.exp) return true;
  const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
  return token.exp < now;
}

  useEffect(() => {
    const token = getToken("ftxAccessToken");
    if (token) {
      const datos = decodeToken(token);
  
      if (isTokenExpired(datos)) {
        sessionStorage.removeItem("ftxAccessToken");
        console.log("Sesión expirada, token vencido");
        showModal("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.", "error", 3000);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
        return;
      }
  
      setTokenUsuario(datos);
    } else {
      console.log("Sesión expirada no hay token");
      showModal("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.", "info", 3000);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      navigate("/login");
    }
  }, []);
  
  // Busco usuario en backend cuando tengo token válido
    useEffect(() => {
      if (tokenUsuario?.sub) {
        fetchGeneral({
          url: `${API_URL}/usuario/${tokenUsuario.sub}`,
          method: "GET",
          onSuccess: (data) => setUsuario(data),
  
          showModal,
          onError: () => {
            sessionStorage.removeItem("ftx_token");
            navigate("/login");
          },
        });
      }
    }, [tokenUsuario]);
  
  const dashboardItems = [
    {
      id: 'rutina',
      icon: '✏️',
      title: 'Rutina',
      description: 'Editar Planes de entrenamiento',
      onClick: () => navigate("/admin/rutinas")
    },
    {
      id: 'clientes',
      icon: '👥',
      title: 'Listado de Clientes',
      description: 'lista los clientes con su historial de pago',
      onClick: () => navigate("/admin/clientes")
    },
    // {
    //   id: 'precios',
    //   icon: '💰',
    //   title: 'Lista de Precios',
    //   description: 'Modificar precio de los planes vigentes.',
    //   onClick: () => navigate("/admin/precios")
    // },
    {
      id: 'ejercicios',
      icon: '🏋️',
      title: 'Ejercicios',
      description: 'Editar ejercicios que luego se usan en las Rutinas',
      onClick: () => navigate("/admin/ejercicios")
    },
    {
      id: 'planes',
      icon: '📋',
      title: 'Planes',
      description: 'Editar planes de entrenamiento',
      onClick: () => navigate("/admin/planes")
    },
    {
      id: 'pagos',
      icon: '💳',
      title: 'Pagos',
      description: 'Gestionar pagos y métodos de pago de los clientes',
      onClick: () => navigate("/admin/pagos")
    },
    {
      id: 'seguimiento',
      icon: <FcStatistics />,
      title: 'Seguimiento de Rutinas',
      description: 'Ver y gestionar el progreso de los clientes',
      onClick: () => navigate("/admin/seguimiento")
    },
    {
      id: 'password',
      icon: <TbPasswordUser />,
      title: 'Password',
      description: 'cambiar password',
      onClick: () => navigate("/admin/password", { state: { usuario } })
    }

  ];

  return (

    <div className="container">
      <HeaderCrud title=" Gestion Administrador" widthPercent={100} MostrarCerrarSesion={true} />

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
    </div>
    </div>
  );
};

export default AdminDashboard;