import React from 'react';
import Container from "react-bootstrap/Container";
import Button from '@material-ui/core/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const style = {
    textDecoration: "none",
    marginTop: "10px",
    position: "relative",
    color: "black",
    marginRight: "10px",
  };
  

export default function({productsArray}) {

    <Container fluid>
    
    <Row>
      {productsArray && productsArray.length > 0 ? (
        productsArray.map((p) => {
          console.log('productsArray del productsContainer = ',productsArray)
          return (
            <Col md={3}>
              <Card style={{ width: "19rem", height:'31rem', marginBottom:'5%'}}>
                <Link
                  to={`/singleproduct/${p.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={p.imgUrl} style={{width:'15rem', marginLeft:'10%', height:'15rem'}}/>
                </Link>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Title>$ {p.price}</Card.Title>
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

      }