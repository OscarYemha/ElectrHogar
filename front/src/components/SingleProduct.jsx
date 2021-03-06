import React from "react";

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

export default function({singleProduct, handleCart,user}) {
    console.log('esto es el singleProduct = ',singleProduct)
    return(

            <Container>
      <br />
      <Row>
        <Col>
          <Card
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "50%",
            }}
          >
            <Row>
              <Col className="text-center">
                <br />
                <Card.Img
                  style={{ width: "50%" }}
                  variant="top"
                  src={singleProduct.imgUrl}
                />
              </Col>
            </Row>
            <Card.Body>
              <Card.Title>{singleProduct.name}</Card.Title>
              <Card.Text>
                <p>Precio: $ {singleProduct.price}</p>
              </Card.Text>
              <Card.Text>
                <p>{singleProduct.description}</p>
              </Card.Text>
              <Card.Text>
                
              </Card.Text>
              <Link to='/products' style={{textDecoration: 'none'}}>
                <Button 
                variant="contained"
                color="primary"
                style={{marginRight:'5px'}}
                >
                   Volver
                </Button>
              </Link>
              {user.id? <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      handleCart(singleProduct);
                    }}
                  >
                    Agregar al carrito
                  </Button>:null}
              {/* <Button
                variant="contained"
                color="primary"
                onClick={()=>{
                  handleCart(singleProduct)
                }}
              >
                 Agregar al carrito
              </Button> */}
            </Card.Body>
          </Card>
          <br />
        </Col>
      </Row>
    </Container>

    )
}
