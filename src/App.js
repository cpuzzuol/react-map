import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Bob from './Bob';
import Header from "./Header";
import Address from "./Address";

function App(props) {
    return (
        <div className="App">
            <Header />
            <Address />
            <Bob/>
        </div>
    );
}

export default App;
