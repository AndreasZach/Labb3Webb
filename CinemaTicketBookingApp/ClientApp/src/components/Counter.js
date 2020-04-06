import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap';

export class Counter extends Component {
    static displayName = Counter.name;
    constructor(props) {
        super(props);
        this.state={
            count: 0,
        }
    }

    handleClick = (num) => {
        num ? 
        this.setState({count: this.state.count + 1}) : 
        this.setState({count: this.state.count - 1})
    }

    render() {

        return (
            <Fragment>
                <div>{this.state.count}</div>
                <div>
                    <Button
                    color="primary"
                    disabled={(this.state.count >= this.props.max) || (this.state.count >= 12)} 
                    onClick={() => this.handleClick(1)}
                    className="w-50 my-1">
                        Add
                    </Button>
                    <Button 
                    color="primary"
                    disabled={this.state.count <= 0} 
                    onClick={() => this.handleClick(0)}
                    className="w-50 my-1">
                        Remove
                    </Button>
                </div>
                <Button
                color="primary"
                disabled={this.state.count < 1} 
                onClick={() => this.props.commit(this.state.count)}
                block>
                    Confirm purchase
                </Button>
            </Fragment>
        );
    }
}