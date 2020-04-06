import React, { Fragment, Component } from "react";

export class Header extends Component {
    static displayName = Header.name;
    render() {
        return (
            <Fragment>
                <header className="rounded bgcolor--darkblue m-2 p-3 text-center">
                    <h4 className="color--pale shadow--text">Welcome to Berras Bio!</h4>
                </header>
            </Fragment>);
    }
}