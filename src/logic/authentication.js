import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Fetch } from './fetch.js'
import LoginForm from '../interface/loginForm.js'
import SigninForm from '../interface/signinForm.js'
import BatmanLogo from '../interface/batmanLogo.js'

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
    
    componentDidMount() {
        Fetch('GET', 'http://localhost:3000/api.homecomix')
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
            <div className="auth-div">
                <h4>{this.state.title}</h4>
                <div className="batmanLogo">
                    <BatmanLogo />
                </div>
                <div className="auth-form">
                    <button className="auth-btn" style={style} onClick={this.showLoginForm.bind(this)}>Login</button>
                    <button className="auth-btn" style={style} onClick={this.showSigninForm.bind(this)}>Register</button>
                    {this.state.authorize && <LoginForm authorize={this.authorize}/>}
                    {this.state.register && <SigninForm register={this.register} />}
                    {this.state.message !== '' && <p>{this.state.message}</p>}
                    {this.state.back && <RaisedButton label="Back" onClick={this.back.bind(this)}/>}
                </div>
            </div>
        )
    }
  }
  
  export default Authentication;