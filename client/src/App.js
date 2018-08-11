import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    componentWillMount() {
        fetch("http://localhost:5000/me")
            .then(resp => resp.json().then(data => console.log(data)))
            .catch(err => {
                console.log("An error has occured", err);
            });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Hire me later</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
            </div>
        );
    }
}

export default App;
