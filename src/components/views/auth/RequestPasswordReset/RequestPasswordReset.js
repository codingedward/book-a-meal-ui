import React from 'react';
import axios from 'src/axios';
import { Button, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Role } from 'src/constants';

import AuthPage from 'src/components/common/AuthPage';
import { singleError, authenticated } from 'src/utils';
import './styles.css';

class RequestPasswordReset extends React.Component {

    state = {}

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            loading: true,
        });
        const _this = this;
        axios.post('auth/password-reset', this.state).then(({ data }) => {
            _this.setState({
                ..._this.state,
                success: true,
                loading: false,
            });
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
                loading: false,
            });
        });
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { error, success, loading } = this.state
        const user = authenticated();
        if (user) {
            switch(user.role) {
                case Role.SUPER_ADMIN:
                case Role.ADMIN:
                    return <Redirect to="/admin/meals" />;
                case Role.USER:
                    return <Redirect to="/user/menu" />;
                default:
                    break;
            }
        }

        return (
            <AuthPage styles={{ minHeight: '500px', height: '100vh' }} loading={loading}>
                <form 
                    className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card"
                    onSubmit={this.onSubmit}>
                    <h5 className="text-center mb-3 mt-4">Request Password Reset</h5>
                    {error && 
                        <Alert color="danger"> {singleError(error)} </Alert>
                    }
                    {success && 
                        <Alert color="success">
                            An email has been sent with the password reset link.
                            Please login to this email account to proceed.
                        </Alert>
                    }
                    <label>Account Email Address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name="email" 
                        onChange={this.onChange} />
                    <Button disabled={loading} className="btn btn-primary mt-2 mb-4">Reset</Button>
                </form>
            </AuthPage>
        );
    }
}

export default RequestPasswordReset;