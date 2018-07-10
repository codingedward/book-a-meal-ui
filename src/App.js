import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './components/views/Landing';
import Login from 'src/components/views/auth/Login';
import Register from 'src/components/views/auth/Register';
import Admin from 'src/components/views/admin';
import './styles.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/login" component={Login} />
                    <Route path="/sign-up" component={Register} />
                </Switch>
            </Router>
        );
    }
}

export default App;
