import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { FilmItem } from './FilmItem';

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = 
    {
      isLoaded: false,
      films: [],
    }
}

  componentDidMount() {
    this.fetchFilms() 
  }

  fetchFilms = () => {
    if(!this.state.isLoaded){
    
      fetch('api/films')
      .then(response => response.json())
      .then(
      (result) => 
      {
        this.setState({films: result, isLoaded: true}) 
      })
    }
  }

  content = () => {
    return !this.state.isLoaded ?  <p>Loading...</p> 
    : this.state.films.map(item => 
      {
        return <FilmItem film={item} />
      });
  }

  render () {
    return (
      <Container className="themed-container" fluid={true}>
        <header>Welcome to Berras Bio!</header>
        {this.content()}
        <footer>Something something Copyright</footer>
      </Container>
    );
  }
}
