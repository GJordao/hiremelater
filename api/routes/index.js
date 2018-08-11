const express = require("express");
const router = express.Router();
const elastic = require("./../services/elastic-search");

router.post("/upload", async function(req, res) {
    if (!req.files) {
        return res.status(400).json({ message: "No files uploaded" });
    }

    try {
        const doc = req.files.file;
        const documentBase64 = Buffer.from(doc.data).toString("base64");
        const response = await elastic.indexDocument(documentBase64);
        await doc.mv(`/usr/files/${response._id}.pdf`);
        res.sendStatus(200);
    } catch (error) {
        console.log("Failure: ", error);
        res.sendStatus(500);
    }
});

router.get("/curriculum", async function(req, res) {
    // TODO: Add metadata when uploading a curriculum so we can then send that metadata to the front-end instead of the actual ES data
    // TODO: Check how to filter fields sent by ES so we can remove the base64 string because of the size
    try {
        const response = await elastic.fetchDocuments(req.query.offset);
        if (response.hits) {
            res.json({ curriculums: response.hits.hits });
        } else {
            throw new Error("Error while processing elastic search");
        }
    } catch (error) {
        console.log("Failure", error);
        res.sendStatus(500);
    }
});

module.exports = router;
