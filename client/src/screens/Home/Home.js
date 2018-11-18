// React
import React from "react";
// Styles
import { css } from "aphrodite";
import styles from "./Home.css";
// Components
import CurriculumArea from "./components/CurriculumArea";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";

function Home() {
    return (
        <div className={css(styles.home)}>
            <NavBar />
            <SearchBar />
            <CurriculumArea />
        </div>
    );
}

export default Home;
