import React from 'react'
import logo from '../static/wolwerine.jpg'


class NotFound extends React.Component {
  render() {
  return  <div>
            <h2>404&nbsp;Not&nbsp;Found</h2>
            <img className="nobook" src={logo} alt="loading"/>
          </div>;
  }
}

export default NotFound;