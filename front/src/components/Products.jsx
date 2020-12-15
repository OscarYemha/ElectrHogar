import React from "react";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default ({ productsArray, handleCart }) => (
  
  <Container fluid>
    
    <Row>
      {productsArray && productsArray.length > 0 ? (
        productsArray.map((p) => {
          console.log('productsArray del productsContainer = ',productsArray)
          return (
            <Col md={3}>
              <Card style={{ width: "19rem", height:'30rem', marginBottom:'5%', zIndex:'0' }}>
                <Link
                  to={`/singleproduct/${p.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={p.imgUrl} style={{width:'15rem', marginLeft:'10%', height:'15rem'}}/>
                </Link>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Text>{p.description.slice(0, 80) + "..."}</Card.Text>
                  <Button
                    color="action"
                    onClick={() => {
                      handleCart(p);
                    }}
                  >
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      ) : (
        <div>No hay nada</div>
      )}
    </Row>
  </Container>
);
