import React from 'react';
import { GET } from '../utils.js'

class Profil extends React.Component {
    constructor(props, context) {
      super(props, context)

      this.state = {
          books: []
      }
    }

    componentWillMount() {
        GET('http://localhost:3000/api.homecomix/books', '')
            .then(response => {
                this.setState({
                    books: response.books
                })
            })
            .catch(err => {
                console.log("ERROR")
                console.log(err)
            })
    }
  
    componentDidMount() {
      console.log("Profil")
    }
  
    render() {
      return  (
        <div>
          Profil
          {this.state.books}
        </div>
      );
    }
  }
  
  export default Profil