import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/views/admin/Home';
import Landing from './components/views/Landing';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';
import './styles.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Landing} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/sign-up" component={RegisterContainer} />
                    <Route path="/home" component={Home} />
                </div>
            </Router>
        );
    }
}

export default App;
