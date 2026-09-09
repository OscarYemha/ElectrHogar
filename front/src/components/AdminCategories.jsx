import React from "react";
import { Table } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Error from './Error';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
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

const AdminCategories = ({ user, allcategories, handleDelete }) => {

  const classes = useStyles();

  const [categoryToDelete, setCategoryToDelete] = React.useState(null);

  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
  };

  const handleCloseDeleteDialog = () => {
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      handleDelete(categoryToDelete);
    }

    setCategoryToDelete(null);
  };

    return (
      <div>
    {user.id && user.isAdmin === true ?
      (
    <div className="container" style={{ marginTop: "50px", width: "100%", textAlign: "center" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Categoría</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        {allcategories && allcategories.length > 0
          ? allcategories.map((e) => {
              return (
                <tbody key={e.id}>
                  <tr>
                    <td># {e.id}</td>
                    <td>{e.name}</td>
                    <td>
                      <img
                        src={e.imgUrl}
                        alt={e.name}
                        style={{ width: "70px", height: "50px" }}
                      />
                    </td>
                    <td>
                      <Link
                        to={`/admin/category/${e.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          startIcon={<EditIcon />}
                        >
                          Editar
                        </Button>
                      </Link>
                  </td>
                  <td>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          handleOpenDeleteDialog(e);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          : null}
      </Table>
      <Dialog
        open={Boolean(categoryToDelete)}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>
          Confirmar eliminación
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que querés eliminar la categoría
            {categoryToDelete
              ? ` "${categoryToDelete.name}"`
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
      ):(<Error/>)
          }
  </div>)

}

export default AdminCategories;