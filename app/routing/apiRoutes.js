var express = require("express");

var router1 = express.Router();

router1.get("/api/friendlist", function (req, res) {
    res.json("Friend List");
});

router1.get("/api/repo", function (req, res) {
    res.json("Repo");
});


module.exports = router1;
