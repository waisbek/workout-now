import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './page/Home'
import NewTraining from './page/NewTraining'
import Training from './page/Training'

const App = () => {
	return (
		<Router>
			<Route path='/' exact component={Home} />
			<Route path='/new-training' component={NewTraining} />
			<Route path='/training' component={Training} />
		</Router>
	);
}

export default App;