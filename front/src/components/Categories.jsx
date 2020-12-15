import React from 'react';
import Card from "react-bootstrap/Card";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";


export default ({categoriesArray}) => (

           
  <Container fluid>
  <Row>
           
       {categoriesArray && categoriesArray.length>0? categoriesArray.map((c) => {return (
         
         <Col md={3}>
              <Card style={{ width: "18rem", marginBottom:'5%' }}>
                <Link
                  to={`/categories/${c.name}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={c.imgUrl} style={{width:'15rem', marginLeft:'10%', height:'15rem'}}/>
                </Link>
                <Card.Body>
                  <Card.Title>{c.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
)}):<div>No hay nada</div>}
 </Row>
  </Container>
);