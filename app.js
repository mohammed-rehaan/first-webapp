var express = require('express');
var bodyparser = require('body-parser');
var mysql = require('mysql');
var app = express();


app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rehaan',
    database: 'webapp_db'
});



app.get("/", function (requests, results) {
    var q = 'SELECT COUNT(*) AS count from users'
    con.query(q, function (err, res) {
        if (err) throw err;
        var c = (res[0].count);
        //  results.send("We have "+c+" Users Registered");
        results.render("ghar", { count: c });
    });

});

app.post("/register" , function(req,res){
    var person = {
        email : req.body.Email
    };

    con.query("INSERT INTO users SET ?",person,function(err,results){
        if(err) throw err;
       res.redirect("/");
    });
});

app.get("/joke", function (req, res) {
    var joke = "JOKES";
    res.send(joke);
});

app.get("/lucky_num", function (req, res) {
    var number = Math.ceil(Math.random() * 10);
    res.send("Number is : " + number);
})

app.listen(3000, function () {
    console.log("Connected to port 8080...");
})