
import logo from '../../../../assets/Recursos/IconosLogos/logoSinLetrasNaranja.png'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Header({ open, setOpen, handleNavClick }) {
 

  return (

    <Navbar
      expand="lg"
      className="mainNavbar-header"
      variant="dark"
      fixed="top"
      expanded={open}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="logo FTX" className="navbar-brand-img" /> FTX
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setOpen(v => !v)} />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() =>
                handleNavClick(() =>
                  document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' }) //el movimiento es suave
                )
              }
            >
              Inicio
            </Nav.Link>

            <Nav.Link onClick={() =>
              handleNavClick(() =>
                document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })
              )
            }
            >
              Beneficios
            </Nav.Link>

            <Nav.Link onClick={() =>
              handleNavClick(() =>
                document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })
              )
            }
            >
              Planes
            </Nav.Link>

            <Nav.Link
              onClick={() =>
                handleNavClick(() =>
                  document.getElementById('entrenador')?.scrollIntoView({ behavior: 'smooth' })
                )
              }
            >
              Entrenador
            </Nav.Link>

            <Nav.Link onClick={() =>
              handleNavClick(() =>
                document.getElementById('testimonios')?.scrollIntoView({ behavior: 'smooth' })
              )
            }
            >
              Testimonios
            </Nav.Link>

            <Nav.Link onClick={() =>
              handleNavClick(() =>
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })
              )
            }
            >
              FAQ
            </Nav.Link>

            <Nav.Link as={Link} to="/contacto" onClick={() => handleNavClick()}>
              Contacto
            </Nav.Link>

            <Nav.Link as={Link} to="./login" className="btn btn-resaltado btn-sm">
              Login/Registro
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;