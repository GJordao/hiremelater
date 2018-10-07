// React
import React from "react";
// Styles
import { css } from "aphrodite";
import styles from "./SearchBar.css";

const SearchBar = () => {
    return (
        <div className={css(styles.searchBar)}>
            <input className={css(styles.input)} type={"text"} />
        </div>
    );
};

export default SearchBar;
