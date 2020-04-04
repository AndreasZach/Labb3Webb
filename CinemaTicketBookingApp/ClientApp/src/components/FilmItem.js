import React, { Component, Fragment} from 'react';
import { Collapse, Button, Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import { Booking } from './Booking';

export class FilmItem extends Component {
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

    //Create class to style fully booked items in css
    content = () => {
        if(this.state.fullyBooked) {
            return (
                <div className="w-100 p-3 filmBooked"> 
                    <p>Fully booked! Try again tomorrow.</p>
                </div>
            );
        }
        else {
            return (
            <Fragment>
                <p>Seats available: {this.props.film.Wings[0].FreeSeats + this.props.film.Wings[1].FreeSeats} Price per ticket: {this.props.film.Price}:-</p>
                <Button 
                disabled={this.props.film.Wings[0].FreeSeats < 1} 
                color='success' 
                onClick={() => this.openModal(this.props.film.Wings[0])}> 
                   { 
                   this.props.film.Wings[0].FreeSeats > 1 ? 
                   'Book tickets in ' + this.props.film.Wings[0].WingAreaName :
                   'Fully Booked'
                   }
                </Button>
                <Button 
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
//<Button color="primary" onClick={this.toggleCollapse}></Button>
    render() {
        
        return (
            <Card className="align-items-center text-center" onClick={this.toggleCollapse} >
                <CardTitle>Title: {this.props.film.Title}</CardTitle>
                <CardSubtitle>Time of Screening: {new Date(this.props.film.ScreenDateTime).toLocaleString('sv-SE')}</CardSubtitle>
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