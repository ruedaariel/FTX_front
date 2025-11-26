import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginBasico, LoginPerfil, LoginSuscripcion, ReseteoPassword } from './logins';

const LoginApi = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginBasico />} />
                <Route path="/login-perfil" element={<LoginPerfil />} />
                <Route path="/suscripcion" element={<LoginSuscripcion />} />
                <Route path="/reseteo-password" element={<ReseteoPassword />} />
            </Routes>
        </Router>
    );
};

export default LoginApi;