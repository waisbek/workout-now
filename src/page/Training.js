import React, { useState, useEffect } from 'react'
import { Container, Button, Row } from 'reactstrap'
import Header from '../components/Header'

const Training = ({ location }) => {
    const [secondControl, setSecondControl] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [timer, setTimer] = useState()
    const [currentActivity, setCurrentActivity] = useState(null)
    const [currentRound, setCurrentRound] = useState(0)
    const [totalExerciseCurrentRound, setTotalExerciseCurrentRound] = useState()
    const [currentExercise, setCurrentExercise] = useState(0)

    const trainingData = location.state.training
    const totalRounds = trainingData.rounds.length

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
                            stopTimer()
                            console.log('FINISH!!!');
                        } else {
                            startTimer('restRoundTime')
                        }
                    } else {
                        startTimer('restTime')
                    }
                }
                break;
            case 'restTime':
                if (secondControl === parseInt(trainingData.rounds[currentRound].restTime)) {
                    stopTimer()
                    setCurrentExercise(currentExercise => currentExercise + 1)
                    startTimer('exercise')
                }
                break;
            case 'restRoundTime':
                if (secondControl === parseInt(trainingData.rounds[currentRound].roundRestTime)) {
                    stopTimer()
                    setCurrentRound(currentRound => currentRound + 1)
                    setCurrentExercise(0)
                    startTimer('exercise')
                }
                break;
            default:
                break;
        }


    }, [seconds])

    const startTimer = (activity) => {
        setCurrentActivity(activity)

        const timer = setInterval(() => {
            setSecondControl(secondControl => secondControl + 1)
            setSeconds(seconds => seconds + 1)
        }, 1000)
        setTimer(timer)
    }

    const stopTimer = () => {
        clearInterval(timer)
        setMinutes(0)
        setSeconds(0)
        setSecondControl(0)
    }

    return (
        <React.Fragment>
            <Header />
            <Container className="mt-3">
                <Row className="d-flex justify-content-center aligns-items-center">
                    <p>{`0${minutes}`}:</p>
                    <p>{seconds > 9 ? seconds : `0${seconds}`}</p>
                </Row>
                <Row className="d-flex justify-content-center aligns-items-center">
                    <Button onClick={() => { startTimer('exercise') }}>START</Button>
                </Row>
            </Container>
            <div>
                {
                    trainingData.rounds.map((item, index) => {
                        return (
                            <React.Fragment>
                                <h4>{`ROUND ${index + 1}`}</h4>
                                <p>{item.restTime}</p>
                                <p>{item.roundRestTime}</p>
                                <p>{item.exerciseTime}</p>
                                <ul>
                                    {item.exerciseList.map((item, index) => {
                                        return <li key={index}>{item}</li>
                                    })}
                                </ul>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Training