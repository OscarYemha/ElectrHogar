import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom';
import FindInPageIcon from '@material-ui/icons/FindInPage';

const navStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight:'bold',
  marginTop:'7px',
  marginLeft: '15px',
  marginRight: '15px'
};

const navStyle2 = {
  textDecoration: "none",
  color: "white",
  fontWeight:'bold',
  marginTop:'16px',
  marginLeft: '15px',
  marginRight: '15px'
}


export default (props) => {
  console.log('props del component navbar = ', props)
  return (
    <div>
<Navbar bg="dark" variant='dark' expand="lg" >
  <Link to='/'><Navbar.Brand href="#home">ElectrHogar</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">

      
      {props.user.id ? (
        <React.Fragment>
          <Link to='/products' style={navStyle2}>Productos</Link>
      
      <Link to='/categories' style={navStyle2}>Categorías</Link>
        <DropdownButton variant='dark' size='lg' id="dropdown-basic-button" title={`Hola, ${props.user.firstName}!`} style={{textDecoration:'none', fontWeight:'bold', padding:'-5px'}}>
          {props.user.isAdmin===true?(
            <div>
              
              <Dropdown.Item><Link to='/admin/products' style={{textDecoration:'none', color:'black'}}>Ver la lista de Productos</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/newproduct' style={{textDecoration:'none', color:'black'}}>Agregar nuevo Producto</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/categories' style={{textDecoration:'none', color:'black'}}>Ver la lista de Categorías</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/newcategory' style={{textDecoration:'none', color:'black'}}>Agregar nueva Categoría</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/users' style={{textDecoration:'none', color:'black'}}>Ver la lista de Usuarios</Link></Dropdown.Item>
            </div>
          ):(
            <div>
              <Dropdown.Item><Link to='/cart' style={{textDecoration:'none', color:'black'}}>Mi Carrito</Link></Dropdown.Item>
            </div>
          )}
        <NavDropdown.Divider />
        <Dropdown.Item onClick={props.handleLogout}>Cerrá Sesión</Dropdown.Item>
        </DropdownButton>
        </React.Fragment>
      ):(
        <React.Fragment>

          <Link to='/products' style={navStyle}>Productos</Link>
      
          <Link to='/categories' style={navStyle}>Categorías</Link>
          <Link to='/register' style={navStyle}>Registrate</Link>

          <Link to='/login' style={navStyle}>Iniciá Sesión</Link>
        </React.Fragment>
      )}
      
      
    </Nav>
    <Form inline onSubmit={props.handleSubmit}>
    <FormControl type="text" placeholder="Buscá tu producto..." className="mr-sm-2" onChange={props.handleChange}
      value={props.busqueda} />
      <div style={{backgroundColor:'#116767', borderRadius:'2px'}}>
      <FindInPageIcon fontSize='large' color='action'/>
      </div>
    </Form>
  </Navbar.Collapse>
</Navbar>
</div>
  )
}