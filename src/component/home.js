import React from 'react'
import Authentication from '../logic/authentication.js'
import Library from '../logic/library.js';
import UploadBookDialog from '../interface/uploadBookDialog.js'

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
        {this.state.authenticated 
            ?
          <div>
            <UploadBookDialog token={this.state.token}/>
            <Library token={this.state.token}/>
          </div> 
            :
           <Authentication authenticate={this.authenticate}/>
        }
      </div>
    );
  }
}

export default Home;