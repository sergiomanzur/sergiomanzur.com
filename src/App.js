import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {Helmet} from "react-helmet";
import Footer from "./components/Footer/Footer";
import Homepage from "./containers/Homepage/Homepage";
import Post from "./containers/Post/Post";
import Category from "./containers/Category/Category";
import TopBar from "./components/TopBar/TopBar";
import Contact from "./components/Contact/Contact";
import axios from "axios";
import NoMatch from "./components/NoMatch/NoMatch";


class App extends Component {


    state = {
        categories: []
    }

    componentDidMount() {
        axios.get('http://www.dev.sergiomanzur.com/api/categories/')
            .then(res => {
                //console.log(res.data);
                this.setState({categories:res.data})
            })
    }

    render() {

    const categories = this.state.categories;

    return(
        <Router>
            <Helmet>
                <meta charSet="utf-8" />
                <title>El Blog de Sergio Manzur</title>
                <meta name="description" content="En el blog de Sergio Manzur encontrarás artículos de interés general
                en su mayoría enfocados hacia tecnología, programación, películas y Chivas" />
                <link rel="canonical" href="http://sergiomanzur.com/" />
            </Helmet>
          <TopBar categories={categories}/>
          <Switch>
            <Route exact path="/" component={Homepage}/>
              <Route exact path="/contacto" component={Contact}/>
              <Route path="/blog/:slug" component={Post}/>
              <Route path="/categorias/:slug" component={Category}/>
              <Route component={NoMatch} status={404}/>
          </Switch>
            <br/>
          <Footer categories={categories}/>
        </Router>
    );
  }
}

export default App;
