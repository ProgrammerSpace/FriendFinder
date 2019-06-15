var express = require("express");
var list = require("../data/friends.js");

var router1 = express.Router();

// Respond with friends list
router1.get("/api/friendlist", function (req, res) {
    res.json(list);
});

// Redirect to repository
router1.get("/api/repo", function (req, res) {
    res.redirect("https://github.com/ProgrammerSpace/FriendFinder");
});

router1.post("/api/findmatch", function (req, res) {
    let compatibilityArray = [], compatibility = 0;
    let newData = req.body;

    for (i in list) {
        for (let j = 0; j < list[i].scores.length; j++) {

            // Math.abs to find difference between numbers
            compatibility += Math.abs(list[i].scores[j] - newData.scores[j]);
        }
        compatibilityArray.push(parseInt(compatibility));
        compatibility = 0;
    }

    // '...' destructure array into distinct variables
    // Math.min to identify minimum value in array
    let possibleMatch = compatibilityArray.indexOf(Math.min(...compatibilityArray));

    list.push(newData);

    res.json(list[possibleMatch]);
});


module.exports = router1;
