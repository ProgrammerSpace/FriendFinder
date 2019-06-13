var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var routes = require("./app/routing/htmlRoutes.js");
var routes1 = require("./app/routing/apiRoutes.js");

app.use(routes);
app.use(routes1);

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});