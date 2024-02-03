import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { MDBIcon } from 'mdb-react-ui-kit';



const NavbarC = () => {
  return (
    <Navbar bg="black" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-logo">
          {/* <img src={logo} height="45px" alt="logo" className="nav-l" /> */}
          Research Bot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggle"/>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="default-link">
              Home
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#about" className="default-link">
              About
            </Nav.Link>
            <Nav.Link as={HashLink} to="/#explore" className="default-link">
              Explore
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="heart-icon">
              <MDBIcon fas icon="heart" />
            </Nav.Link>
            
            <Nav.Link as={Link} to="/menu" className="default-link">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/login" className="default-link">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarC;