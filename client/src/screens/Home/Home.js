// React
import React, { Component } from "react";
import { connect } from "react-redux";
// Ducks
import { getCurriculums } from "./Home.ducks";
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

    componentWillMount() {
        this.props.getCurriculums();
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

    render() {
        return (
            <div className={css(styles.home)}>
                <SearchBar />
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
                <div
                    style={{
                        flex: 1,
                        backgroundColor: "blue"
                    }}
                    onDrop={e => {
                        e.preventDefault();
                        console.log(e.dataTransfer.files);
                    }}
                    onDragOver={e => e.preventDefault()}
                >
                    Drop here
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        curriculums: state.curriculums
    };
};

export default connect(
    mapStateToProps,
    { getCurriculums }
)(Home);
