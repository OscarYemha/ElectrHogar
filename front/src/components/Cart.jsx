import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

function Cart(props) {
  let total = 0;
console.log("props del component Cart", props);
  let cartRender = [];

  if (props.cart.length > 0) {
    cartRender = props.cart;
  } else if (props.virtualCart.length > 0) {
    cartRender = props.virtualCart;
  }

  return (
    <div className="container" style={{ marginTop: "50px", width: "60%" }}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        {cartRender && cartRender.length > 0
          ? cartRender.map((cart) => {
              {
                total = total + cart.price * cart.CartProductQuantity.quantity;
              }
              return (
                <tbody key={cart.name}>
                  <tr>
                    <td>
                      <img
                        src={cart.imgUrl}
                        style={{ width: "70px", height: "50px" }}
                      ></img>{" "}
                    </td>
                    <td>{cart.name}</td>
                    <td>{cart.CartProductQuantity.quantity}</td>
                    <td>$ {cart.price}</td>
                    <td>$ {cart.price * cart.CartProductQuantity.quantity} </td>
                    <td>
                      <Button
                      variant="contained"
                      color="primary"
                        onClick={() => {
                          props.handleQuantityProduct(cart, { cant: 1 });
                        }}
                      >
                        +
                      </Button>
                    </td>
                    {cart.CartProductQuantity.quantity < 2 ? (
                      <td>
                        <Button
                        variant="contained"
                        color="primary"
                          disabled
                          onClick={() => {
                            props.handleQuantityProduct(cart, { cant: -1 });
                          }}
                        >
                          -
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <Button
                        variant="contained"
                        color="primary"
                          onClick={() => {
                            props.handleQuantityProduct(cart, { cant: -1 });
                          }}
                        >
                          -
                        </Button>
                      </td>
                    )}

                    <td>
                      <Button
                      variant="contained"
                      color="secondary"
                        onClick={() => {
                          props.handleDelete(cart);
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
      <p>TOTAL: $ {total}</p>
      <Button
        className="btn btn-dark"
        onClick={() => {
          console.log({ total: total });
          props.handleTotal({ total: total });
        }}
      >
        <Link to="/checkout">Comprar</Link>
      </Button>
    </div>
  );
}

export default Cart;