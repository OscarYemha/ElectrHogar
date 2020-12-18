import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const formbox = {
  width: "380px",
  height: "480px",
  position: "relative",
  margin: "6% auto",
  background: "white",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
};

export default ({
  handleSubmit,
  handleAddress,
  handleCard,
  handleCvv,
  user,
  total,
}) => {
  return (
    <div>
      {user.id ? (
        <Container style={formbox}>
          <h3>Ingresá tu información de pago</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              {/* <Form.Label>Total:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Address"
                onChange={handleAddress}
                autoFocus
                value={total}
              /> */}
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Domicilio:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                onChange={handleAddress}
                autoFocus
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tarjeta de crédito Nº:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your card number"
                onChange={handleCard}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>CVV Nº:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter CVV"
                onChange={handleCvv}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox"></Form.Group>
            <Button
              onClick={() => {
                // location.href = "http://localhost:3001/confirmacion";
              }}
              color="primary"
              type="submit"
            >
              Confirmar
            </Button>
          </Form>
        </Container>
      ) : (
        <Container>
          <span style={{marginLeft: "160px"}} className='Container alert alert-danger' className="alert alert-danger" role="alert">
      Para continuar con tu compra, te pedimos por favor que inicies sesion.
    </span>
        <br/>
        <br/>
        <br/>
        <br/>
          <button className="btn btn-dark" style={{marginLeft: "160px"}} >
            <Link to="/login">Ir al login</Link>
          </button>
        </Container>
      )}
    </div>
  );
};