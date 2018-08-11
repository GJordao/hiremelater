import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = new FormData();
        data.append("file", this.fileInput.current.files[0]);
        data.append("name", "sampleFile");
        data.append("description", "sampleFile");
        fetch("http://localhost:5000/upload", {
            method: "POST",
            body: data
        });
        console.log(`Selected file - ${data}`);
    };

    fetchCurriculums = () => {
        fetch("http://localhost:5000/curriculum?offset=0")
            .then(response =>
                response.json().then(parsedResponse => {
                    console.log(parsedResponse);
                })
            )
            .catch(err => console.log("Error: ", err));
    };

    render() {
        return (
            <div>
                <button onClick={this.fetchCurriculums}>Get curriculums</button>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Upload file:
                        <input
                            type="file"
                            name="sampleFile"
                            ref={this.fileInput}
                        />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
