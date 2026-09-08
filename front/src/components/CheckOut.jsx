import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

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
  isSubmitting,
  error,
}) => {
  return (
    <div>
      {user.id ? (
        <Container style={formbox}>
          <h3>Ingresá tu información de pago</h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Domicilio:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                onChange={handleAddress}
                autoFocus
                required
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group>
            <Form.Label>Número de tarjeta:</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                placeholder="Ingresá 16 dígitos"
                onChange={handleCard}
                required
                minLength={16}
                maxLength={16}
                pattern="[0-9]{16}"
                title="La tarjeta debe contener exactamente 16 números"
              />
            </Form.Group>
            <Form.Group>
            <Form.Label>CCV:</Form.Label>
              <Form.Control
                type="text"
                inputMode="numeric"
                placeholder="Ingresá 3 dígitos"
                onChange={handleCvv}
                required
                minLength={3}
                maxLength={3}
                pattern="[0-9]{3}"
                title="El CVV debe contener exactamente 3 números"
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Button
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Confirmar"}
              </Button>
            </Form.Group>
          </Form>
          <Modal
            show={isSubmitting}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header>
              <Modal.Title>Procesando compra</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              Por favor esperá mientras registramos tu compra y enviamos la confirmación por email.
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        <Container>
          <span style={{marginLeft: "160px"}} className='Container alert alert-danger' role="alert">
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