import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Counter} from './Counter';
import FetchData from './FetchData';

export class Booking extends Component {
    static displayName = Booking.name;
    constructor(props){
        super(props);
        this.state={
            bookingError: null,
            bookingComplete: false,
        }
    }

    commitBooking = (ticketCount) => {
        const wingIndex = this.props.film.Wings.findIndex(w => w === this.props.selectedWing);
        const seats = this.props.film.Wings[wingIndex].Seats.filter(s => s.Booked === false).slice(0, ticketCount);
        const tickets = [].concat(seats.map(s => ({
            filmTitle: this.props.film.Title,
            filmTime: this.props.film.ScreenDateTime,
            wingName: this.props.film.Wings[wingIndex].WingAreaName,
            seatId: s.Id,
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
                this.setState({bookingError: result.error, bookingComplete: true})
        })
        .then(() => {
            if(!this.state.bookingError)
                FetchData.UpdateFilmItem(filmChanges)
                .then(this.setState({bookingComplete:true}));
        });
    }

    render() {
        return (
            <Modal className="align-items-center text-center" centered={true} isOpen={this.props.setOpen}>
                <ModalHeader>
                    {
                    (!this.state.bookingComplete) ? 
                    <p>How many tickets do you wish to purchase?</p> :
                    (!this.state.bookingError && this.state.bookingComplete) ?
                        <p>Successfully booked your tickets!</p> :
                        <p>Could not book tickets due to the following error: {this.state.bookingError} </p>}
                </ModalHeader>
                <ModalBody>
                    {!this.state.bookingComplete ?
                    <Counter 
                    commit={this.commitBooking} 
                    max={this.props.selectedWing.FreeSeats} /> : 
                        null
                }
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={
                        !this.state.bookingComplete ? 
                        this.props.closeModal : 
                        this.props.requestUpdate} block>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}