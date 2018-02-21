import React from 'react'
import { GET } from '../utils.js'
import LoginForm from '../elements/loginForm.js'
import SigninForm from '../elements/signinForm.js'

class Authentication extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
            title: '',
            message: '',
            back: false,
            buttons: true,
            authorize: false,
            register: false
        };

        this.register = this.register.bind(this)
        this.authorize = this.authorize.bind(this)
    }
    
    componentWillMount() {
        GET('http://localhost:3000/api.homecomix')
            .then(response => {
                this.setState({
                    title: response.message
                })
            })
            .catch(err => { console.log(err) })
    }

    showLoginForm() {
        this.setState({
            back: true,
            buttons: false,
            authorize: true,
            register: false
         })
    }

    showSigninForm() {
        this.setState({
            back: true,
            buttons: false,
            authorize: false,
            register: true
        })
    }

    back() {
        this.setState({
            back: false,
            message: '',
            buttons: true,
            authorize: false,
            register: false
        })
    }

    register(event, response) {
        this.setState({
            buttons: false,
            register: true,
            authorize: false,
            message: response.message
        })
        if (response.success) {
            this.setState({
                authorize: true,
                register: false
            })
        } 
    }

    authorize(event, response) {
        if (response.success) {
            this.props.authenticate(event, response)
        } else {
            this.setState({
                buttons: false,
                register: false,
                authorize: true,
                message: response.message
           })
       }
    }
  
    render() {
        const style = {
            'display': this.state.buttons ? delete this.display : 'none'
        }

        return  (
            <div>
                <h2>{this.state.title}</h2>
                <button style={style} onClick={this.showLoginForm.bind(this)}>login</button>
                <button style={style} onClick={this.showSigninForm.bind(this)}>signin</button>
                {this.state.back && <button onClick={this.back.bind(this)}>back</button>}
                {this.state.authorize && <LoginForm authorize={this.authorize}/>}
                {this.state.register && <SigninForm register={this.register} />}
                {this.state.message !== '' && <p>{this.state.message}</p>}
            </div>
        );
    }
  }
  
  export default Authentication;