import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './page/Home'
import NewTraining from './page/NewTraining'

const App = () => {
	return (
		<Router>
			<Route path='/' exact component={Home} />
			<Route path='/new-training' component={NewTraining} />
		</Router>
	);
}

export default App;