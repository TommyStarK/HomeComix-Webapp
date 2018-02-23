import React from 'react';
import { Fetch } from '../logic/fetch.js'

class SigninForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.target)
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        const payload = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email')
        }
        
        Fetch('POST', 'http://localhost:3000/api.homecomix/register', headers, payload)
            .then(response => { this.props.register(event, response) })
            .catch(err => { console.log(err) })        
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username"/>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password"/>
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email"/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default SigninForm