import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import { fade, makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import SearchIcon from '@material-ui/icons/Search';
// import {Link } from 'react-router-dom';
// import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Grow from '@material-ui/core/Grow';
// import Paper from '@material-ui/core/Paper';
// import Popper from '@material-ui/core/Popper';
// import MenuItem from '@material-ui/core/MenuItem';
// import MenuList from '@material-ui/core/MenuList';
// import MenuIcon from '@material-ui/icons/Menu';
// import Drawer from './Drawer';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// export default (props) => {
//   console.log('props del component navbar = ', props)
//   const classes = useStyles();
//     const sub = {
//         textDecoration: 'none',
//         color: 'white'
//     }

//     const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//       setOpen(false);
//     }
//   }

//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);


//   return (
//     <div className={classes.root} style={{marginBottom:'30px'}}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon onClick={()=> {<Drawer/>}}/> 
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//           <Link to="/" color="inherit" style={sub}>ElectrHogar</Link>
//           </Typography>

//           {props.user.id ? (
//           <React.Fragment>
//             <Button color="inherit"><Link to="/products" color="inherit" style={sub}>Productos</Link></Button>
//             <Button color="inherit"><Link to="/categories" color="inherit" style={sub}>Categorías</Link></Button>
//             <Button color="inherit" ref={anchorRef} aria-controls={open ? 'menu-list-grow' : undefined} aria-haspopup="true" onClick={handleToggle}>
//               Hola, {props.user.firstName}!
//               <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//             >
//               <Paper >
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} style={{zIndex:'100'}}>
//                     { props.user.isAdmin===true ? (<div>
//                       <Link to='/admin/products'  style={{color:'#000000DE', textDecoration:'none'}}><MenuItem onClick={handleClose}>Ver la lista de Productos</MenuItem></Link>
//                       <Link to='/admin/newproduct'  style={{color:'#000000DE', textDecoration:'none'}}><MenuItem onClick={handleClose}>Agregar nuevo Producto</MenuItem></Link>
//                       <Link to='/admin/categories'  style={{color:'#000000DE', textDecoration:'none'}}><MenuItem onClick={handleClose}>Ver la lista de Categorías</MenuItem></Link>
//                       <Link to='/admin/newcategory'  style={{color:'#000000DE', textDecoration:'none'}}><MenuItem onClick={handleClose}>Agregar nueva Categoría</MenuItem></Link>
//                       <MenuItem onClick={handleClose, props.handleLogout}>Cerrá Sesión</MenuItem>
//                       </div>): <div>
//                       <Link to='/cart' style={{color:'#000000DE', textDecoration:'none'}}><MenuItem onClick={handleClose}>Mi carrito</MenuItem></Link>
//                         <MenuItem onClick={handleClose, props.handleLogout}>Cerrá Sesión</MenuItem>
//                         </div>}
                      
                      
                      
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//               <ArrowDropDownIcon/>
//               </Button>
//           </React.Fragment>
//           ) : ( 
//              <React.Fragment>
//               <Button color="inherit"><Link to="/products" color="inherit" style={sub}>Productos</Link></Button>
//               <Button color="inherit"><Link to="/categories" color="inherit" style={sub}>Categorías</Link></Button>
//               {/* <Button color="inherit"><Link to="/cart" color="inherit" style={sub}>Carrito</Link></Button> */}
//               <Button color="inherit"><Link to="/register" color="inherit" style={sub}>Registrate</Link></Button>
//               <Button color="inherit"><Link to="/login" color="inherit" style={sub}>Iniciá Sesión</Link></Button>
//             </React.Fragment>
//           )}
//           <form onSubmit = {props.handleSubmit}>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//               onChange = {props.handleChange}
//               value = {props.search}
//             />
//           </div>
//           </form>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import { Navbar, Nav, Form, FormControl, Button, NavDropdown } from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'

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


export default(props)=>{
  console.log('props del component navbar = ', props)
  return (
<Navbar bg="dark" variant='dark' expand="lg">
  <Link to='/'><Navbar.Brand href="#home">ElectrHogar</Navbar.Brand></Link>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">

      
      {props.user.id ? (
        <React.Fragment>
          <Link to='/products' style={navStyle2}>Productos</Link>
      
      <Link to='/categories' style={navStyle2}>Categorías</Link>
        <DropdownButton variant='dark' size='lg' id="dropdown-basic-button" title={`Hola, ${props.user.firstName}`} style={{textDecoration:'none', fontWeight:'bold', padding:'-5px'}}>
          {props.user.isAdmin===true?(
            <div>
              
              <Dropdown.Item><Link to='/admin/products' style={{textDecoration:'none', color:'black'}}>Ver la lista de Productos</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/newproduct' style={{textDecoration:'none', color:'black'}}>Agregar nuevo Producto</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/categories' style={{textDecoration:'none', color:'black'}}>Ver la lista de Categorías</Link></Dropdown.Item>
              <Dropdown.Item><Link to='/admin/newcategory' style={{textDecoration:'none', color:'black'}}>Agregar nueva Categoría</Link></Dropdown.Item>
            </div>
          ):(
            <div>
              <Link to='/products' style={navStyle}>Productos</Link>
      
              <Link to='/categories' style={navStyle}>Categorías</Link>
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
      <FormControl type="text" placeholder="Buscá tu producto" className="mr-sm-2" onChange={props.handleChange}
      value={props.busqueda} />
      
    </Form>
  </Navbar.Collapse>
</Navbar>
  )
}