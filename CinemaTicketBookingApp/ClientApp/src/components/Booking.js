import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container} from 'reactstrap';
import FetchData from './FetchData';
import { SeatGrid } from './SeatGrid'

export class Booking extends Component {
    static displayName = Booking.name;
    constructor(props){
        super(props);
        this.state={
            bookingError: null,
            bookingComplete: false,
        }
    }

    commitBooking = (seats) => {
        const wingIndex = this.props.film.Wings.findIndex(w => w === this.props.selectedWing);
        const tickets = [].concat(seats.map(s => ({
            filmTitle: this.props.film.Title,
            filmId: this.props.film.Id,
            filmTime: this.props.film.ScreenDateTime,
            wingName: this.props.film.Wings[wingIndex].WingAreaName,
            seatNumber: s.SeatNumber,
        })));
        
        const filmChanges = this.props.film;
        let foundIndex;
        seats.forEach(seat => {
           foundIndex = filmChanges.Wings[wingIndex].Seats.findIndex(x => x.Id === seat.Id);
           filmChanges.Wings[wingIndex].Seats[foundIndex].Booked = true;
        });
        
        let bookingResult = FetchData.PostBookingDetails(tickets);
        bookingResult.then((result) => {
            if(result.error)
                this.setState({bookingError: result.error, bookingComplete: true});
        })
        .then(() => {
            if(!this.state.bookingError)
                FetchData.UpdateFilmItem(filmChanges)
                .then((result) => {
                    if(result.error)
                        this.setState({bookingError: result.error, bookingComplete: true});
                    this.setState({bookingComplete:true})
                });
        });
    }

    render() {
        return (
            <Modal className="align-items-center text-center" centered={true} isOpen={this.props.setOpen}>
                <Container className="themed-container" fluid={true}>
                    <ModalHeader>
                        {
                        (!this.state.bookingComplete) ? 
                        <p>Select the seats you wish to book (Maximum of 12 per order).</p> :
                        (!this.state.bookingError && this.state.bookingComplete) ?
                            <p>Successfully booked your tickets!</p> :
                            <p>Could not book tickets due to the following error: {this.state.bookingError} </p>}
                    </ModalHeader>
                    <ModalBody>
                        {!this.state.bookingComplete ?
                        <SeatGrid selectedWing={this.props.selectedWing} commitBooking={this.commitBooking}/> : 
                            null
                    }
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={
                            !this.state.bookingComplete ? 
                            this.props.closeModal : 
                            this.props.requestUpdate} block>
                                Close
                        </Button>
                    </ModalFooter>
                </Container>
            </Modal>
        );
    }
}