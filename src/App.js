import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer } from './ui.js'
import About from './routes/about.js'
import Home from './routes/home.js'
import NotFound from './routes/notfound.js'


class HomeComix extends React.Component {

  constructor(props) {
	super(props)
	this.state = { logged: false }
	this.log = this.log.bind(this)
  }

  log(event) {
	  console.log('#### DEBUG ###')
	//   this.setState({ logged: true })
  }
  
  render() {
    return (
      <Router>
        <div className="App">
        
          <Header />
          
          <section className="container">
            <Switch>
              <Route exact path="/" component={() => <Home log={this.log}/>}/>
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </section>
          
          <Footer />
          
        </div>
      </Router>
    )
  }
}

export default HomeComix;
