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
        if(!this.state.isLoaded)
            this.requestUpdateData()
    }
    
    fetchFilms = () => {
        this.setState({isLoaded: false});
        fetch('api/films')
        .then(response => response.json())
        .then(
        (result) => 
        {
          result.forEach(item => 
            { 
                return (
                item.Wings.forEach(w => {
                    return w.FreeSeats = w.Seats.filter(s => s.Booked === false).length;
                }));
            })
            result.sort((a,b) => new Date(a.ScreenDateTime) - new Date(b.ScreenDateTime));
            this.setState({films: [].concat(result), isLoaded: true})
        })
      }

    sortBySeats = () => {
        this.setState({isLoaded: false});
        let orderBySeats = !this.state.orderBySeats;
        let orderByTime = !this.state.orderByTime;
        const sortedFilms = [].concat(this.state.films)
            .sort((a,b) => (b.Wings[0].FreeSeats + b.Wings[1].FreeSeats) - (a.Wings[0].FreeSeats + a.Wings[1].FreeSeats))
            .map(item => item);
        this.setState({
            orderBySeats: orderBySeats,
            orderByTime: orderByTime,
            films: sortedFilms,
            isLoaded: true
        })
        
    }

    sortByTime = () => {
        this.setState({isLoaded: false});
        let orderBySeats = !this.state.orderBySeats;
        let orderByTime = !this.state.orderByTime;
        const sortedFilms = [].concat(this.state.films)
            .sort((a,b) => new Date(a.ScreenDateTime) - new Date(b.ScreenDateTime))
            .map(item => item);
        
            this.setState({
            orderBySeats: orderBySeats,
            orderByTime: orderByTime,
            films: sortedFilms,
            isLoaded: true
        })
    }

    requestUpdateData = () => {
        this.fetchFilms();
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
                {!this.state.isLoaded ?  <p>Loading...</p> 
                : this.state.films.map((item, i) => 
                {
                    return <FilmItem key={i} film={item} requestUpdate={this.requestUpdateData} />
                })}
            </Container>
        );
    }
}