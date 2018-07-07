import React from 'react';
import './styles.css';

const Sidebar = ({ children, logout }) => (
    <nav className="d-none d-md-block col-md-4 col-lg-3 controls sidebar patterns bg-teal text-center"> 
        <h1 className="logo-medium text-flav pt-3">BAM!</h1> 
        <hr/>
        {children}
        <hr className="last"/>
        <button onClick={() => logout()} className="btn btn-logout">Logout</button>
    </nav>
);

export default Sidebar;
