import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Container} from 'react-bootstrap'

const JumbotronElectrHogar = () => (
    <div>
    <Jumbotron fluid style={{backgroundImage:'linear-gradient(to bottom right,black, teal)'}}>
        <Container>
            <img src="https://pbs.twimg.com/profile_images/1267921952/logo_foto.png" alt=""/>
        </Container>
    </Jumbotron>
    </div>
)

export default JumbotronElectrHogar;