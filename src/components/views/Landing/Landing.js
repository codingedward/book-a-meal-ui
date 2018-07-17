import React from 'react';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import './styles.css';

class Landing extends React.Component {
  render() {
    return (
        <div  style={{backgroundColor: 'white'}}>
            <Header />
            <Body />
            <Footer />
        </div>
    );
  }
}

export default Landing;
