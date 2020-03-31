import React, { Component } from 'react';
import {Container} from 'reactstrap';
import { FilmList } from './FilmList'

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      selectedFilm: null,
    }
}

setSelectedFilm(film) {
  this.setState({selectedFilm: film})
}

//
  render () {
    return (
      <Container className="themed-container" fluid={true}>
        <header>Welcome to Berras Bio!</header>
        {if()<FilmList />}
        <footer>Something something Copyright</footer>
      </Container>
    );
  }
}
