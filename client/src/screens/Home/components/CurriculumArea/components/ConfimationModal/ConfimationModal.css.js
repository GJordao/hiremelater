// Aphrodite
import { StyleSheet } from "aphrodite/no-important";

const styles = StyleSheet.create({
    modal: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    modalInput: {
        display: "inline-grid",
        marginBottom: 10,
        width: "100%"
    },
    modalPaper: {
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        maxHeight: 250,
        overflow: "auto",
        padding: "10px 25px 25px 25px",
        width: 350
    },
    modalTitle: {
        alignItems: "center",
        color: "#3f51b5",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        marginBottom: 15,
        marginTop: 15,
        minHeight: 30
    }
});

export default styles;
