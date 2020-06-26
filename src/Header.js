import React from 'react';
import './App.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        // The only place where you can assign this.state is the constructor.
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        // this.setState must be used outside of constructor
        this.setState({ date: new Date() });
    }

    render() {
        return (
            <div>
                <h1>Who's My Rep?</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}

export default Header