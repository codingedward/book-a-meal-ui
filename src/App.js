import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/views/Landing';
import LoginContainer from './containers/LoginContainer';
import './styles.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Landing} />
                    <Route path="/login" component={LoginContainer} />
                </div>
            </Router>
        );
    }
}

export default App;
