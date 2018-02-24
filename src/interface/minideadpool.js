import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'
import { Fetch } from '../logic/fetch.js'

export default class MiniDeadPool extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            success: false,
            login: false,
            signin: false,
            messageLogin: '',
            messageSignin: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignin = this.handleSignin.bind(this)
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this)
        this.handleSubmitSignin = this.handleSubmitSignin.bind(this)
        this.handleCloseLogin = this.handleCloseLogin.bind(this)
        this.handleCloseSignin = this.handleCloseSignin.bind(this)
    }

    handleLogin() {
        if (this.props.connected) {
            this.setState({ login : true })
        }
    }

    handleCloseLogin()  {
        if (this.props.connected) {
            this.setState({ login: false })
        }
    }

    handleSignin() {
        if (this.props.connected) {
            this.setState({ signin : true })
        }
    }

    handleCloseSignin()  {
        if (this.props.connected) {
            this.setState({ signin: false })
        }
    }

    handleSubmitLogin(event, data) {
        if (data === undefined) {
            return 
        } 

        if (this.props.connected) {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
            Fetch('POST', 'http://localhost:3000/api.homecomix/authorize', headers, data)
                .then(response => {
                    this.props.authorize(event, response)
                    this.setState({ messageLogin: response.message, success: false })
                 })
                .catch(err => { console.log(err) })
        }  
    }

    handleSubmitSignin(event, data) {
        if (data === undefined) {
            return
        } 

        if (this.props.connected) {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }

            Fetch('POST', 'http://localhost:3000/api.homecomix/register', headers, data)
                .then(response => { 
                    if (response.success) {
                        this.setState({
                            success: true,
                            signin: false,
                            login: true,
                            messageLogin: response.message
                        })
                    } else {
                        this.setState({ messageSignin: response.message }) 
                    }
                })
                .catch(err => { console.log(err) })
        }
    }

    render() {
        const actionsLogin = [
            <FlatButton
                key="closelogin"
                label="Cancel"
                primary={true}
                onClick={this.handleCloseLogin}
            />,
            <FlatButton
                key="submitlogin"
                type="submit"
                label="Submit"
                primary={true}
                onClick={this.handleSubmitLogin}
            />
          ]

        const actionsSignin = [
            <FlatButton
                key="closesignin"
                label="Cancel"
                primary={true}
                onClick={this.handleCloseSignin}
            />,
            <FlatButton
                key="submitsignin"
                type="submit"
                label="Submit"
                primary={true}
                onClick={this.handleSubmitSignin}
            />
          ]
        
          const style = {
              color: this.state.success ? 'green' : 'red'
          }

        return(
            <div className="body-container">
                <Dialog
                    title="Login"
                    modal={false}
                    open={this.state.login}
                    onRequestClose={this.handleCloseLogin}
                    autoScrollBodyContent={true}
                    >
                    <form action="/" method="POST" onSubmit={(e) => { 
                                e.preventDefault()
                                const form = new FormData(e.target)
                                const data = {
                                    username: form.get('username'),
                                    password: form.get('password')
                                }
                                this.handleSubmitLogin(e, data)
                            }}>
                        <label>
                            Username:&nbsp;
                            <input type="text" name="username" required/>
                        </label>
                        <label>
                            &nbsp;Password:&nbsp;
                            <input type="password" name="password" required/>
                        </label>
                        <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                            {actionsLogin}
                        </div>
                    </form>
                    <span style={style}>
                        {this.state.messageLogin}
                    </span>
                </Dialog>
                <Dialog
                    title="Sign in"
                    modal={false}
                    open={this.state.signin}
                    onRequestClose={this.handleCloseSignin}
                    autoScrollBodyContent={true}
                    >
                    <form action="/" method="POST" onSubmit={(e) => { 
                                e.preventDefault()
                                const form = new FormData(e.target)
                                const data = {
                                    username: form.get('username'),
                                    email: form.get('email'),
                                    password: form.get('password')
                                }
                                this.handleSubmitSignin(e, data)
                            }}>
                        <label>
                            Username:&nbsp;
                            <input type="text" name="username" required/>
                        </label>
                        <label>
                            &nbsp;Password:&nbsp;
                            <input type="password" name="password" required/>
                        </label>
                        <label>
                            &nbsp;Email:&nbsp;
                            <input type="email" name="email" required/>
                        </label>
                        <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                            {actionsSignin}
                        </div>
                    </form>
                    <span>
                        {this.state.messageSignin}
                    </span>
                </Dialog>
                <div className="sword-container">
                    <div className="sword left-sword">
                        <div className="cross-guard"></div>
                    </div>
                    <div className="sword right-sword">
                        <div className="cross-guard"></div>
                    </div>
                </div>
                <div className="mask-shadow">
                    <div className="mask">
                        <div className="mask-shine-01"></div>
                        <div className="mask-shine-02"></div>
                        <div className="eyes left-eye">
                            <div className="left-eye-pupil"></div>
                        </div>
                        <div className="eyes right-eye">
                            <div className="right-eye-pupil"></div>
                        </div>
                    </div>
                </div>
                <div className="body-shadow">
                    <div className="body-top">
                        <div className="pecs left-pec"></div>
                        <div className="pecs right-pec"></div>
                        <div className="upper-body"></div>
                        <div className="belt">
                            <div className="ammo-thing ammo-01"></div>
                            <div className="ammo-thing ammo-02"></div>
                            <div className="outer-belt-buckle">
                                <div className="inner-belt-buckle">
                                    <div className="line-belt"></div>
                                </div>
                            </div>
                            <div className="ammo-thing ammo-03"></div>
                            <div className="ammo-thing ammo-04"></div>
                        </div>
                    </div>
                </div>
                <div className="hands-container">
                    <div className="hands-shadow ">
                        <div className="hand left-hand" style={{cursor: this.props.connected ? 'pointer': 'unset'}} onClick={this.handleSignin}>
                            <div className="hand-shine"></div>
                            <div className="hand-small-shine"></div>
                        </div>
                    </div>
                    <div className="hands-shadow hands-shadow-right">
                        <div className="hand right-hand" style={{cursor: this.props.connected ? 'pointer': 'unset'}} onClick={this.handleLogin}>
                            <div className="hand-shine"></div>
                            <div className="hand-small-shine"></div>
                        </div>
                    </div>
                </div>
                <div className="body-ground-shadow"></div>
            </div>
        )
    }
}