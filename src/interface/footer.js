import React from 'react';
import { Link } from 'react-router-dom'
import logo from '../static/logo.svg';
import '../App.css';

export default class Footer extends React.Component {
    render() {
    return <footer className="App-footer">
                <div className="App-footer-div">
                    <a href="https://reactjs.org/" style={{ display: 'flex', flexDirection: 'row', color: '#FFF', textDecoration: 'none' }}>
                        Build with <img src={logo} className="App-logo-react" alt="logo" />
                    </a>
                    <span className="App-footer-span-about">
                        <Link to="/about" style={{ color: '#FFF', textDecoration: 'none' }}>About</Link>
                    </span>
                </div>
            </footer>;
    }
}