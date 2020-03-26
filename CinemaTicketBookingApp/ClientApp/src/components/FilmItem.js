import React, { PureComponent } from 'react';
import { Collapse, Button, Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap'; 

export class FilmItem extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
        };
    }

    handleDivClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
          });
    }

    handleButtonClick = (id) => {
        //this.props.history.push('/tickets/' + id);
    }

    render() {
        return (
            <Card className="align-items-center text-center" id={this.props.film.id} onClick={() => this.handleDivClick()}>
                <CardTitle>Title: {this.props.film.title}</CardTitle>
                <CardSubtitle>Time of Screening: {this.props.film.screenDateTime}</CardSubtitle>
                <Collapse isOpen={this.state.isOpen}>
                    <CardBody>
                        <img src={this.props.film.imdbImgUrl} alt={this.props.film.title} className="mw-100 img-thumbnail" />
                        <p>{this.props.film.summary}</p>
                        <p>Price per ticket: {this.props.film.price}:-</p>
                        <Button color='success' onClick={() => this.handleButtonClick(this.props.film.id)}>Book tickets for this film</Button>
                    </CardBody>
                </Collapse>
            </Card>
        );
    }
}