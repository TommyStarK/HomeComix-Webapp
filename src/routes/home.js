import React from 'react'
import Profil from '../components/profil.js'
import Authentication from '../components/authentication.js'

class Home extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      token: '',
      authenticated: false
    }

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate(event, response) {
    if (response.success) {
      this.setState({
        token: response.token,
        authenticated: response.success
      })
      this.props.log(event)
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(Props) {
    console.log(Props)
  }

  componentWillUpdate() {

  }

  shouldComponentUpdate() {
    return this.state.authenticated
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        {this.state.authenticated ?
           <Profil token={this.state.token}/> :
           <Authentication authenticate={this.authenticate}/>
        }
      </div>
    );
  }
}

export default Home;