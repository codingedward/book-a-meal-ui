import React from 'react';
import './styles.css';

class Sidebar extends React.Component {

    logout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <nav className="d-none d-md-block col-md-4 col-lg-3 controls sidebar patterns bg-teal text-center"> 
                <h1 className="logo-medium text-flav pt-3">BAM!</h1> 
                <hr/>
                {this.props.children}
                <hr className="last"/>
                <button onClick={this.logout} className="btn btn-logout">Logout</button>
            </nav>
        );
    };
}

export default Sidebar;
