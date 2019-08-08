import React, { useState } from 'react';
import { Navbar, NavbarBrand, Collapse, Nav, NavItem, NavLink, NavbarToggler } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [ openMenu, setOpenMenu ] = useState(false);

  const toggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Navbar color="light" light expand="md" >
      <NavbarBrand tag={Link} to="/" >Minhas Séries</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={openMenu} navbar >
        <Nav className="ml-auto" navbar >
          <NavItem>
            <NavLink tag={Link} to="/generos">Gêneros</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;