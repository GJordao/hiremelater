// React
import React, { Component } from "react";
// Styles
import { css } from "aphrodite";
import styles from "./Home.css";
// Components
import SearchBar from "./components/SearchBar";

class Home extends Component {
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
            <div className={css(styles.home)}>
                <div className={css(styles.contentContainer)}>
                    <SearchBar />
                    <button onClick={this.fetchCurriculums}>
                        Get curriculums
                    </button>
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
            </div>
        );
    }
}

export default Home;
