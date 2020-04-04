import React, { Component, Fragment } from 'react'
import { ButtonGroup, Button } from 'reactstrap';

export class Counter extends Component {
    constructor(props) {
        super(props);
        this.state={
            count: 0,
        }
    }

    handleClick = (num) => {
        num ? this.setState({count: this.state.count + 1}) : this.setState({count: this.state.count - 1})
    }

    //getFreeSeats = (wingId) => {
    //    return this.state.film.wings[wingId].seats.filter(b => b.booked === false);
    //}

    render() {

        return (
            <Fragment>
                <label>{this.state.count}</label>
                <ButtonGroup>
                    <Button 
                    disabled={(this.state.count >= this.props.max) || (this.state.count >= 12)} 
                    onClick={() => this.handleClick(1)}
                    >
                        Add
                    </Button>
                    <Button 
                    disabled={this.state.count <= 0} 
                    onClick={() => this.handleClick(0)}
                    >
                        Remove
                    </Button>
                </ButtonGroup>
                <Button
                disabled={this.state.count < 1} 
                onClick={() => this.props.commit(this.state.count)}
                >
                    Confirm purchase
                </Button>
            </Fragment>
        );
    }
}