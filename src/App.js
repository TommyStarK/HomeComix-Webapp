import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Footer } from './ui.js'
import About from './routes/about.js'
import Home from './routes/home.js'
import NotFound from './routes/notfound.js'


const HomeComix = () => (
  <Router>
    <div className="App">
     
      <Header />
      
      <section className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </section>
      
      <Footer />
      
    </div>
  </Router>
);

export default HomeComix;
