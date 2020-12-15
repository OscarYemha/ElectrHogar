import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Container} from 'react-bootstrap'

export default () => (
    <Jumbotron fluid style={{backgroundImage:'linear-gradient(to bottom right,black, teal)'}}>
        <Container>
            {/* <h1>Fluid jumbotron</h1>
            <p>
            This is a modified jumbotron that occupies the entire horizontal space of
            its parent.
            </p> */}
            <img src="https://pbs.twimg.com/profile_images/1267921952/logo_foto.png" alt=""/>
        </Container>
    </Jumbotron>
)