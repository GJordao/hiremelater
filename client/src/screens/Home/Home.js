// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
// Ducks
import { getCurriculums } from "./Home.ducks";
// Styles
import { css } from "aphrodite";
import styles from "./Home.css";
// Components
import CurriculumArea from "./components/CurriculumArea";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

class Home extends Component {
    componentWillMount() {
        this.props.getCurriculums();
    }

    render() {
        return (
            <div className={css(styles.home)}>
                <NavBar />
                <SearchBar />
                <CurriculumArea />
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
