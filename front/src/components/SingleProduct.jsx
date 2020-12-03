import React from 'react';
import Card from 'react-bootstrap/Card';


export default function({singleProduct}) {
    console.log('esto es el singleProduct = ',singleProduct)
    return(
        <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={singleProduct.imgUrl} />
                <Card.Body>
                <Card.Title style={{fontSize:'17px', fontWeight:'bold'}}>{singleProduct.name}</Card.Title>
                <Card.Text style={{fontSize:'12px'}}>
                    {singleProduct.description}
                </Card.Text>
                </Card.Body>
            </Card>

    )
}
