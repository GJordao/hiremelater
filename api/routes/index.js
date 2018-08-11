const express = require("express");
const router = express.Router();

router.post("/upload", function(req, res) {
    try {
        if (!req.files) return res.status(400).send("No files were uploaded.");

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;
        console.log(sampleFile);
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(`/usr/files/${sampleFile.name}`, function(err) {
            if (err) return res.status(500).send(err);

            res.send("File uploaded!");
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
