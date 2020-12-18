import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Orders({orders}) {

  return (
    <div className="container" style={{ marginTop: "50px", width: "60%" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Compra</th>
            <th>Fecha de Compra</th>
            <th>Direccion de Entrega</th>
            <th>Total</th>
          </tr>
        </thead>
        {orders && orders.length > 0
          ? orders.map((cart) => {
              return (
                <tbody key={cart.name}>
                  <tr>
                    <td># {cart.id}</td>
                    <td>{cart.date.substring(0,10)}</td>
                    <td> {cart.address}</td>
                    <td>$ {cart.total} </td>
                    <td><Button variant='dark'><Link to={`/orders/${cart.id}`}>Rate</Link></Button></td>
                  </tr>
                </tbody>
              );
            })
          : null}
      </Table>
      <Button className="btn btn-dark">
        <Link to="/allproducts">Ir a Home</Link>
      </Button>
    </div>
  );
}

export default Orders;