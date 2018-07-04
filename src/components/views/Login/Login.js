import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';

import AuthPage from '../../common/AuthPage';
import { singleError } from '../../../utils';
import './styles.css';

class Login extends React.Component {

    state = {}

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.login(this.state);
    }

    onChange = (evt) => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        })
    }

    render() {
        const { payload, error, loading } = this.props.response;
        if (payload && payload.data.access_token) {
            return <Redirect to="/home" />
        }

        return (
            <AuthPage>
                <form 
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card"
                    onSubmit={this.onSubmit}>

                    <h5 className="text-center mb-3 mt-4">Login</h5>
                    {error && <Alert color="danger"> {singleError(error)} </Alert>}
                    <label>Email </label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        onChange={this.onChange} />
                    <label>Password </label>
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        onChange={this.onChange} />
                    <Button disabled={loading} className="btn btn-primary mt-2">Continue </Button>
                    <p className="text-center pt-3"> 
                        <Link to="/sign-up"> Create Account? </Link>
                    </p>
                </form>
            </AuthPage>
        );
    }
}

Login.propTypes = {
    response: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

export default Login;
