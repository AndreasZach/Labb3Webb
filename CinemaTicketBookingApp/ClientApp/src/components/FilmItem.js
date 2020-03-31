import React, { PureComponent} from 'react';
import { Collapse, Button, Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap'; 
import { Link } from 'react-router-dom';

export class FilmItem extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
            fullyBooked: this.props.film.freeSeats < 1,
        };
    }

    toggleCollapse = () => {
        this.setState({
            isOpen: !this.state.isOpen
          });
    }

    handleButtonClick = () => {
        return (<Link to={{ 
            pathName: '/booking', 
            state:
            { 
                film: this.props.film 
            }
        }}></Link>);
    }

    content = () => {
        if(this.state.fullyBooked) {
            return (
                <div className="w-100 p-3" style="background-color: #fc7f03">
                    <p className="filmBooked">Fully booked! Try again tomorrow.</p>
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Seats available: {this.props.film.freeSeats} Price per ticket: {this.props.film.price}:-</p>
                    <Button color='success' onClick={this.handleButtonClick}> 
                        Book tickets for this film
                    </Button>
                </div>
            );
        }
    }

    render() {
        return (
            <Card className="align-items-center text-center" id={this.props.film.id} >
                <CardTitle>Title: {this.props.film.title}</CardTitle>
                <CardSubtitle>Time of Screening: {this.props.film.screenDateTime}</CardSubtitle>
                <Button color="primary" onClick={this.toggleCollapse}></Button>
                <Collapse isOpen={this.state.isOpen}>
                    <CardBody>
                        <img src={this.props.film.imdbImgUrl} alt={this.props.film.title} className="mw-100 img-thumbnail" />
                        <p>{this.props.film.summary}</p>
                        {this.content()}                        
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}