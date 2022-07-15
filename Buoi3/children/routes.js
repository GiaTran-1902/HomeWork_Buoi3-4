const express = require('express');
const router = express.Router();
var output = require('./output.json');
var fs = require('fs');

router.get('/', (req, res) => {
    res.send(output);
})

router.get('/:country', (req, res) => {
    const country = req.params.country;
    const reChildren = output.filter(e => {
        if (e.country === country) {
            return true;
        } else {
            return false;
        }
    })
    res.send(reChildren);
})

router.delete('/:country', (req, res) => {
    const country = req.params.country;
    const reChildren = output.filter(e => {
        if (e.country === country) {
            return false;
        } else {
            return true;
        }
    })    
    fs.writeFile("children/output.json", JSON.stringify(reChildren), function(err) {
        if (err) {
            console.log(err);
        }
    });
    output = reChildren;
    res.send(output);
})

module.exports = router;