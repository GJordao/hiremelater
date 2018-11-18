// React
import React from "react";
// Styles
import { css } from "aphrodite";
import styles from "./SearchBar.css";
// Components
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

function SearchBar() {
    return (
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position={"start"}>
                        <button className={css(styles.searchButton)}>
                            <img
                                alt={"Search curriculums"}
                                src={require("./../../../../images/icons/ic_search.svg")}
                            />
                        </button>
                    </InputAdornment>
                )
            }}
            placeholder={"Search for curriculums"}
            type={"search"}
            variant={"outlined"}
        />
    );
}

export default SearchBar;
