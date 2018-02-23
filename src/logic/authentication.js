import React from 'react'
import { Fetch } from './fetch.js'
import MiniDeadPool from '../interface/minideadpool.js'

class Authentication extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
            connected: false
        }

        this.authorize = this.authorize.bind(this)
    }
    
    componentDidMount() {
        Fetch('GET', 'http://localhost:3000/api.homecomix')
            .then(response => {
                if (response.success) {
                    this.setState({ connected: true })
                }
            })
            .catch(err => { 
                console.log(err)
                this.setState({ connected: false })
             })
    }

    authorize(event, response) {
        if (response.success) {
            this.props.authenticate(event, response)
        }
    }
  
    render() {
        return  (
            <div className="auth-div">
                <section>
                    <blockquote className="whisper bubble">
                    {this.state.connected ?
                        <div>
                        Alright&nbsp;boyz&nbsp;gimme&nbsp;a&nbsp;hand...<br/>
                        Right&nbsp;for&nbsp;<span style={{color: '#ccc', fontSize: ' 2vw', fontStyle: 'italic', fontWeight: 'bold' }}>login</span>&nbsp;...and&nbsp;...&nbsp;?<br/>
                        Left&nbsp;for&nbsp;<span style={{color: '#ccc', fontSize: ' 2vw', fontStyle: 'italic', fontWeight: 'bold' }}>sign in</span>&nbsp; #?!?!©
                        </div>
                        :
                        <div>
                           Is the  &nbsp;
                            <a href="https://github.com/TommyStarK/HomeComix-API" style={{color: '#ccc', fontSize: ' 2vw', fontStyle: 'italic', fontWeight: 'bold', textDecoration: 'none' }}>
                                 HomeComix-API
                            </a> running mate ?
                        </div>
                    }
                    </blockquote>
                    <MiniDeadPool connected={this.state.connected} authorize={this.authorize}/>
                </section>
            </div>
        )
    }
  }
  
  export default Authentication;