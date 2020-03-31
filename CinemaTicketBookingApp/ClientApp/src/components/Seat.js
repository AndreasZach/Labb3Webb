import React, {PureComponent} from 'react'

export class Seat extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            seat: this.props.seat,
            selected: false,
        }
    }

    setColor = () => {
        if(this.state.selected) {
            return "green";
        }
        else {
            return this.state.seat.booked ? "red" : "blue";
        }
    }

    render() {
        return (
            <div color={this.setColor()} className="p-5">
                Seat-Number: {this.state.seat.seatNumber}
            </div>
        );
    }
}