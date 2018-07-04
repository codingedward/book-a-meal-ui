import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import AuthPage from '../../common/AuthPage';
import { singleError } from '../../../utils';
import './styles.css';

class Register extends React.Component {

    state = {}

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.signUp(this.state);
    }

    onChange = (evt) => {
        this.setState({
            ...this.state,
            [evt.target.name]: evt.target.value
        })
    }

    render() {

        const { loading, error } = this.props.response;

        return (
            <AuthPage>
                <form 
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card"
                    onSubmit={this.onSubmit}>

                    <h5 className="text-center mb-3 mt-4">Create An Account</h5>
                    {error && <Alert color="danger"> {singleError(error)} </Alert>}
                    <label>Username</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        name="username" 
                        onChange={this.onChange} />
                    <label>Email</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        name="email" 
                        onChange={this.onChange} />
                    <label>Password </label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="password" 
                        onChange={this.onChange} />
                    <label>Confirm Password</label>
                    <input 
                        className="form-control" 
                        type="password" 
                        name="password_confirmation" 
                        onChange={this.onChange} />
                    <Button disabled={loading} className="btn btn-primary mt-2">Sign Up</Button>
                    <p className="text-center pt-3"> 
                        <Link to="/login">Login?</Link>
                    </p>
                </form>
            </AuthPage>
        );
    }
}

Register.propTypes = {
    response: PropTypes.object.isRequired,
    redirect: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired
}

export default Register;
