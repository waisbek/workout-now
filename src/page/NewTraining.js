import React, { useState } from 'react';
import '../App.css';
import {
    Container,
    Row,
    Col,
    Button,
    UncontrolledCollapse,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    CustomInput,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ListGroup,
    ListGroupItem,
    Card,
    CardTitle,
    CardText,
    CardBody,
    CardFooter,
    CardHeader
} from 'reactstrap';
import Header from '../components/Header'

const NewTraining = () => {
    const [modal, setModal] = useState(false);
    const [training, setTraining] = useState({ roundRestTime: 0, rounds: [] })
    const [newRound, setNewRound] = useState({ exerciseList: [] })
    const [update, setUpdate] = useState(false)
    const [lastRound, setLastRound] = useState(false)
    const [repeatRoundsInput, setRepeatRoundsInput] = useState(true)
    const [repeatRounds, setRepeatRounds] = useState(1)

    const toggle = () => setModal(!modal);
    const exerciseList = ['Exercício 01', 'Exercício 02', 'Exercício 03', 'Exercício 04', 'Exercício 05', 'Exercício 06', 'Exercício 07', 'Exercício 08', 'Exercício 09', 'Exercício 10']

    // const training = {
    // 	roundRestTime: 0,
    // 	rounds: [
    // 		{
    //  		type: round,
    // 			exerciseTime: 0,
    // 			restTime: 0,
    // 			exerciseList: [
    // 				'exercicio01',
    // 				'exercicio02',
    // 				'exercicio03'
    // 			]
    // 		}
    // 	]
    // }

    const renderTraining = () => {
        return training.rounds.map((item, index) => {
            return (
                <Card key={index}>
                    <React.Fragment>
                        <CardHeader id={"toggler" + index}>
                            <Row>
                                <Col xs="3">
                                    <img src="/assets/img/time.svg" width="32" height="32" title="Workout" className='mr-2' />
                                    {`ROUND ${index + 1}`}
                                </Col>
                                <Col xs="4">
                                    <span>
                                        <img src="/assets/img/workout.svg" width="32" height="32" title="Workout" className='mr-2' />
                                        {'Tempo de exercício: ' + item.exerciseTime}
                                    </span>
                                </Col>
                                <Col xs="4">
                                    <img src="/assets/img/hydratation.svg" width="32" height="32" title="Workout" className='mr-2' />
                                    {`Tempo de descanso: ${item.restTime}`}
                                </Col>
                            </Row>
                        </CardHeader>
                        <UncontrolledCollapse toggler={"#toggler" + index}>
                            <CardBody className="px-md-5">
                                <CardTitle>EXERCICIOS</CardTitle>
                                {
                                    renderExerciseList(item.exerciseList)
                                }
                            </CardBody>
                        </UncontrolledCollapse>
                        {lastRound && index === training.rounds.length - 1 ?
                            <CardFooter className='round-footer-finish'>
                                <img src="/assets/img/trophy.svg" width="32" height="32" title="Workout" className='mr-2' />
                            BOM TRABALHO!!
                            </CardFooter>
                            :
                            <CardFooter className='round-footer-rest'>
                                <img src="/assets/img/hydratation.svg" width="32" height="32" title="Workout" className='mr-2' />
                                {`DESCANSAR - ${training.roundRestTime}segundos`}
                            </CardFooter>
                        }
                    </React.Fragment>
                </Card>
            )
        }
        )
    }

    const renderExerciseList = (exercises) => {
        return exercises.map((exercise, index) => {
            return <CardText key={index}>{exercise}</CardText>
        })
    }
    const addExercise = (exercise) => {
        let roundData = newRound
        roundData.exerciseList.push(exercise)
        setNewRound(roundData)
        setUpdate(!update)
    }

    const removeExercise = (exerciseIndex) => {
        let roundData = newRound
        roundData.exerciseList = roundData.exerciseList.filter((currentExercise, index) => index !== exerciseIndex)
        setNewRound(roundData)
        setUpdate(!update)
    }

    const saveNewRound = () => {
        let i = 0
        while (repeatRounds > i) {
            let newTrainigData = training
            newTrainigData.rounds.push(newRound)
            setTraining(newTrainigData)
            i++
        }
        toggle()
        setNewRound({ exerciseList: [] })
        setRepeatRoundsInput(true)
        setUpdate(!update)
        console.log(training);
    }

    return (
        <React.Fragment>
            <Header />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Button color="secondary" size="sm" onClick={toggle}>Adicionar Round</Button>
                    </Col>
                    <Col xs="auto">
                        <Form inline>
                            <FormGroup>
                                <Label for="roundRestTime">Tempo de descanso entre rounds: </Label>
                                <Input type="select" name="select" id="roundRestTime" className="ml-2" bsSize="sm" onChange={(event) => { setTraining({ ...training, [event.target.id]: event.target.value }) }}>
                                    <option value={0}>Selecione...</option>
                                    <option value={10}>10 segundos</option>
                                    <option value={20}>20 segundos</option>
                                    <option value={30}>30 segundos</option>
                                    <option value={40}>40 segundos</option>
                                    <option value={50}>50 segundos</option>
                                    <option value={60}>1 minuto</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs="12">
                        {renderTraining()}
                    </Col>
                </Row>
            </Container>
            {
                //  MODAL - NOVO ROUD
            }
            <div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Novo round</ModalHeader>
                    <ModalBody>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="exerciseTime">Tempo de cada exercício</Label>
                                    <Input type="select" name="select" id="exerciseTime" onChange={(event) => { setNewRound({ ...newRound, [event.target.id]: event.target.value }) }}>
                                        <option value={0}>Selecione...</option>
                                        <option value={10}>10 segundos</option>
                                        <option value={20}>20 segundos</option>
                                        <option value={30}>30 segundos</option>
                                        <option value={40}>40 segundos</option>
                                        <option value={50}>50 segundos</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exerciseTime">Tempo de descanso do exercício</Label>
                                    <Input type="select" name="select" id="restTime" onChange={(event) => { setNewRound({ ...newRound, [event.target.id]: event.target.value }) }}>
                                        <option value={0}>Selecione...</option>
                                        <option value={10}>10 segundos</option>
                                        <option value={20}>20 segundos</option>
                                        <option value={30}>30 segundos</option>
                                        <option value={40}>40 segundos</option>
                                        <option value={50}>50 segundos</option>
                                    </Input>
                                </FormGroup>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Label>Lista de Exercícios </Label>
                                </Row>
                                <Row>
                                    <Col>
                                        <Label>Clique para adicionar </Label>
                                        <div className='exercise-list'>
                                            <ListGroup>
                                                {
                                                    exerciseList.map((exercise, index) => {
                                                        return <ListGroupItem key={index} color="secondary" action onClick={() => addExercise(exercise)}>{exercise}</ListGroupItem>
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Label>Clique para remover </Label>
                                        <div className='exercise-list'>
                                            <ListGroup>
                                                {
                                                    newRound.exerciseList.map((exercise, index) => {
                                                        return <ListGroupItem key={index} color="secondary" action onClick={() => removeExercise(index)}>{exercise}</ListGroupItem>
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="repeatRounds">Repetir esse round?</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <Input addon type="checkbox" onChange={(event) => { setRepeatRoundsInput(!event.target.checked) }} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input disabled={repeatRoundsInput} id="repeatRounds" placeholder="Quantas vezes?" onChange={(event) => { setRepeatRounds(event.target.value) }} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <div>
                                        <CustomInput type="switch" id="lastRound" name="lastRound" label="Último round?" onClick={(event) => { setLastRound(event.target.checked) }} />
                                    </div>
                                </FormGroup>
                            </Form>
                        </Col>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={saveNewRound}>Adicionar</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {
                // <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            }
        </React.Fragment>
    );
}

export default NewTraining;