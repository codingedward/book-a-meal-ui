import React from 'react';
import './styles.css';

const AuthPage = ({ children }) => (
    <main className="patterns bg-teal">
        <section className="container login">
            <div className="row pt-5">
                <div className="col-12 text-center">
                    <h1 className="logo-small text-flav">BAM!</h1>
                </div>
            </div>
            <div className="row mb-5 pl-3 pr-3 p-sm-0">
                {children}
            </div>
        </section>
    </main>
);

export default AuthPage;

