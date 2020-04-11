import React, { useState } from 'react';
import './App.css';
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
	ListGroupItem
} from 'reactstrap';
import Header from './Header'

function App() {
	const [modal, setModal] = useState(false);
	const [training, setTraining] = useState({ roundRestTime: 0, followRoundSequence: false, activities: [] })
	const [repeatRoundsInput, setRepeatRoundsInput] = useState(true)
	const [newRound, setNewRound] = useState({ type: 'round', exerciseList: [] })
	const [update, setUpdate] = useState(false)

	const toggle = () => setModal(!modal);

	// const training = {
	// 	roundRestTime: 0,
	// 	followRoundSequence: false,
	// 	activities: [
	// 		{
	//  		type: round,
	// 			repeatRounds: 0,
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
		return training.activities.map((item, index) => {
			if (item.type === 'round') {
				return (
					<React.Fragment key={index}>
						<Row id={"toggler" + index}>
							<Col xs="3">{`ROUND ${index + 1}`}</Col>
							<Col xs="3">{`TEMPO EXERCICIO: ${item.exerciseTime}`}</Col>
							<Col xs="3">{`TEMPO DESCANSO: ${item.restTime}`}</Col>
						</Row>
						<UncontrolledCollapse toggler={"#toggler" + index}>
							<Row>
								<Col xs="6" className="px-md-5">
									{
										item.exerciseList.map(exercise => {
											return <div>{exercise}</div>
										})
									}
								</Col>
							</Row>
						</UncontrolledCollapse>
					</React.Fragment>
				)
			} else if (item.type === 'rest') {
				return (
					<React.Fragment>
						<Row>{`DESCANSO --- ${training.roundRestTime}segundos`}</Row>
					</React.Fragment>
				)
			}
		})
	}

	const newExerciseList = (event) => {
		let roundData = newRound
		if (event.target.checked) {
			roundData.exerciseList.push(event.target.id)
		} else {
			roundData.exerciseList = roundData.exerciseList.filter(exercise => exercise !== event.target.id)
		}
		setNewRound(roundData)
		setUpdate(!update)
	}

	const saveNewRound = () => {
		let newTrainigData = training
		newTrainigData.activities.push(newRound)
		setTraining(newTrainigData)
		toggle()
		setNewRound({ type: 'round', exerciseList: [] })
		setUpdate(!update)
	}

	const saveNewRestTime = () => {
		let newTrainigData = training
		newTrainigData.activities.push({ type: 'rest', })
		setTraining(newTrainigData)
		setUpdate(!update)
	}

	const isRoundBtnDisable = () => {
		const numberActivities = training.activities.length
		if (numberActivities > 0) {
			return training.activities[numberActivities - 1].type === 'round' ? true : false
		}
	}

	const isRestBtnDisable = () => {
		const numberActivities = training.activities.length
		if (numberActivities > 0) {
			return training.activities[numberActivities - 1].type === 'rest' ? true : false
		} else {
			return true
		}
	}

	return (
		<React.Fragment>
			<Header />
			<Container>
				<Row>
					<Col xs="3">
						<div>
							<Button color="primary" disabled={isRoundBtnDisable()} size="lg" block onClick={toggle}>Round</Button>
						</div>
						<div>
							<Button color="warning" disabled={isRestBtnDisable()} size="lg" block onClick={saveNewRestTime}>Descanso Round</Button>
						</div>
					</Col>
					<Col xs="9">
						{renderTraining()}
					</Col>
				</Row>
			</Container>
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
								<Row>
									<Col>
										<FormGroup>
											<Label for="exercises">Exercícios</Label>
											<div>
												<CustomInput type="switch" id="exercise01" name="exercise01" label="Exercício 01" onChange={event => newExerciseList(event)} />
												<CustomInput type="switch" id="exercise02" name="exercise02" label="Exercício 02" onChange={event => newExerciseList(event)} />
												<CustomInput type="switch" id="exercise03" name="exercise03" label="Exercício 03" onChange={event => newExerciseList(event)} />
												<CustomInput type="switch" id="exercise04" name="exercise04" label="Exercício 04" onChange={event => newExerciseList(event)} />
											</div>
										</FormGroup>
									</Col>
									<Col>
										<ListGroup>
											{
												newRound.exerciseList.map(exercise => {
													return <ListGroupItem>{exercise}</ListGroupItem>
												})
											}
										</ListGroup>
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
										<Input disabled={repeatRoundsInput} id="repeatRounds" placeholder="Quantas vezes?" onChange={(event) => { setNewRound({ ...newRound, [event.target.id]: event.target.value }) }} />
									</InputGroup>
								</FormGroup>
							</Form>
						</Col>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={saveNewRound}>Adicionar</Button>
						<Button color="secondary" onClick={toggle}>Cancelar</Button>
					</ModalFooter>
				</Modal>
			</div>
		</React.Fragment >
	);
}

export default App;