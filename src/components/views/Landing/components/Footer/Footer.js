import React from 'react';
import './styles.css';

class Footer extends React.Component {
    render() {
        return (
            <footer className="container-fluid bg-teal patterns text-center p-5">
                <div className="row">
                    <div className="col-10 offset-1 col-md-4 offset-md-4">
                        <p className="pt-4"> Andela Book-A-Meal </p>
                        <p className="pb-4"> Made With &lt;3 By Edward Njoroge </p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
