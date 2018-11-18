// React
import React, { Component } from "react";
// Styles
import { css } from "aphrodite";
import styles from "./CurriculumArea.css";
// Components
import ConfirmationModal from "./components/ConfimationModal";
import CurriculumItem from "./components/CurriculumItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// TODO: delete this when fetching correct data
const curriculums = [
    { name: "Dummy Curriculum 1", email: "dummy.curriculum1@gmail.com" },
    { name: "Dummy Curriculum 2", email: "dummy.curriculum2@gmail.com" },
    { name: "Dummy Curriculum 1", email: "dummy.curriculum1@gmail.com" },
    { name: "Dummy Curriculum 2", email: "dummy.curriculum2@gmail.com" },
    { name: "Dummy Curriculum 1", email: "dummy.curriculum1@gmail.com" },
    { name: "Dummy Curriculum 2", email: "dummy.curriculum2@gmail.com" },
    { name: "Dummy Curriculum 1", email: "dummy.curriculum1@gmail.com" },
    { name: "Dummy Curriculum 2", email: "dummy.curriculum2@gmail.com" },
    { name: "Dummy Curriculum 1", email: "dummy.curriculum1@gmail.com" },
    { name: "Dummy Curriculum 2", email: "dummy.curriculum2@gmail.com" }
];

class CurriculumArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            formData: {}
        };
    }

    handleSubmit = event => {
        const { files, formData } = this.state;
        event.preventDefault();
        const data = new FormData();
        files.forEach((file, index) => {
            data.append(`file-${index}`, file);
            data.append(`file-${index}-name`, formData[`file-${index}-name`]);
            data.append(`file-${index}-email`, formData[`file-${index}-email`]);
        });
        fetch("http://localhost:5000/upload", {
            method: "POST",
            body: data
        });
    };

    // fetchCurriculums = () => {
    //     fetch("http://localhost:5000/curriculum?offset=0")
    //         .then(response =>
    //             response.json().then(parsedResponse => {
    //                 console.log(parsedResponse);
    //             })
    //         )
    //         .catch(err => console.log("Error: ", err));
    // };

    handleCloseModal = e => {
        this.setState({
            files: []
        });
    };

    handleDrag = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = e => {
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

    handleFormFieldChange = e => {
        const newEntry = {};
        newEntry[e.target.name] = e.target.value;
        const newFormData = Object.assign({}, this.state.formData, newEntry);
        this.setState({
            formData: newFormData
        });
    };

    render() {
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
                    <Grid container spacing={24}>
                        {curriculums.map((curriculum, index) => {
                            return (
                                <Grid key={index} item xs={3}>
                                    <CurriculumItem
                                        email={curriculum.email}
                                        name={curriculum.name}
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

export default CurriculumArea;
