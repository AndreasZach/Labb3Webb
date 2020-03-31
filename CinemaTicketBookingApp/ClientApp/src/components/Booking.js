import React, { PureComponent } from 'react';
import {Container, Col, Row, Button} from 'reactstrap';
import { Seat } from './Seat';

export class Booking extends PureComponent {
    static displayName = Booking.name;

    constructor(props) {
        super(props);
        this.state = {
            film: props.location.state,
        }
    }

    gridContent = (id) => {
        return (
            this.state.wing[id].seats.forEach(seatElement => {
                return (<Seat seat={seatElement} />)
            })
        );
    }

    sideBar = () => {
        //return (
        //    
        //    this.state.wing.seats.forEach(seatElement =>
        //))
    }

    render() {
        return (
            <Container>
                {this.gridContent()}
                {/*this.sideBar()*/}
            </Container>
        );
    }
}