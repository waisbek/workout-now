import React from 'react'
import Header from '../components/Header'

const Training = ({ location }) => {
    const training = location.state.training
    return (
        <React.Fragment>
            <Header />
            <div>
                {JSON.stringify(training)}
            </div>
        </React.Fragment>
    )
}

export default Training