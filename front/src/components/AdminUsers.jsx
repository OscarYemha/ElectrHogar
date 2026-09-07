import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from './Error'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


function AdminUsers({user, allUsers, handleDelete, handleRoles}) {

  const [userToDelete, setUserToDelete] = React.useState(null);

  const handleOpenDeleteDialog = (selectedUser) => {
      setUserToDelete(selectedUser);
  };

  const handleCloseDeleteDialog = () => {
      setUserToDelete(null);
  };

  const handleConfirmDelete = () => {
      if (userToDelete) {
          handleDelete(userToDelete);
      }

      setUserToDelete(null);
  };

  return (<div>

  {user.id && user.isAdmin === true ?


  (

      <div className="container" style={{ marginTop: "50px", width: "60%" }}>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
            </tr>
          </thead>
          {allUsers && allUsers.length > 0
            ? allUsers.map((e) => {
                return (
                  <tbody key={e.id}>
                    <tr>
                      <td># {e.id}</td>
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td> {e.email}</td>
                      {e.isAdmin!==true ? <td><Button onClick = {()=>{handleRoles(e, e.isAdmin)}} >Promover a Administrador</Button></td>: <td><Button disabled>Este usuario es Administrador</Button></td>}
                      {e.isAdmin !== true
                        ? (
                            <td>
                              <Button onClick={() => {handleOpenDeleteDialog(e)}}>
                                Eliminar Usuario
                              </Button>
                            </td>
                          )
                        : (
                            <td>
                              <Button disabled>
                                No se puede eliminar
                              </Button>
                            </td>
                          )
                      }
                    </tr>
                  </tbody>
                );
              })
            : null}
        </Table>
        <Dialog
            open={Boolean(userToDelete)}
            onClose={handleCloseDeleteDialog}
        >
            <DialogTitle>
                Confirmar eliminación
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    ¿Estás seguro de que querés eliminar al usuario
                    {userToDelete
                        ? ` "${userToDelete.firstName} ${userToDelete.lastName}"`
                        : ""}?
                    Esta acción no se puede deshacer.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleCloseDeleteDialog}
                >
                    Cancelar
                </Button>

                <Button
                    onClick={handleConfirmDelete}
                    variant="danger"
                >
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    )
    :
    <Error/>

  }


      </div>)

}

export default AdminUsers;
