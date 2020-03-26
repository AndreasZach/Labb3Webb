import React, { PureComponent } from 'react';
import { Collapse, Button } from 'reactstrap';

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
            <div id={this.props.film.id} onClick={() => this.handleDivClick()}>
                {this.props.film.title}
                {this.props.film.screenDateTime}
                <Collapse isOpen={this.state.isOpen}>
                    <img src={this.props.film.imdbImgUrl} alt={this.props.film.title} class='thumbnail' />
                    <p>{this.props.film.summary}</p>
                    {this.props.film.Price}
                    <Button color='Success' onClick={() => this.handleButtonClick(this.props.film.id)}>Book tickets for this film</Button>
                </Collapse>
            </div>
        );
    }
}