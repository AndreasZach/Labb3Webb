import React, { Component, Fragment } from 'react';
import { FilmList } from './FilmList'
import { Header } from './Header';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <Fragment>
        <Header />
        <FilmList />
      </Fragment>
    );
  }
}
