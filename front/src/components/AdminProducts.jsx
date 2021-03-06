import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Error from './Error';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default ({allproducts, handleDelete, user}) => {

  const classes = useStyles();

    return (
    <div>
      {user.id && user.isAdmin === true ?(
    <div className="container" style={{ marginTop: "50px", width: "100%" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Producto</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
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
                          onClick={()=>{handleDelete(e)}}
                        >Eliminar</Button>
                    </td>
                    
                  </tr>
                </tbody>
              );
            })
          : null}
      </Table>
    </div>
    ):(<Error/>)}
    </div>
  )
   
}