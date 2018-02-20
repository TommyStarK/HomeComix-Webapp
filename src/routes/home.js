import React from 'react';
import Profil from '../components/profil.js'
import Authentication from '../components/authentication.js'

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      authenticated: false,
    };
  }

  render() {
    return (
      <div>
        {this.state.authenticated ?
           <Profil /> :
           <Authentication />
        }
      </div>
    );
  }
}

export default Home;