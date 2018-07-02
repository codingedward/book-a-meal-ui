import React from 'react';
import './styles.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(evt) {
        evt.preventDefault()
        this.props.authenticate(this.state)
    }

    handleInput(evt) {
        let data = {...this.state};
        data[evt.target.name] = evt.target.value;
        this.setState(data);
    }

    render() {
        return (
            <main className="patterns bg-teal">
                <section className="container login">
                    <div className="row pt-5">
                        <div className="col-12 text-center">
                            <h1 className="logo-small text-flav">BAM!</h1>
                        </div>
                    </div>
                    <div className="row mb-5 pl-3 pr-3 p-sm-0">
                        <form 
                            className="col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4 card"
                            onSubmit={this.handleSubmit}>
                            <h5 className="text-center mb-3 mt-4">Login</h5>
                            <h6 className="text-center">{this.props.auth}</h6>
                            <label>Email </label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                onChange={this.handleInput} />
                            <label>Password </label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                onChange={this.handleInput} />
                            <button className="btn btn-primary mt-2">Continue </button>
                            <p className="text-center pt-3"> <a className="" href="sign-up.html">Create Account?</a></p>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

export default Login;
