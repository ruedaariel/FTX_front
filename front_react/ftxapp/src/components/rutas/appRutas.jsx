import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../pages/public/landingPage/landingPage";
import AdminDashboard from "../../pages/admin/adminDashboard/adminDashboard";
import UsuarioDashboard from "../../pages/usuario/usuarioDashboard/usuarioDashboard";
import InicioRutina from "../../pages/admin/adminRutinas/inicioRutina";
import PantallaClientes from "../../pages/admin/adminClientes/PantallaClientes";
import EnContruccion from "../../pages/public/enContruccion/EnConstruccion";
//import { PagosAdmin } from "../../pages/admin/adminPagos";
import Contacto from "../../pages/public/contacto/contacto";
import PaginaEjercicios from "../../pages/admin/adminEjercicios/paginaEjercicios";
import UsuarioRutina from "../../pages/usuario/usuarioRutina/usuarioRutina";
import PerfilUsuario from "../../pages/usuario/usuarioPerfil/PerfilUsuario";
import LoginPage from "../../pages/public/loginPage/LoginPage";
import UsuarioEstadistica from "../../pages/usuario/usuarioEstadistica/usuarioEstadistica";
import Planes from "../../pages/public/planes";
import RegistroUsuario from "../../pages/public/registro/RegistroUsuario";
import AdminEditorPlanes from "../../pages/admin/adminPLanes/AdminEditorPLanes";
import VistaPagos from "../../pages/usuario/usuarioPagos/VistaPagos";
import AdminHistorialPagos from "../../pages/admin/adminPagos/adminHistorialPagos/adminHistorialPagos";
import AdminHistorialImpagos from "../../pages/admin/adminPagos/adminHistorialImpagos/adminHistorialImpagos";
import AdminReportes from "../../pages/admin/adminReportes/adminReportes"
import SeguimientoRutinas from "../../pages/admin/adminSeguimiento/SeguimientoRutinas";
import InformarPago from "../../pages/usuario/usuarioPagos/informarPago/informarPago";
import AdminPassword from "../../pages/admin/adminPassword/adminPassword";


//import {   ReseteoPassword } from '../../pages/public/login/logins';
//import  LoginBasico  from '../../pages/public/login/LoginBasico';
import PagosAdmin from '../../pages/admin/adminPagos/pagosAdminCard'
import ResetPasswordPage from "../../pages/public/passwordReset/ResetePasswordPage";
import PrimerCambioPasswordPage from "../../pages/public/PrimerCambioPasswordPage/PrimerCambioPasswordPage";


/* import Rutina from "../pages/Rutina";
import Usuarios from "../pages/Usuarios";
import NotFound from "../pages/NotFound";
 */
const AppRutas = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      
      <Route path="/contacto" element={<Contacto />} />
      {/* <Route path="/admin/planes" element={<Planes />} /> */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/public/registro" element={<RegistroUsuario />} />
      <Route path="/public/planes" element={<Planes />} />
      <Route path="/public/passwordReset" element={<ResetPasswordPage />} />
       <Route path="/public/primerCambioPassword" element={<PrimerCambioPasswordPage />} />
      {/* <Route path="/login2" element={<LoginBasico />} /> 
                <Route path="/login-perfil" element={<LoginPerfil />} />
                <Route path="/suscripcion" element={<LoginSuscripcion />} />
                <Route path="/reseteo-password" element={<ReseteoPassword />} />*/}
      <Route path="/usuario" element={<UsuarioDashboard />} />
      <Route path="/admin/rutinas" element={<InicioRutina />} />
      <Route path="/admin/seguimiento" element={<SeguimientoRutinas />} />
      <Route path="/admin/clientes" element={<PantallaClientes />} />
      <Route path="/admin/planes" element={<AdminEditorPlanes />} />
      <Route path="/admin/pagos" element={<PagosAdmin />} /> 
      <Route path="/admin/reportes" element={<AdminReportes />} />
   
      <Route path="/admin/historialPagos" element={<AdminHistorialPagos />} /> 
      <Route path="/admin/historialImpagos" element={<AdminHistorialImpagos />} />
      <Route path="/admin/ejercicios" element={<PaginaEjercicios />} />
      <Route path="/admin/password" element={<AdminPassword />} />
      <Route path="/usuario/rutina" element={<UsuarioRutina />} />
      <Route path="/usuario/perfil" element={<PerfilUsuario />} />
      <Route path="/usuario/estadistica" element={<UsuarioEstadistica />} />
      <Route path="/usuario/pagos" element={<VistaPagos />} />
      <Route path="/usuario/informarpago" element={<InformarPago />} />
      <Route path="*" element={<EnContruccion />} />

      {/*   <Route path="/rutina" element={<Rutina />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="*" element={<NotFound />} />  */}
    </Routes>
  );
};

export default AppRutas;
