import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Error from './Error';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default ({allproducts, handleDelete, user}) => {

  const classes = useStyles();

  const [productToDelete, setProductToDelete] = React.useState(null);

  const handleOpenDeleteDialog = (product) => {
    setProductToDelete(product);
  };

  const handleCloseDeleteDialog = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDelete(productToDelete);
    }

    setProductToDelete(null);
  };

    return (
    <div>
      {user.id && user.isAdmin === true ?(
    <div className="container" style={{ marginTop: "50px", width: "100%", textAlign: "center" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        {allproducts && allproducts.length > 0
          ? allproducts.map((e) => {
              return (
                <tbody key={e.id}>
                  <tr>
                    <td># {e.id}</td>
                    <td>{e.name}</td>
                    <td> {e.price}</td>
                    <td> {e.stock} </td>
                    <td> <img src={e.imgUrl} style={{width: "70px", height: '50px'}}></img></td>
                    <td><Link to={`/admin/product/${e.id}`} style={{textDecoration:'none'}}><Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<EditIcon />} >Editar</Button></Link></td>
                    <td><Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          startIcon={<DeleteIcon />}
                          onClick={()=>{handleOpenDeleteDialog(e)}}
                        >Eliminar</Button>
                    </td>
                    
                  </tr>
                </tbody>
              );
            })
          : null}
      </Table>
      <Dialog
        open={Boolean(productToDelete)}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>
          Confirmar eliminación
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que querés eliminar el producto
            {productToDelete
              ? ` "${productToDelete.name}"`
              : ""}?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            color="primary"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    ):(<Error/>)}
    </div>
  )
   
}