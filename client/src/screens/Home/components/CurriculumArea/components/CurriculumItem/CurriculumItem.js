// React
import React from "react";
import PropTypes from "prop-types";
// Styles
import { css } from "aphrodite";
import styles from "./CurriculumItem.css";
// Components
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

function CurriculumItem({ email, name, url }) {
    const image =
        url || require("./../../../../../../images/default_profile.jpg");
    return (
        <Card className={css(styles.content)}>
            <CardMedia
                className={css(styles.image)}
                image={image}
                title="Contemplative Reptile"
            />
            <CardContent>
                <p>{name}</p>
                <p>{email}</p>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Read Curriculum
                </Button>
            </CardActions>
        </Card>
    );
}

CurriculumItem.defaultProps = {
    email: "",
    name: "",
    url: ""
};

CurriculumItem.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string
};

export default CurriculumItem;
