import React from 'react'
import { GET } from '../utils.js'

class Profil extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            books: []
        }
    }

    componentWillMount() {
        GET('http://localhost:3000/api.homecomix/books', this.props.token)
            .then(response => {
                console.log(response)
            })
            .catch(err => { console.log(err) })
    }
  
    render() {
      return  (
        <div>
          token: {this.props.token}
        </div>
      );
    }
  }
  
  export default Profil