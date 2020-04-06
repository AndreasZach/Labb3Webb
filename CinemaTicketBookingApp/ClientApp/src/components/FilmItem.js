import React, { Component, Fragment} from 'react';
import { Collapse, Button, Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import { Booking } from './Booking';
import './FilmItem.css'

export class FilmItem extends Component {
    static displayName = FilmItem.name;
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
            fullyBooked: (props.film.Wings[0].FreeSeats + props.film.Wings[1].FreeSeats) < 1,
            showModal: false,
            selectedWing: {},
        };
    }

    toggleCollapse = () => {
        this.setState({
            isOpen: !this.state.isOpen
          });
    }

    openModal = (wing) => {

        this.setState({
            selectedWing: wing,
            showModal: true,
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false,
        });
    }

    content = () => {
        if(this.state.fullyBooked) {
            return (
                <div className="w-100 p-3 font-weight-bold"> 
                    <p>Fully booked! Try again tomorrow.</p>
                </div>
            );
        }
        else {
            return (
            <Fragment>
                <h6>Seats available: {this.props.film.Wings[0].FreeSeats + this.props.film.Wings[1].FreeSeats}</h6>
                <h6> Price per ticket: {this.props.film.Price}:-</h6>
                <Button className="m-1" 
                disabled={this.props.film.Wings[0].FreeSeats < 1} 
                color='success' 
                onClick={() => this.openModal(this.props.film.Wings[0])}> 
                   { 
                   this.props.film.Wings[0].FreeSeats > 1 ? 
                   'Book tickets in ' + this.props.film.Wings[0].WingAreaName :
                   'Fully Booked'
                   }
                </Button>
                <Button className="m-1"
                disabled={this.props.film.Wings[1].FreeSeats < 1}
                color="success"
                onClick={() => this.openModal(this.props.film.Wings[1])}>
                    { 
                    this.props.film.Wings[1].FreeSeats > 1 ? 
                    'Book tickets in ' + this.props.film.Wings[1].WingAreaName :
                    'Fully Booked'
                    }
                </Button>
                <Booking 
                setOpen={this.state.showModal} 
                closeModal={this.closeModal} 
                requestUpdate={this.props.requestUpdate}
                film={this.props.film}
                selectedWing={this.state.selectedWing} />
            </Fragment>
            );
        }
    }

    render() {
        const classNames = `${this.state.fullyBooked ? 'filmBooked' : "bgcolor--pale color--blackblue"} align-items-center text-center m-1`;
        return (
            <Card className={classNames} onClick={this.toggleCollapse} >
                <CardTitle>
                    <span className="unselectable">Title: {this.props.film.Title}</span>
                </CardTitle>
                <CardSubtitle>
                    <span className="unselectable">Time of Screening: {new Date(this.props.film.ScreenDateTime).toLocaleString('sv-SE')}</span>
                </CardSubtitle>
                <Collapse isOpen={this.state.isOpen}>
                    <CardBody>
                        <img src={this.props.film.ImdbImgUrl} alt={this.props.film.Title} className="mw-100 img-thumbnail" />
                        <p>{this.props.film.Summary}</p>
                        {this.content()}                      
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}