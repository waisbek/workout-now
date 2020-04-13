import React, { useState, useEffect } from 'react'
import { Container, Button, Row } from 'reactstrap'
import Header from '../components/Header'

const Training = ({ location }) => {
    const training = location.state.training
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)

    useEffect(() => {
        if (seconds === 60) {
            setSeconds(0)
            setMinutes(minutes => minutes + 1)
        }
    }, [seconds])

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

    const startTimer = () => {
        setInterval(() => {
            setSeconds(seconds => seconds + 1)
        }, 1000)
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
                    <Button onClick={startTimer}>START</Button>
                </Row>
            </Container>
            <div>
                {
                    training.rounds.map((item, index) => {
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