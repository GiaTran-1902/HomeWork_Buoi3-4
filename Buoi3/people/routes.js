const express = require('express');
const router = express.Router();
const fs = require('fs');
const output = require('./output.json');
router.post('/', (req, res) => {
    const body = req.body;
    console.log("TYPE BODY: ", typeof body)
    console.log("CURRENT DIR: ", __dirname);
    // fs.writeFile(`${__dirname}/output.json`, JSON.stringify(body), err => {
    fs.writeFile(`${__dirname}/output.json`, JSON.stringify(body), err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("WRITE FIEL SUCCESS!")
        // file written successfully
    });
});

router.get('/', (req, res) => {
    res.send(output);
})

module.exports = router;