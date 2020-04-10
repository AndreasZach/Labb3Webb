import React, { Component } from 'react';
import { Button } from 'reactstrap';

export class FilmItemButton extends Component {
    render(){
        return (
            <Button className="m-1"
                disabled={this.props.wing.FreeSeats < 1}
                color="success"
                onClick={() => this.props.onClickCallback(this.props.wing)}>
                    { 
                    this.props.wing.FreeSeats > 1 ? 
                    'Book tickets in ' + this.props.wing.WingAreaName :
                    'Fully Booked'
                    }
            </Button>
        );
    }
}