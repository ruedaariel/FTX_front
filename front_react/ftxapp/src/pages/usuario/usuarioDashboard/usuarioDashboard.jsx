import React, { useState, useEffect } from "react";
import "./usuarioDashboard.css";

import DashboardGrid from "../../../components/dashboardGrid/dashboardGrid";
import DashboardCard from "../../../components/dashboardCard/dashboardCard";
import { useNavigate } from "react-router-dom";
import HeaderCrud from "../../../components/componentsShare/header/HeaderCrud";
import { IoPeopleSharp } from "react-icons/io5";
import { useModal } from "../../../context/ModalContext";
import { fetchGeneral } from "../../../components/componentsShare/utils/fetchGeneral";
import { getToken } from "../../../auth/token";
import { decodeToken } from "../../../auth/jwt";
import { storageService } from "../../public/loginPage/components/utils/storageService";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import API_URL from "../../../config/api";

const UsuarioDashboard = () => {
  const navigate = useNavigate();
  const { showModal } = useModal();

  // Estados principales
  const [tokenUsuario, setTokenUsuario] = useState(null); // token decodificado
  const [usuario, setUsuario] = useState(null); // datos del usuario desde backend
  const [validarUsuario, setValidarUsuario] = useState(null); // datos del usuario desde sessionStorage

  //   sessionStorage.setItem("mensajeMostrado", "false"); // para controlar mensajes únicos
  //  console.log("yaMostrado", sessionStorage.getItem("mensajeMostrado"));

  function isTokenExpired(token) {
    if (!token?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return token.exp < now;
  }

  // Recupero usuario desde sessionStorage al montar el componente
  useEffect(() => {
    const sesionUsuario = storageService.getItem("usuario");
    if (sesionUsuario) {
      setValidarUsuario(sesionUsuario);
    } else {
      console.log("No hay usuario en sessionStorage");
    }
  }, []);

  console.log("mensaje usuario", validarUsuario?.message);
  console.log(validarUsuario?.message?.includes("primera"));
  

  // Muestro mensajes de aviso (solo una vez por sesión)
  useEffect(() => {
    if (validarUsuario?.message === undefined || validarUsuario?.message === "" ) {
      return;
    }

    

    const yaMostrado = sessionStorage.getItem("mensajeMostrado");
    console.log("yaMostrado en useEffect", yaMostrado);
    if (yaMostrado === "true") return; // si ya se mostró, no repetir

    if (validarUsuario?.message?.includes("primera")) {
      showModal(
        "Este es tu primer Ingreso. Debes cambiar la contraseña",
        "info",
        0,
        true
      );

      console.log("usuario en dashboard", validarUsuario);
      navigate("/public/primerCambioPassword", { state: { validarUsuario } });
      // sessionStorage.setItem("mensajeMostrado", "true");
      return;
    }

    if (validarUsuario?.message?.includes("proximo")) {
      showModal(
        "Tu plan está próximo a vencer. Contacta a tu Trainer.",
        "info",
        0,
        true
      );
      sessionStorage.setItem("mensajeMostrado", "true");
      return;
    }

    if (validarUsuario?.message?.includes("impago")) {
      showModal("Tu plan está impago. Contacta a tu Trainer.", "info", 0, true);
      sessionStorage.setItem("mensajeMostrado", "true");
      return;
    }

    if (validarUsuario?.message?.includes("nuevo")) {
      showModal(
        "Cuando se acredite tu pago se habilitaran las opciones de tu plan.",
        "info",
        0,
        true
      );

      console.log("usuario en dashboard", validarUsuario);
            
      return;
    }
  }, [validarUsuario]);

  // Función para habilitar/deshabilitar funcionalidades
  const habilitarFunciones = () => {
    if (
      validarUsuario?.message?.includes("impago") ||
      validarUsuario?.message?.includes("nuevo")
    ) {return  false; } 
    else {return true;}// impago o nuevo (sin pago) deshabilita funciones
  };
  // validarUsuario?.message?.includes("impago" ) ? false : true;

  // Valido token al montar
  useEffect(() => {
    const token = getToken("ftx_token");
    sessionStorage.setItem("ftx_token", token);

    if (token) {
      const datos = decodeToken(token);

      if (isTokenExpired(datos)) {
        sessionStorage.removeItem("ftx_token");
        showModal(
          "Tu sesión ha expirado. Inicia sesión nuevamente.",
          "info",
          3000
        );
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      setTokenUsuario(datos);
    } else {
      showModal(
        "Tu sesión ha expirado. Inicia sesión nuevamente.",
        "info",
        3000
      );
      setTimeout(() => navigate("/login"), 3000);
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

  // Items del dashboard
  const dashboardItems = [
    {
      id: "rutina",
      icon: "🏋️",
      title: "Rutina",
      description: "Mira tus rutinas de entrenamiento",
      onClick: !habilitarFunciones()
        ? () =>
            showModal(
              "Opcion Deshabilitada. Contacta a tu Trainer.",
              "info",
              0,
              true
            )
        : () => navigate("/usuario/rutina", { state: { usuario } }),
    },
    {
      id: "clientes",
      icon: <IoPeopleSharp />,
      title: "Perfil",
      description: "Modifica tus datos de Perfil",
      onClick: !habilitarFunciones()
        ? () =>
            showModal(
              "Opcion Deshabilitada. Contacta a tu Trainer.",
              "info",
              0,
              true
            )
        : () => navigate("/usuario/perfil", { state: { usuario } }),
    },
    {
      id: "Estadisticas",
      icon: "📈",
      title: "Estadisticas",
      description: "Mira tus avances con las rutinas.",
      onClick: !habilitarFunciones()
        ? () =>
            showModal(
              "Opcion Deshabilitada.\n Contacta a tu Trainer.",
              "info",
              0,
              true
            )
        : () => navigate("/usuario/estadistica", { state: { usuario } }),
    },
    {
      id: "Pagos",
      icon: "💳",
      title: "Pagos",
      description: "Historial de pagos",
      onClick: () => navigate("/usuario/pagos", { state: { usuario } }),
    },
    // {
    //   id: "Informar Pago",
    //   icon: <FaMoneyBill1Wave />,
    //   title: "Informar Pago",
    //   description: "Avisar al trainer de un pago realizado",
    //   onClick: () => navigate("/usuario/informarpago", { state: { usuario } }),
    // },
    {
      id: "Planes",
      icon: "📋",
      title: "Planes",
      description: "Quieres ver los planes?",
      onClick: () => navigate("/public/planes"),
    },
  ];

  return (
    <div className="container">
      {/* Header con botón de cerrar sesión */}
      <HeaderCrud
        title="Perfil de Usuario"
        widthPercent={100}
        MostrarCerrarSesion={true}
      />

      {/* Avisos legales según estado del usuario */}

      {validarUsuario?.message?.includes("proximo") && (
        <div className="aviso-legal-marquee">
          <p>Tu plan está próximo a vencer. Contacta a tu Trainer.</p>
        </div>
      )}

      {validarUsuario?.message?.includes("impago") && (
        <div className="aviso-legal-marquee">
          <p>
            Pagos atrasados. Algunas características no estarán disponibles.
            Contacta a tu Trainer.
          </p>
        </div>
      )}

      {/* Dashboard principal */}
      <div className="admin-dashboard">
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

export default UsuarioDashboard;
