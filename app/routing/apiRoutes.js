var express = require("express");
var list = require("../data/friends.js");

var router1 = express.Router();

router1.get("/api/friendlist", function (req, res) {
    res.json("Friend List");
});

router1.get("/api/repo", function (req, res) {
    res.json("Repo");
});

router1.post("/api/findmatch", function (req, res) {
    let compatibilityArray = [], compatibility = 0;
    let newData = req.body;
    console.log("new data: " + newData);
    for (i in list) {
        for (let j = 0; j < list[i].scores.length; j++) {
            compatibility += Math.abs(list[i].scores[j] - newData.scores[j]);
        }
        compatibilityArray.push(parseInt(compatibility));
        compatibility = 0;
    }
    console.log("compatibilityArray: " + compatibilityArray);
    console.log("min: " + Math.min(...compatibilityArray));
    let possibleMatch = compatibilityArray.indexOf(Math.min(...compatibilityArray));
    console.log("possibleMatch: " + possibleMatch);
    list.push(newData);
    console.log(list);
    res.json(list[possibleMatch]);
});


module.exports = router1;
