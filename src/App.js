import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Bob from './Bob';
import Header from "./Header";

function App(props) {
    return (
        <div className="App">
            <Header />
            <Bob/>
        </div>
    );
}

export default App;
