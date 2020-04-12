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
    CardHeader,
    Jumbotron,
    FormFeedback,
    Badge
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
    const [validationInvalidInputExerciseTime, setValidationInvalidInputExerciseTime] = useState(false)
    const [validationInvalidInputRestTime, setValidationInvalidInputRestTime] = useState(false)
    const [validationInvalidExerciseList, setValidationInvalidExerciseList] = useState(false)

    const toggleNewRoundModal = () => {
        setValidationInvalidInputExerciseTime(false)
        setModal(!modal)
    };
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

    const removeRound = (roundIndex) => {
        let newTrainingData = training
        newTrainingData.rounds = newTrainingData.rounds.filter((round, index) => roundIndex !== index)
        setTraining(newTrainingData)
        setUpdate(!update)
    }

    const addExercise = (exercise) => {
        let roundData = newRound
        roundData.exerciseList.push(exercise)
        setNewRound(roundData)
        checkInvalidField('exerciseList', roundData.exerciseList.length)
        setUpdate(!update)
    }

    const removeExercise = (exerciseIndex) => {
        let roundData = newRound
        roundData.exerciseList = roundData.exerciseList.filter((currentExercise, index) => index !== exerciseIndex)
        setNewRound(roundData)
        checkInvalidField('exerciseList', roundData.exerciseList.length)
        setUpdate(!update)
    }

    const saveNewRound = () => {
        if (checkMandatoryFields()) {
            let i = 0
            while (repeatRounds > i) {
                let newTrainigData = training
                newTrainigData.rounds.push(newRound)
                setTraining(newTrainigData)
                i++
            }
            toggleNewRoundModal()
            setNewRound({ exerciseList: [] })
            setRepeatRoundsInput(true)
        }
        setUpdate(!update)
    }

    const checkMandatoryFields = () => {
        if (newRound.exerciseTime === undefined || parseInt(newRound.exerciseTime) === 0) {
            setValidationInvalidInputExerciseTime(true)
            return false
        } else {
            setValidationInvalidInputExerciseTime(false)
        }

        if (newRound.restTime === undefined || parseInt(newRound.restTime) === 0) {
            setValidationInvalidInputRestTime(true)
            return false
        } else {
            setValidationInvalidInputRestTime(false)
        }

        if (newRound.exerciseList.length === 0) {
            setValidationInvalidExerciseList(true)
            return false
        } else {
            setValidationInvalidExerciseList(false)
        }
        return true
    }

    const checkInvalidField = (field, value) => {
        switch (field) {
            case 'exerciseTime':
                if (parseInt(value) === 0) {
                    setValidationInvalidInputExerciseTime(true)
                } else {
                    setValidationInvalidInputExerciseTime(false)
                }
                break;
            case 'restTime':
                if (parseInt(value) === 0) {
                    setValidationInvalidInputRestTime(true)
                } else {
                    setValidationInvalidInputRestTime(false)
                }
                break;
            case 'exerciseList':
                if (value === 0) {
                    setValidationInvalidExerciseList(true)
                } else {
                    setValidationInvalidExerciseList(false)
                }
                break;
            default:
                break;
        }

        setUpdate(!update)
    }

    const renderTraining = () => {
        if (training.rounds.length === 0) {
            return (
                <Jumbotron className='new-training-page'>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <img src="/assets/img/sad.svg" width="180" height="180" title="Sad" className='mr-2' alt='Sad' />
                    </Row>
                    <Row className='mt-5 d-flex justify-content-center align-items-center'>
                        <span className='empty-list-message'>Você ainda não adicionou nenhum exercício.</span>
                    </Row>
                    <Row className='d-flex justify-content-center align-items-center'>
                        <span className='empty-list-message'>Clique no botão <Button color="secondary" onClick={toggleNewRoundModal}>Adicionar Round</Button>  para começar.</span>
                    </Row>
                </Jumbotron>
            )
        } else {
            return training.rounds.map((item, index) => {
                return (
                    <Card key={index}>
                        <React.Fragment>
                            <CardHeader>
                                <Row>
                                    <Col xs="2">
                                        <img src="/assets/img/time.svg" width="32" height="32" title="time" className='mr-2' alt='Time' />
                                        <strong>ROUND {index + 1}</strong>
                                    </Col>
                                    <Col xs="4">
                                        <span>
                                            <img src="/assets/img/workout.svg" width="32" height="32" title="Workout" className='mr-2' alt='Workout' />
                                            Tempo de exercício: <strong>{`${item.exerciseTime} segundos`}</strong>
                                        </span>
                                    </Col>
                                    <Col xs="5">
                                        <img src="/assets/img/hydratation.svg" width="32" height="32" title="hydratation" className='mr-2' alt='Hydratation' />
                                        Tempo de descanso: <strong>{`${item.restTime} segundos`}</strong>
                                    </Col>
                                    <Col xs="1">
                                        <Button close onClick={() => removeRound(index)} />
                                    </Col>
                                </Row>
                                <div>
                                    <Row className="d-flex justify-content-center align-items-center mt-2">
                                        <small id={"toggler" + index}>expandir exercícios</small>
                                    </Row>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/img/chevron.svg" width="18" height="18" title="chevron" alt='Chevron' id={"toggler" + index} />
                                    </Row>
                                </div>
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
                                    <img src="/assets/img/trophy.svg" width="32" height="32" title="trophy" className='mr-2' alt='Trophy' />
                            FIM DO TREINAMENTO!
                            </CardFooter>
                                :
                                <CardFooter className='round-footer-rest'>
                                    <img src="/assets/img/hydratation.svg" width="32" height="32" title="hydratation" className='mr-2' alt='Hydratation' />
                                    {`DESCANSAR - ${training.roundRestTime}segundos`}
                                </CardFooter>
                            }
                        </React.Fragment>
                    </Card>
                )
            }
            )
        }
    }

    const renderExerciseList = (exercises) => {
        return exercises.map((exercise, index) => {
            return <CardText key={index}>{exercise}</CardText>
        })
    }

    return (
        <React.Fragment>
            <Header />
            <Container className="mt-3">
                <Row>
                    <Col>
                        <Button color="secondary" size="sm" onClick={toggleNewRoundModal}>Adicionar Round</Button>
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
                <Modal isOpen={modal} toggle={toggleNewRoundModal}>
                    <ModalHeader toggle={toggleNewRoundModal}>Novo round</ModalHeader>
                    <ModalBody>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Label for="exerciseTime">Tempo de cada exercício</Label>
                                    <Input type="select" name="select" id="exerciseTime"
                                        invalid={validationInvalidInputExerciseTime}
                                        onChange={(event) => {
                                            checkInvalidField(event.target.id, event.target.value)
                                            setNewRound({ ...newRound, [event.target.id]: event.target.value })
                                        }}>
                                        <option value={0}>Selecione...</option>
                                        <option value={10}>10 segundos</option>
                                        <option value={20}>20 segundos</option>
                                        <option value={30}>30 segundos</option>
                                        <option value={40}>40 segundos</option>
                                        <option value={50}>50 segundos</option>
                                    </Input>
                                    <FormFeedback>Selecione o tempo de cada exercício.</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="restTime">Tempo de descanso do exercício</Label>
                                    <Input type="select" name="select" id="restTime"
                                        invalid={validationInvalidInputRestTime}
                                        onChange={(event) => {
                                            checkInvalidField(event.target.id, event.target.value)
                                            setNewRound({ ...newRound, [event.target.id]: event.target.value })
                                        }}>
                                        <option value={0}>Selecione...</option>
                                        <option value={10}>10 segundos</option>
                                        <option value={20}>20 segundos</option>
                                        <option value={30}>30 segundos</option>
                                        <option value={40}>40 segundos</option>
                                        <option value={50}>50 segundos</option>
                                    </Input>
                                    <FormFeedback>Selecione o tempo de descanso entre cada exercício.</FormFeedback>
                                </FormGroup>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Label>Lista de Exercícios <Badge color="secondary">{newRound.exerciseList.length}</Badge></Label>
                                </Row>
                                {
                                    validationInvalidExerciseList &&
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <small className='invalid-exercise-list'>Sua lista de exercícios está vazia, adicione um exercício.</small>
                                    </Row>
                                }
                                <Row>
                                    <Col>
                                        <small>Clique para adicionar </small>
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
                                        <small>Clique para remover </small>
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