import React, { Component } from 'react';
import {Container, Button} from 'reactstrap';
import { FilmItem } from './FilmItem';

export class FilmList extends Component {
    static displayName = FilmList.name;
    constructor(props) {
      super(props);
      this.state = 
      {
        orderBySeats: false,
        orderByTime: true,
        isLoaded: false,
        films: [],
      }
    }

    componentDidMount() {
        this.fetchFilms()
        if(this.state.isLoaded) {
            this.orderContent()
        }
    }
    
    fetchFilms = () => {
      if(!this.state.isLoaded){
        fetch('api/films')
        .then(response => response.json())
        .then(
        (result) => 
        {
          result.forEach(item => 
            { 
                item.freeSeats =
                (item.wings[0].seats.filter(s => s.booked === false).length) + 
                (item.wings[1].seats.filter(s => s.booked === false).length)
            })
            result.sort((a,b) => new Date(a.screenDateTime) - new Date(b.screenDateTime));
          this.setState({films: result, isLoaded: true}) 
        })
      }
    }
    
    content = () => {
        return (
        !this.state.isLoaded ?  <p>Loading...</p> 
        : this.state.films.map(item => 
        {
            return <FilmItem film={item} />
        }));
    }

    sortBySeats = () => {
        let orderBySeats = !this.state.orderBySeats;
        let orderByTime = !this.state.orderByTime;
        const sortedFilms = [].concat(this.state.films)
            .sort((a,b) => b.freeSeats - a.freeSeats)
            .map(item => item);
        this.setState({
            orderBySeats: orderBySeats,
            orderByTime: orderByTime,
            films: sortedFilms,
        })
        
    }

    sortByTime = () => {
        let orderBySeats = !this.state.orderBySeats;
        let orderByTime = !this.state.orderByTime;
        const sortedFilms = [].concat(this.state.films)
            .sort((a,b) => new Date(a.screenDateTime) - new Date(b.screenDateTime))
            .map(item => item);
        
            this.setState({
            orderBySeats: orderBySeats,
            orderByTime: orderByTime,
            films: sortedFilms,
        })
    }

    render () {
        return (
            <Container className="themed-container" fluid={true}>
                <h4>Order by:</h4>
                <Button color="primary" disabled={this.state.orderByTime} onClick={this.sortByTime}>
                Screening Time
                </Button>
                <Button color="primary" disabled={this.state.orderBySeats} onClick={this.sortBySeats}>
                Available Seats
                </Button>
                {this.content()}
            </Container>
        );
    }
}