import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Jumbotron, Button, Form, FormGroup, Input } from 'reactstrap';
import UIfx from 'uifx'

function App() {
	const [seconds, setSeconds] = useState(0)
	const [restTime, setRestTime] = useState(0)
	const [exercise, setExercise] = useState(0)
	const [countExercise, setCountExercise] = useState(1)
	const [rounds, setRounds] = useState(0)
	const [countRounds, setCountRounds] = useState(0)
	const [exerciseTime, setExerciseTime] = useState(0)
	const [moment, setMoment] = useState('stop')
	const [startTraining, setStartTraining] = useState(false)
	const [timer, setTimer] = useState()
	const [momentText, setMomentText] = useState()

	const beep = new UIfx('/beep.wav')

	useEffect(() => {
		if (countRounds >= rounds) {
			setMoment('stop')
			setMomentText(<p>BOA!!</p>)
			stop()
		} else {
			switch (moment) {
				case 'exercise':
					if (seconds >= exerciseTime) {
						setCountExercise(countExercise => countExercise + 1)

						if (countExercise == exercise) {
							setCountRounds(countRounds => countRounds + 1)
							setCountExercise(1)
						}

						setMoment('rest')
						setMomentText(<p>DESCANSAR</p>)
					} else if (exerciseTime - seconds === 1) {
						beep.play()
					}
					break
				case 'rest':
					if (seconds >= restTime) {
						setMoment('exercise')
						setMomentText(<p>GO!!</p>)
					}
					break
				default:
					break;
			}
		}
	}, [seconds])

	useEffect(() => {
		setSeconds(0)
	}, [moment])

	const start = () => {
		setStartTraining(true)
		setMoment('exercise')
		setMomentText(<p>GO!!</p>)
		let newTimer = setInterval(() => {
			setSeconds(seconds => seconds + 1)
		}, 1000)

		setTimer(newTimer)
	}

	const stop = () => {
		clearInterval(timer)
		setSeconds(0)
		setCountRounds(0)
		setStartTraining(false)
	}

	return (
		<Container className="d-flex justify-content-center align-items-center screen">
			<Col>
				<div className="d-flex justify-content-center align-items-center">
					<Form>
						<FormGroup>
							<Input type="number" name="exerciseTime" id="exerciseTime" placeholder="Tempo de cada exercício" onChange={(event) => { setExerciseTime(event.target.value) }} />
						</FormGroup>
						<FormGroup>
							<Input type="number" name="restTime" id="restTime" placeholder="Tempo de descanso" onChange={(event) => { setRestTime(event.target.value) }} />
						</FormGroup>
						<FormGroup>
							<Input type="number" name="countExercise" id="countExercise" placeholder="Quantidade de exercicios" onChange={(event) => { setExercise(event.target.value) }} />
						</FormGroup>
						<FormGroup>
							<Input type="number" name="rounds" id="rounds" placeholder="Quantidade de rounds" onChange={(event) => { setRounds(event.target.value) }} />
						</FormGroup>
					</Form>
				</div>
				<Jumbotron className="content">
					<div className="d-flex justify-content-center align-items-center">
						<Row>
							{momentText}
						</Row>
					</div>
					<div className="d-flex justify-content-center align-items-center">
						<Row>
							<p>{seconds < 10 ? '0' + seconds : seconds}</p>
						</Row>
					</div>
					<div className="d-flex justify-content-center align-items-center">
						<Row>
							{
								startTraining ? <Button onClick={stop}>STOP</Button> : <Button onClick={start}>START</Button>
							}
						</Row>
					</div>
				</Jumbotron>
			</Col>
		</Container>
	);
}

export default App;
