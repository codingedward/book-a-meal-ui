import React from 'react'
import axios from 'src/axios'
import { Button, Alert } from 'reactstrap'
import { Redirect, Link } from 'react-router-dom'

import AuthPage from 'src/components/common/AuthPage'
import { singleError, authenticated } from 'src/utils'
import './styles.css'

class Login extends React.Component {

    state = {}

    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            ...this.state,
            loading: true,
        })
        const _this = this
        axios.post('auth/login', this.state).then(({ data }) => {
            localStorage.setItem('token', `Bearer ${data.access_token}`)
            _this.props.history.push('/admin/meals')
        }).catch(({ response }) => {
            _this.setState({
                ..._this.state,
                error: response,
                loading: false,
            })
        })
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { error, loading } = this.state

        if (authenticated()) {
            return <Redirect to="/admin/meals" />
        }

        return (
            <AuthPage loading={this.state.loading}>
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
        )
    }
}

export default Login
