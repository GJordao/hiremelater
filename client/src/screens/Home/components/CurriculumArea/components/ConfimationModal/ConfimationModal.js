// React
import React from "react";
import PropTypes from "prop-types";
// Styles
import { css } from "aphrodite";
import styles from "./ConfimationModal.css";
// Components
import Button from "@material-ui/core/Button";
import Divider from "./../../../../../../components/Divider";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

function ConfimationModal({ fileList, onClose, open }) {
    return (
        <Modal
            className={css(styles.modal)}
            disablePortal
            open={open}
            onClose={onClose}
        >
            <Paper className={css(styles.modalPaper)}>
                {fileList.map((file, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className={css(styles.modalTitle)}>
                                {`File ${index + 1}`}
                                <Divider />
                            </div>
                            <div className={css(styles.modalInput)}>
                                <TextField
                                    defaultValue={file.name || ""}
                                    label={"Name"}
                                    name={`file-${index}-name`}
                                />
                            </div>
                            <div className={css(styles.modalInput)}>
                                <TextField
                                    label={"Email"}
                                    name={`file-${index}-email`}
                                    type={"email"}
                                />
                            </div>
                        </React.Fragment>
                    );
                })}
                <Button type={"submit"}>Submit</Button>
            </Paper>
        </Modal>
    );
}

ConfimationModal.defaultProps = {
    fileList: [],
    onClose: () => {},
    open: false
};

ConfimationModal.propTypes = {
    fileList: PropTypes.array,
    onClose: PropTypes.func,
    open: PropTypes.bool
};

export default ConfimationModal;
