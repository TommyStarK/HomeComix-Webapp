import React from 'react';
import { POST } from '../utils.js'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.target)
        const payload = {
            username: data.get('username'),
            password: data.get('password')
        }
        
        POST('http://localhost:3000/api.homecomix/authorize', payload)
            .then(response => { this.props.authorize(event, response) })
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
                <input type="submit" value="Submit" />
            </form>
        </div>
      )
    }
  }

export default LoginForm