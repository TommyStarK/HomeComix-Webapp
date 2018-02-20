import React from 'react';
import { GET, POST } from '../utils.js'

// LOGIN
class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
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
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
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

// Signin
class SigninForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ''}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const data = new FormData(event.target)
        const payload = {
            username: data.get('username'),
            password: data.get('password'),
            email: data.get('email')
        }
        
        POST('http://localhost:3000/api.homecomix/register', payload)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log("ERROR")
                console.log(err)
            })
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

// Authentication
class Authentication extends React.Component {
        constructor(props, context) {
            super(props, context);
        
            this.state = {
                title: "",
                showButtons: true,
                authenticated: false,
                showLoginForm: false,
                showSigninForm: false
            };
    }
    
    componentWillMount() {
        GET('http://localhost:3000/api.homecomix')
            .then(response => {
                this.setState({
                    title: response.message
                })
            })
            .catch(err => {
                console.log("ERROR")
                console.log(err)
            })
    }

    showLoginForm() {
        this.setState({
            showButtons: false,
            showLoginForm: true,
            showSigninForm: false
         })
    }

    showSigninForm() {
        this.setState({
            showButtons: false,
            showLoginForm: false,
            showSigninForm: true 
        })
    }

    back() {
        this.setState({
            showButtons: true,
            authenticated: false,
            showLoginForm: false,
            showSigninForm: false
        })
    }
  
    render() {
        const style = {
            'display': this.state.showButtons ? delete this.display : 'none'
        }

        return  (
            <div>
                <h2>{this.state.title}</h2>
                <button style={style} onClick={this.showLoginForm.bind(this)}>login</button>
                <button style={style} onClick={this.showSigninForm.bind(this)}>signin</button>
                <button onClick={this.back.bind(this)}>back</button>
                {this.state.showLoginForm && <LoginForm />}
                {this.state.showSigninForm && <SigninForm />}
            </div>
        );
    }
  }
  
  export default Authentication;