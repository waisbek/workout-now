import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css';
import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button,
    Label,
} from 'reactstrap';



const Home = () => {
    const [goPreparation, setGoPreparation] = useState(false)

    return (
        <Container className="d-flex home-page justify-content-center align-items-center" fluid>
            <Row>
                <Col xs="12">
                    <div>
                        <Label tag='h1'>WORKOUT NOW</Label>
                    </div>
                    <Jumbotron>
                        {goPreparation && <Redirect to='/new-training' />}
                        <Button block onClick={() => { setGoPreparation(true) }}>NOVO TREINAMENTO</Button>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    )
}

export default Home