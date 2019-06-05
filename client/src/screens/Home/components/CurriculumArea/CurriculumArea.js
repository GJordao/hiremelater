// React
import React, { Component } from "react";
// Redux
import { connect } from "react-redux";
// Actions
import { getCurriculums } from "./../../Home.ducks";
// Services
import { post } from ".//..//../../../services/api";
// Styles
import { css } from "aphrodite";
import styles from "./CurriculumArea.css";
// Components
import ConfirmationModal from "./components/ConfimationModal";
import CurriculumItem from "./components/CurriculumItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class CurriculumArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            formData: {}
        };
    }

    handleSubmit = async (event) => {
        try {
            const { getCurriculums, post } = this.props;
            const { files, formData } = this.state;
            event.preventDefault();
            const data = new FormData();
            files.forEach((file, index) => {
                data.append(`file-${index}`, file);
                data.append(
                    `file-${index}-name`,
                    formData[`file-${index}-name`]
                );
                data.append(
                    `file-${index}-email`,
                    formData[`file-${index}-email`]
                );
            });

            await post("curriculum", data);
            await getCurriculums();
            this.setState({
                files: [],
                formData: {}
            });
        } catch (error) {
            console.log(error);
        }
    };

    handleCloseModal = (e) => {
        this.setState({
            files: []
        });
    };

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const fileArray = [];
            for (let key in e.dataTransfer.files) {
                const item = e.dataTransfer.files[key];
                if (item.type === "application/pdf") {
                    fileArray.push(item);
                }
            }
            e.dataTransfer.clearData();

            this.setState({
                files: fileArray
            });
        }
    };

    handleFormFieldChange = (e) => {
        const newEntry = {};
        newEntry[e.target.name] = e.target.value;
        const newFormData = Object.assign({}, this.state.formData, newEntry);
        this.setState({
            formData: newFormData
        });
    };

    render() {
        const { curriculums } = this.props;
        return (
            <Paper
                className={css(styles.curriculumArea)}
                onDragOver={this.handleDrag}
                onDrop={this.handleDrop}
            >
                <form
                    onChange={this.handleFormFieldChange}
                    onSubmit={this.handleSubmit}
                >
                    <Grid container>
                        {curriculums.map((curriculum, index) => {
                            return (
                                <Grid key={index} item xs={3}>
                                    <CurriculumItem
                                        email={curriculum.email}
                                        name={curriculum.name}
                                        url={`data:application/octet-stream;base64,${curriculum.file}`}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <ConfirmationModal
                        fileList={this.state.files}
                        onClose={this.handleCloseModal}
                        open={this.state.files.length > 0}
                    />
                </form>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        curriculums: state.curriculums.list
    };
};

const mapActionsToProps = {
    getCurriculums: getCurriculums,
    post: post
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(CurriculumArea);
