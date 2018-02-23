import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './interface/header.js'
import Footer from './interface/footer.js'
import About from './component/about.js'
import Home from './component/home.js'
import NotFound from './component/notfound.js'


class HomeComix extends React.Component {

  constructor(props) {
	super(props)
	this.state = { logged: false }
	this.log = this.log.bind(this)
  }

  log(event) {
	//   this.setState({ logged: true })
  }
  
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
          
            <Header />
            
            <div className="container">
              <Switch>
                <Route exact path="/" component={() => <Home log={this.log}/>}/>
                <Route path="/about" component={About} />
                <Route component={NotFound} />
              </Switch>
            </div>
            
            <Footer />
          
          </div>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default HomeComix;
