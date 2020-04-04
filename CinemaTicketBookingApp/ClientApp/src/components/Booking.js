import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Counter} from './Counter';

export class Booking extends Component {
    static displayName = Booking.name;
    constructor(props){
        super(props);
        this.state={
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

        fetch('api/films', {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: (JSON.stringify({
                Id: filmChanges.Id, 
                ScreenDateTime: filmChanges.ScreenDateTime,
                Title: filmChanges.Title,
                Price: filmChanges.Price,
                ImdbImgUrl: filmChanges.ImdbImgUrl,
                Summary: filmChanges.Summary,
                Wings: filmChanges.Wings
            }))})
            .then(resp => resp);

          fetch('api/bookingdetails', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({tickets})
          })
          .then(resp => resp.json())
          .then(
              this.setState({bookingComplete: true}),
            );
    }

    render() {
        return (
            <Modal isOpen={this.props.setOpen}>
                <ModalHeader>
                    {!this.state.bookingComplete ? 
                    <p>How many tickets do you wish to purchase?</p> :
                    <p>Successfully booked your tickets!</p>}
                </ModalHeader>
                <ModalBody>
                    {!this.state.bookingComplete ?
                    <Counter 
                    commit={this.commitBooking} 
                    max={this.props.selectedWing.FreeSeats} /> : 
                        null
                }
                    <Button onClick={
                        !this.state.bookingComplete ? 
                        this.props.closeModal : 
                        this.props.requestUpdate}>Close</Button>
                </ModalBody>
            </Modal>
        );
    }
}