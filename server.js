/**
 * Created by sumeetdubey on 6/20/17.
 */
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});

app.listen(3000, function () {
    console.log('listening on port 3000!')
});

var con = mysql.createConnection({
    host: "localhost",
    user: "your_username_here",
    password: "your_password_here",
    database: 'movie_listings_db'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

require("./public/server/app.js")(app, con);


