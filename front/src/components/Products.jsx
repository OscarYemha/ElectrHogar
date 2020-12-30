import React from "react";
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default ({ productsArray, handleCart, user }) => (
  
  <Container fluid>
    
    <Row>
      
      {productsArray && productsArray.length > 0 ? (
        productsArray.map((p) => {
          console.log('productsArray del productsContainer = ',productsArray)
          console.log("user Products", user)
          return (
            
            <Col md={3}>
              {p.stock < 1 ? <Card style={{ width: "19rem", height:'31rem', marginBottom:'5%'}}>
                  <Card.Img variant="top" src={p.imgUrl} style={{width:'15rem', marginLeft:'10%', height:'15rem'}}/>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <br/>
                  <Card.Title>No hay stock disponible</Card.Title>
                </Card.Body>
              </Card> : p.stock===1 ? <Card style={{ width: "19rem", height:'31rem', marginBottom:'5%'}}>
                <Link
                  to={`/singleproduct/${p.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={p.imgUrl} style={{width:'15rem', marginLeft:'10%', height:'15rem'}}/>
                </Link>
                <Card.Body>
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Title>$ {p.price}</Card.Title>
                  <Card.Title>Último disponible</Card.Title>
                  <Card.Text>{p.description.slice(0, 80) + "..."}</Card.Text>
                  {user.id?<Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleCart(p);
                    }}
                  >
                    Agregar al carrito
                  </Button> : null}
                  
                </Card.Body>
              </Card>: <Card style={{ width: "19rem", height:'31rem', marginBottom:'5%'}}>
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
                  {user.id? <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleCart(p);
                    }}
                  >
                    Agregar al carrito
                  </Button>:null}
                  
                </Card.Body>
              </Card>}
              
            </Col>
          );
        })
      ) : (
        <div>No hay nada</div>
      )}
    </Row>
  </Container>
);
