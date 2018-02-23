import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

export default class Header extends React.Component {
    render() {
    return <header className="App-header">
                <p className="App-title">
                    <Link to="/" style={{ color: '#FFF', textDecoration: 'none' }}>HomeComix</Link>
                </p>
            </header>
    }
}