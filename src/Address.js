import React from 'react';
import './App.css';

class Address extends React.Component {
    constructor(props) {
        super(props);
        // The only place where you can assign this.state is the constructor.
        this.state = {
            address: ''
        };
        this.handleChangeAddress = this.handleChangeAddress.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChangeAddress(evt) {
        this.setState({address: evt.target.value})
    }

    handleSubmit(evt) {
        console.log("Address change submitted: " + this.state.address)
        evt.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Address:
                    <input type="text" value={this.state.address} onChange={this.handleChangeAddress} />
                    <input type="submit" value="Search" />
                </label>
            </form>
        );
    }
}

export default Address