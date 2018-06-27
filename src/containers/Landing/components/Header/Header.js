import React from 'react';
import Typed from 'typed.js';
import './styles.css';

class Header extends React.Component {

    componentDidMount() {
        const first = [
            "Welcome to yummy stuff!",
            "Welcome to where food lives!",
        ];
        const randIndex = Math.trunc(Math.random() * first.length);
        new Typed("#slogan", {
            strings: [first[randIndex], "Welcome to book a meal." ],
            startDelay: 200,
            typeSpeed: 40,
            backSpeed: 40,
            showCursor: false,
        });
    }

    render() {
        return (
            <header className="welcome">
                <nav className="container">
                    <div className="row pt-md-5 pt-0">
                        <div className="col-12 col-md-8 offset-md-2 pt-0">
                            <h1 className="animated fadeInUp logo text-flav pb-md-3">
                                BAM!
                            </h1>
                            {/* eslint-disable */}
                            <h3 id="slogan" className="animated fadeInDown text-flav mb-md-4"></h3>
                            {/* eslint-enable */}
                        </div>
                    </div>
                    <div className="row mt-md-2 mt-2">
                        <div className="col-6">
                            <a href="sign-up.html" className="animated fadeInLeft btn btn-primary btn-lg float-right">
                                Sign Up
                            </a>
                        </div>
                        <div className="col-6">
                            <a href="login.html" className="animated fadeInRight btn btn-primary btn-lg float-left">
                                Log In 
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
