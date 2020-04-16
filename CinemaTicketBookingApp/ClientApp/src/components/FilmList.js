import React, { Component } from 'react';
import {Container, Button} from 'reactstrap';
import { FilmItem } from './FilmItem';
import FetchData from './FetchData';

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
        error: "",
      }
    }

    componentDidMount() {
        if(!this.state.isLoaded)
            this.requestUpdateData()
    }

    sortFilms = (sortBy) => {
        this.setState({isLoaded: false});
        let sortedFilms = [];
        if(sortBy === 'seats'){
            sortedFilms = [].concat(this.state.films)
            .sort((a,b) => (b.Wings[0].FreeSeats + b.Wings[1].FreeSeats) - (a.Wings[0].FreeSeats + a.Wings[1].FreeSeats))
            .map(item => item)
        }
        if(sortBy === 'time') {
            sortedFilms = [].concat(this.state.films)
            .sort((a,b) => new Date(b.ScreenDateTime) - new Date(a.ScreenDateTime))
            .map(item => item)
        }
        this.setState({
            orderBySeats: !this.state.orderBySeats,
            orderByTime: !this.state.orderByTime,
            films: sortedFilms,
            isLoaded: true
        })
    }

    requestUpdateData = () => {
        this.setState({isLoaded: false});
        FetchData.GetFilmItems().then((data) => {
            if (data.error) {
                this.setState({error: data.error, isLoaded: true})
            }
            else{
                this.setState({films: data ? [].concat(data) : [], isLoaded: true});
            }
        });
    }

    render () {
        return (
            <Container className="themed-container align-items-center text-center" fluid={true}>
                <h5 className="color--pale">Order by:</h5>
                <Button className="m-1" color="primary" disabled={this.state.orderBySeats} onClick={() => this.sortFilms('seats')}>
                Available Seats
                </Button>
                <Button className="m-1" color="primary" disabled={this.state.orderByTime} onClick={() => this.sortFilms('time')}>
                Screening Time
                </Button>
                {!this.state.isLoaded ?
                <p className="color--pale">Loading...</p> :
                    !this.state.error ?
                    this.state.films.map((item, i) => 
                        {
                            return (<FilmItem key={i} 
                                film={item} 
                                requestUpdate={this.requestUpdateData} 
                                fullyBooked = {(item.Wings[0].FreeSeats + item.Wings[1].FreeSeats) < 1}
                                />);
                        }) :
                    <p className="text-danger">{this.state.error}</p>
                }
            </Container>
        );
    }
}