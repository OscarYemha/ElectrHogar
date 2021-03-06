import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import Error from './Error';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/" style={{textDecoration:'none', color: 'rgba(0, 0, 0, 0.54)',}}>
      ElectrHogar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default ({allcategories, handleName, handlePrice, handleImg, handleStock, handleDescription, handleSubmit, handleCategory, state, user}) => {
  console.log("state del EditProduct Component = ", state)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  
  // const handleChange = (event) => {
  //   setCurrency(event.target.value);
  // };

  return (
    <div>
      {user.id && user.isAdmin === true ?(
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Editar Producto
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nombre"
                label="Nombre"
                name="nombre"
                autoComplete="nombre"
                autoFocus
                value = {state.name}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="precio"
                label="Precio"
                type="precio"
                id="precio"
                autoComplete="precio"
                value = {state.price}
                onChange={handlePrice}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="imgUrl"
                label="Link de la Imagen"
                type="imgUrl"
                id="imgUrl"
                autoComplete="imgUrl"
                value = {state.imgUrl}
                onChange={handleImg}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="stock"
                label="Stock"
                type="stock"
                id="stock"
                autoComplete="stock"
                value={state.stock}
                onChange={handleStock}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                name="descripcion"
                label="Descripción"
                type="descripcion"
                id="descripcion"
                autoComplete="descripcion"
                value={state.description}
                onChange={handleDescription}
                style={{marginBottom:'10px'}}
              />
              </Grid>
          </Grid>
          { allcategories && allcategories.length > 0 ?
                    allcategories.map((c)=>{
                        return (
                <Form.Group className="custom-control-inline" key={c.id}>
                    <span >
                        <Button fullWidth
            variant="contained"
            color="primary" 
            onClick= {() =>{handleCategory(c)} }
            >{c.name}</Button>
                    </span>
                </Form.Group>
                        )
                    }) : null
                }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleToggle}
          >
            Editar Producto
          </Button>
          
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  ):(<Error/>)}
    </div>
  );
}