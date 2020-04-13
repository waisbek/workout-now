import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Button, Col, Row, Jumbotron } from 'reactstrap'
import UIfx from 'uifx'
import Header from '../components/Header'

const Training = ({ location }) => {
    const [secondControl, setSecondControl] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [timer, setTimer] = useState()
    const [beepTimer, setBeepTimer] = useState()
    const [currentActivity, setCurrentActivity] = useState(null)
    const [currentRound, setCurrentRound] = useState(0)
    const [totalExerciseCurrentRound, setTotalExerciseCurrentRound] = useState()
    const [currentExercise, setCurrentExercise] = useState(0)
    const [isStartButton, setIsStartButton] = useState(true)
    const [isPauseButton, setIsPauseButton] = useState(false)
    const [isRestartButton, setIsRestartButton] = useState(false)
    const [isFinish, setIsFinish] = useState(false)
    const [goHome, setGoHome] = useState(false)

    const trainingData = location.state.training
    const totalRounds = trainingData.rounds.length

    const sounds = {
        whistle: new UIfx(
            '/assets/sound/whistle.wav'
        ),
        beep: new UIfx(
            '/assets/sound/beep.wav'
        )
    }

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

    useEffect(() => {
        setTotalExerciseCurrentRound(trainingData.rounds[currentRound].exerciseList.length - 1)
    }, [currentRound])

    useEffect(() => {

        if (seconds === 60) {
            setSeconds(0)
            setMinutes(minutes => minutes + 1)
        }

        switch (currentActivity) {
            case 'exercise':
                if (secondControl === parseInt(trainingData.rounds[currentRound].exerciseTime)) {
                    stopTimer()
                    if (currentExercise === totalExerciseCurrentRound) {
                        if (totalRounds - 1 === currentRound) {
                            setIsFinish(true)
                            restartTraining()
                        } else {
                            startTimer('restRoundTime')
                        }
                    } else {
                        startTimer('restTime')
                    }
                } else if (parseInt(trainingData.rounds[currentRound].exerciseTime) - secondControl === 4) {
                    const beepTimer = setInterval(() => {
                        sounds.beep.play()
                    }, 1000)
                    setBeepTimer(beepTimer)
                }
                break;
            case 'restTime':
                if (secondControl === parseInt(trainingData.rounds[currentRound].restTime)) {
                    stopTimer()
                    setCurrentExercise(currentExercise => currentExercise + 1)
                    startTimer('exercise')
                } else if (parseInt(trainingData.rounds[currentRound].restTime) - secondControl === 4) {
                    const beepTimer = setInterval(() => {
                        sounds.beep.play()
                    }, 1000)
                    setBeepTimer(beepTimer)
                }
                break;
            case 'restRoundTime':
                if (secondControl === parseInt(trainingData.rounds[currentRound].roundRestTime)) {
                    stopTimer()
                    setCurrentRound(currentRound => currentRound + 1)
                    setCurrentExercise(0)
                    startTimer('exercise')
                } else if (parseInt(trainingData.rounds[currentRound].roundRestTime) - secondControl === 4) {
                    const beepTimer = setInterval(() => {
                        sounds.beep.play()
                    }, 1000)
                    setBeepTimer(beepTimer)
                }
                break;
            default:
                break;
        }


    }, [seconds])

    const startTimer = (activity) => {
        setIsRestartButton(false)
        setIsStartButton(false)
        setIsPauseButton(true)
        setCurrentActivity(activity)
        if (activity === 'exercise') {
            sounds.whistle.play()
        } else {
            // Som para descanso
        }
        const timer = setInterval(() => {
            setSecondControl(secondControl => secondControl + 1)
            setSeconds(seconds => seconds + 1)
        }, 1000)
        setTimer(timer)
    }

    const stopTimer = () => {
        clearInterval(timer)
        clearInterval(beepTimer)
        setMinutes(0)
        setSeconds(0)
        setSecondControl(0)
    }

    const pauseTimer = () => {
        setIsPauseButton(false)
        setIsRestartButton(true)
        clearInterval(timer)
        clearInterval(beepTimer)
    }

    const restartTraining = () => {
        stopTimer()
        setCurrentActivity(null)
        setCurrentRound(0)
        setCurrentExercise(0)
        setIsStartButton(true)
        setIsRestartButton(false)
    }

    return (
        <React.Fragment>
            <Header />
            {goHome && <Redirect to='/' />}
            <Container className="mt-3">
                {
                    isFinish ?
                        <Jumbotron className='new-training-page'>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <img src="/assets/img/trophy.svg" width="180" height="180" title="Trophy" className='mr-2' alt='Trophy' />
                            </Row>
                            <Row className='mt-5 d-flex justify-content-center align-items-center'>
                                <span className='empty-list-message'>Parabéns você concluiu o treinamento!</span>
                            </Row>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <span className='empty-list-message'>Clique no botão <Button color="secondary" onClick={() => { setGoHome(true) }}>HOME</Button> para voltar a página inicial.</span>
                            </Row>
                        </Jumbotron>
                        :
                        <Jumbotron>
                            <Row>
                                <Col className='d-flex justify-content-center align-items-center'>
                                    <h3>
                                        <img src="/assets/img/time.svg" width="32" height="32" title="time" className='mr-2' alt='Time' />
                                        {`ROUND ${currentRound + 1}`}
                                    </h3>
                                </Col>
                                <Col className='d-flex justify-content-center align-items-center'>
                                    {
                                        currentActivity === 'exercise' ?
                                            <h3>
                                                <img src="/assets/img/workout.svg" width="32" height="32" title="Workout" className='mr-2' alt='Workout' />
                                                {trainingData.rounds[currentRound].exerciseList[currentExercise]}
                                            </h3> :
                                            <h3>
                                                <img src="/assets/img/hydratation.svg" width="32" height="32" title="hydratation" className='mr-2' alt='Hydratation' />
                                        DESCANSAR
                                    </h3>
                                    }
                                </Col>
                            </Row>
                            <Row className="d-flex justify-content-center aligns-items-center mt-4">
                                <h1>{`0${minutes}`}:</h1>
                                <h1>{seconds > 9 ? seconds : `0${seconds}`}</h1>
                            </Row>
                            <Row className="d-flex justify-content-center aligns-items-center mt-2">
                                {
                                    isStartButton && <Button onClick={() => { startTimer('exercise') }}>INICIAR</Button>
                                }

                                {
                                    isPauseButton && <Button onClick={() => { pauseTimer() }}>PAUSAR</Button>
                                }
                                {
                                    isRestartButton &&
                                    <React.Fragment>
                                        <Col className="d-flex justify-content-center aligns-items-center">
                                            <Button onClick={() => { startTimer(currentActivity) }}>CONTINUAR</Button>
                                        </Col>
                                        <Col className="d-flex justify-content-center aligns-items-center">
                                            <Button onClick={() => { restartTraining() }}>REINICIAR TREINAMENTO</Button>
                                        </Col>
                                    </React.Fragment>
                                }
                            </Row>
                        </Jumbotron>
                }
            </Container>
        </React.Fragment>
    )
}

export default Training