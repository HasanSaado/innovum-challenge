// Libraries
import React, { useState } from 'react';

// Components
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

//Style
import './Header.scss';

function Header() {

  // State
  const [userToken, setUserToken] = useState('');

  /**
   * 
   */
  async function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload(false);
  }

  /**
   * 
   */
  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand className="header-logo">
            <img 
              src="/assets/images/library-logo.jpg"
              alt="logo"
              className="login-logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto">
              <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  )
}

export default Header;