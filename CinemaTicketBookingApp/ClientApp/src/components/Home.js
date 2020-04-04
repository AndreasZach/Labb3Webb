import React, { Component } from 'react';
import { FilmList } from './FilmList'

export class Home extends Component {
  static displayName = Home.name;

//setSelectedFilm = (film) =>  {
//  const newSelection = film;
//  this.setState({selectedFilm: newSelection})
//}

//
  render () {
    return (
        <FilmList />
    );
  }
}
