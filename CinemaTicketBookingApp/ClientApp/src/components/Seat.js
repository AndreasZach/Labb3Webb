import React, {Component} from 'react'
import { Button } from 'reactstrap';

export class Seat extends Component {
    static displayName = Seat.name;
    
    render() {
        return (
            
                <Button
                className="seatBtn m-1"
                size="sm"
                disabled={this.props.seat.Booked}
                active={this.props.selectedSeats.includes(this.props.seat)}
                color={ this.props.seat.Booked ? "danger" : "primary" }
                onClick={() => this.props.updateSelected(this.props.seat)}>
                    {this.props.seat.SeatNumber}
                </Button>
        );
    }
}