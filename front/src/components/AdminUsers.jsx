import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from './Error'


function AdminUsers({user, allUsers, handleDelete, handleRoles}) {
    
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
                    {/* <td><Button onClick = {()=>{handleRoles(e, e.isAdmin)}} >Promover a Admin</Button></td> */}
                   
                    <td><Button onClick = {()=>{handleDelete(e)}}>Eliminar Usuario</Button></td>
                  </tr>
                </tbody>
              );
            })
          : null}
      </Table>
      {/* <Button className="btn btn-dark">
        <Link to="/allproducts">Ir a Home</Link>
      </Button> */}
    </div>
  )
  :
  <Error/>

}


    </div>)
   
}

export default AdminUsers;
