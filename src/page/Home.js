import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import '../App.scss';
import {
    Container,
    Row,
    Jumbotron,
    Button,
    Label,
} from 'reactstrap';



const Home = () => {
    const [goPreparation, setGoPreparation] = useState(false)

    return (
        <Container className="d-flex home-page justify-content-center align-items-center">
            {goPreparation && <Redirect to='/new-training' />}
            <Jumbotron className='new-training-page'>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Label tag='h1'>WORKOUT NOW</Label></Row>
                <Row className='d-flex justify-content-center align-items-center'>
                    <img src="/assets/img/workout.svg" width="160" height="160" title="Workout" className='mr-2 mt-1' alt='Workout' />
                </Row>
                <Row className=' mt-3 d-flex justify-content-center align-items-center'>
                    <ul>
                        <li>
                            <span className='empty-list-message'>Prepare o treino.</span>
                        </li>
                        <li>
                            <span className='empty-list-message'>Crie rounds personalizados.</span>
                        </li>
                        <li>
                            <span className='empty-list-message'>Defina os tempos.</span>
                        </li>
                        <li>
                            <span className='empty-list-message'>Selecione os exercícios.</span>
                        </li>
                    </ul>
                </Row>
                <Row className='d-flex justify-content-center align-items-center'>
                    <small>Clique no botão para começar.</small>
                </Row>
                <Row className='d-flex justify-content-center align-items-center'>
                    <Button color="secondary" block onClick={() => { setGoPreparation(true) }}>NOVO TREINAMENTO</Button>
                </Row>
            </Jumbotron>
        </Container>
    )
}

export default Home