import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/views/Landing';
import LoginContainer from './containers/auth/LoginContainer';
import RegisterContainer from './containers/auth/RegisterContainer';
import MealsContainer from './containers/admin/MealsContainer';
import './styles.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/meals" component={MealsContainer} />
                    <Route path="/login" component={LoginContainer} />
                    <Route path="/sign-up" component={RegisterContainer} />
                </Switch>
            </Router>
        );
    }
}

export default App;
