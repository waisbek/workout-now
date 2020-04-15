import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.scss';
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
    Badge,
    Fade
} from 'reactstrap';
import Header from '../components/Header'

const NewTraining = () => {
    const [modal, setModal] = useState(false);
    const [training, setTraining] = useState({ rounds: [] })
    const [newRound, setNewRound] = useState({ exerciseList: [] })
    const [update, setUpdate] = useState(false)
    const [lastRound, setLastRound] = useState(false)
    const [repeatRoundsInput, setRepeatRoundsInput] = useState(true)
    const [repeatRounds, setRepeatRounds] = useState(1)
    const [validationInvalidInputExerciseTime, setValidationInvalidInputExerciseTime] = useState(false)
    const [validationInvalidInputRestTime, setValidationInvalidInputRestTime] = useState(false)
    const [validationInvalidExerciseList, setValidationInvalidExerciseList] = useState(false)
    const [validationInvalidInputRoundRestTime, setValidationInvalidInputRoundRestTime] = useState(false)
    const [disabelStartBtn, setDisabelStartBtn] = useState(true)
    const [goTraining, setGoTraining] = useState(false)

    useEffect(() => {
        setValidationInvalidInputExerciseTime(false)
        setValidationInvalidInputRestTime(false)
        setValidationInvalidExerciseList(false)
        setValidationInvalidInputRoundRestTime(false)
        setNewRound({ exerciseList: [] })
        setRepeatRoundsInput(true)
        setRepeatRounds(1)
    }, [modal])

    useEffect(() => {
        if (lastRound) {
            setDisabelStartBtn(false)
        } else {
            setDisabelStartBtn(true)
        }
    }, [lastRound])

    const toggleNewRoundModal = () => {
        setValidationInvalidInputExerciseTime(false)
        setModal(!modal)
    };
    const exerciseList = ['Exercício 01', 'Exercício 02', 'Exercício 03', 'Exercício 04', 'Exercício 05', 'Exercício 06', 'Exercício 07', 'Exercício 08', 'Exercício 09', 'Exercício 10']

    // const training = {
    // 	rounds: [
    // 		{
    // 			exerciseTime: 0,
    // 			restTime: 0,
    // 	        roundRestTime: 0,
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

        if (training.rounds.length === 0) {
            setLastRound(false)
        }

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
            while (parseInt(repeatRounds) > i) {
                let newTrainigData = training
                newTrainigData.rounds.push(newRound)
                setTraining(newTrainigData)
                i++
            }
            toggleNewRoundModal()
        }
        setUpdate(!update)
    }

    const checkMandatoryFields = () => {

        if (newRound.restTime === undefined || parseInt(newRound.restTime) === 0) {
            setValidationInvalidInputRestTime(true)
            return false
        } else {
            setValidationInvalidInputRestTime(false)
        }

        if (newRound.roundRestTime === undefined || parseInt(newRound.roundRestTime) === 0) {
            setValidationInvalidInputRoundRestTime(true)
            return false
        } else {
            setValidationInvalidInputRoundRestTime(false)
        }

        if (newRound.exerciseTime === undefined || parseInt(newRound.exerciseTime) === 0) {
            setValidationInvalidInputExerciseTime(true)
            return false
        } else {
            setValidationInvalidInputExerciseTime(false)
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
            case 'roundRestTime':
                if (parseInt(value) === 0) {
                    setValidationInvalidInputRoundRestTime(true)
                } else {
                    setValidationInvalidInputRoundRestTime(false)
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
                        <img src="/assets/img/sad.svg" title="Sad" className='mr-2 content-img' alt='Sad' />
                    </Row>
                    <Row className='mt-5 d-flex justify-content-center align-items-center'>
                        <span className='empty-list-message'>Você ainda não adicionou nenhum exercício.</span>
                    </Row>
                    <Row className='d-flex justify-content-center align-items-center mt-1'>
                        <span className='empty-list-message'>Clique no botão para começar.</span>
                    </Row>
                    <Row className='d-flex justify-content-center align-items-center mt-1'>
                        <Button color="secondary" onClick={toggleNewRoundModal}>Adicionar Round</Button>
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
                                    <CardTitle className="d-flex justify-content-center align-items-center">
                                        <img src="/assets/img/gym.svg" width="32" height="32" title="gym" alt='Gym' className='mr-1' />
                                        <strong>EXERCÍCIOS</strong>
                                    </CardTitle>
                                    <CardText>
                                        {
                                            renderExerciseList(item.exerciseList)
                                        }
                                    </CardText>
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
                                    {item.roundRestTime === "60" ? 'DESCANSAR 1 minuto' : `DESCANSAR ${item.roundRestTime} segundos`}
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
            return (
                <Row className="d-flex justify-content-center align-items-center" key={index}>
                    <Label className='exercise-label-text'>{exercise}</Label>
                </Row>
            )
        })
    }

    return (
        <React.Fragment>
            <Header />
            <Container className="mt-3">
                {goTraining && <Redirect to={{ pathname: '/training', state: { training: training } }} />}
                <Row>
                    <Col className="d-flex justify-content-center align-items-center">
                        <Button color="secondary" size="sm" onClick={toggleNewRoundModal}>Adicionar Round</Button>
                        <Button color="secondary" size="sm" disabled={disabelStartBtn} className='ml-2' onClick={() => { setGoTraining(true) }}>Iniciar treinamento</Button>
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
                    <ModalHeader toggle={toggleNewRoundModal}>
                        <img src="/assets/img/time.svg" width="32" height="32" title="time" className='mr-2' alt='Time' />
                    Novo round
                    </ModalHeader>
                    <ModalBody>
                        <Col>
                            <Form>
                                <FormGroup>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <Label for="restTime">
                                            <img src="/assets/img/hydratation.svg" width="32" height="32" title="hydratation" className='mr-2' alt='Hydratation' />
                                    Tempo de descanso
                                </Label>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className='d-flex justify-content-center'>
                                                <small>Entre exercícios</small>
                                            </div>
                                            <Input type="select" name="select" id="restTime" bsSize="sm"
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
                                            <FormFeedback>Campo obrigatório</FormFeedback>
                                        </Col>
                                        <Col>
                                            <div className='d-flex justify-content-center'>
                                                <small>Entre rounds</small>
                                            </div>
                                            <Input type="select" name="select" id="roundRestTime" bsSize="sm"
                                                invalid={validationInvalidInputRoundRestTime}
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
                                                <option value={60}>1 minuto</option>
                                            </Input>
                                            <FormFeedback>Campo obrigatório</FormFeedback>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row className="d-flex justify-content-center align-items-center">
                                        <Label for="exerciseTime">
                                            <img src="/assets/img/workout.svg" width="32" height="32" title="Workout" className='mr-2' alt='Workout' />
                                Tempo de cada exercício
                                </Label>
                                    </Row>
                                    <Input type="select" name="select" id="exerciseTime" bsSize="sm"
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
                                    <FormFeedback>Campo obrigatório</FormFeedback>
                                </FormGroup>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Label>Lista de Exercícios <Badge color="secondary">{newRound.exerciseList.length}</Badge></Label>
                                </Row>
                                <Row className="d-flex justify-content-center align-items-center">
                                    <Fade in={validationInvalidExerciseList} tag="small" className='invalid-exercise-list'>Sua lista de exercícios está vazia, adicione um exercício.</Fade>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className='d-flex justify-content-center'>
                                            <small>Clique para adicionar </small>
                                        </div>
                                        <div className='exercise-list'>
                                            <ListGroup>
                                                {
                                                    exerciseList.map((exercise, index) => {
                                                        return <ListGroupItem key={index} action onClick={() => addExercise(exercise)}>{exercise}</ListGroupItem>
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className='d-flex justify-content-center'>
                                            <small>Clique para remover </small>
                                        </div>
                                        <div className='exercise-list'>
                                            <ListGroup>
                                                {
                                                    newRound.exerciseList.map((exercise, index) => {
                                                        return <ListGroupItem key={index} color="success" action onClick={() => removeExercise(index)}>{exercise}</ListGroupItem>
                                                    })
                                                }
                                            </ListGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Row>
                                        <Col>
                                            <div className='d-flex justify-content-center'>
                                                <Label for="repeatRounds">Repetir esse round?</Label>
                                            </div>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <Input addon type="checkbox" onChange={(event) => { setRepeatRoundsInput(!event.target.checked) }} />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="select" name="select" disabled={repeatRoundsInput} id="repeatRounds" bsSize="sm"
                                                    onChange={(event) => { setRepeatRounds(event.target.value) }}>
                                                    <option value={0}>Selecione...</option>
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                    <option value={4}>4</option>
                                                    <option value={5}>5</option>
                                                </Input>
                                            </InputGroup>
                                        </Col>
                                        <Col className='d-flex justify-content-center align-items-center'>
                                            <CustomInput type="switch" id="lastRound" name="lastRound" label="Último round?" onClick={(event) => { setLastRound(event.target.checked) }} />
                                        </Col>
                                    </Row>
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