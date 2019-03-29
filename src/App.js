import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ExchangeRates from './ExchangeRates';
import MenuBar from "./MenuBar"
import Footer from "./footer"

import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
      <Router>
        <MenuBar/>
        <Container className="App">
        
        </Container>
        <Route exact path="/" component={ExchangeRates} />
        <Route path="/dashboard" exact component={ExchangeRates} />
        <Footer/>
      </Router>

    </div>
      );
  }
}

export default App;
