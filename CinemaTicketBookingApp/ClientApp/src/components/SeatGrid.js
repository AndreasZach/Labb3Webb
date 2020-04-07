import React, { Component, Fragment } from 'react';
import { Button } from 'reactstrap';
import { Seat } from './Seat';

export class SeatGrid extends Component {
    static displayName = SeatGrid.name;
    constructor(props){
        super(props);
        this.state={
            selectedSeats: [],
        }
    }

    onSeatClick = (selected) => {
        const index = this.state.selectedSeats.indexOf(selected);
        let updatedSeats = new Array(...this.state.selectedSeats)
        if (index < 0) {
            updatedSeats.push(selected);
            
        } 
        else {
            updatedSeats.splice(index, 1);
        }
        
        this.setState({selectedSeats: updatedSeats});
    }

    render() {
        return(
            <Fragment>
                    {this.props.selectedWing.Seats.map( (seatItem, i) => {
                        return (
                            <Seat key={i} seat={seatItem} updateSelected={this.onSeatClick} 
                            selectedSeats={this.state.selectedSeats}/>
                        );
                    })}
            <Button
                color="success"
                disabled={this.state.selectedSeats.length > 12 ||
                    this.state.selectedSeats.length > this.props.selectedWing.FreeSeats} 
                onClick={() => this.props.commitBooking(this.state.selectedSeats)}
                block>
                    {this.state.selectedSeats.length <= 12 ? 'Confirm purchase' : 'Can only book 12 seats at once.'}
                </Button>
            </Fragment>
        );
    }
}