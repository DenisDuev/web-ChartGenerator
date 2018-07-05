// Create connection
var sHost = "localhost";
var sUser = "root";
var sPassword = "";
var sDatabase = "mydb";
var mysql = require('mysql');
var connection = undefined;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var http = require('http');
var fs = require('fs');
var path = require('path');

var formidable = require('formidable');

function getValueOfStringCookie(sCookie, sKey) {
    if (!sCookie) {
        return "";
    }
    var cut = sCookie.split(" ");
    //console.log(cut);
    for (var e in cut) {
        //console.log(cut[e]);
        if (cut[e].includes(sKey)) {
            return cut[e].split("=")[1];
        }
    }
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});

function initRequests() {
    var aRequests = [
        "/javascript/authenticate.js",
        "/javascript/chartGenerator.js",
        "/javascript/convertCSVtoJSON.js",
        "/javascript/menu.js",
        "/javascript/registration.js",
        "/javascript/submit.js",
        "/javascript/utils.js",
        "/javascript/wizard.js",
        "/css/styles.css",
        "/css/styles.css",
    ];

    aRequests.forEach(a => {
        app.get(a, function (req, res) {
            res.sendFile(path.join(__dirname, a));
        });
    })
}

initRequests();
app.get("/secret.html", function (req, res) {
    res.sendFile(path.join(__dirname, "/secret.html"));
});

app.get('/files', function (req, res) {
    fs.readdir("fileupload", function (err, items) {
        var username = getValueOfStringCookie(req.headers.cookie, "username=");
        var result = [];
        for (var i in items) {
            var item = items[i];
            if (item.includes(username)) {
                item =
                    result.push(item.replace(username + "_", ""));
            }
        }
        res.write(JSON.stringify(result));
        res.end();
    });
});

app.get('/*', function (req, res, next) {
    if (req.url.includes("secret.html")
        || req.url.includes("files_secret")
        || req.url === "/createuserstable"
        || req.url === "/registration.html") {
        return next();
    }
    var username = getValueOfStringCookie(req.headers.cookie, "username=");
    var password = getValueOfStringCookie(req.headers.cookie, "password=");
    //console.log(username + " " + password);
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                massage: 'There are some error with query!'
            });
            res.end();
        } else {
            if (results.length > 0) {
                return next();
            } else {
                res.sendFile(path.join(__dirname, "login.html"));
            }
        }
    });
});
app.post('/fileupload', function (req, res) {

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    form.uploadDir = path.join(__dirname, '/fileupload');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        var username = getValueOfStringCookie(req.headers.cookie, "username=");
        fs.rename(file.path, path.join(form.uploadDir, username + "_" + file.name), function () {

        });
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

app.use(express.static(path.join(__dirname, '')));

function initDb() {
    console.log("init db");
    var newConnection = mysql.createConnection({
        host: sHost,
        user: sUser,
        password: sPassword
    });

    var sql = 'CREATE DATABASE mydb';
    newConnection.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            connectToDb();
            createUsersTable();
        }
    });
}

function connectToDb(callBack) {
    connection = mysql.createConnection({
        host: sHost,
        user: sUser,
        password: sPassword,
        database: sDatabase
    });

    connection.connect(function (err) {
        if (!err) {
            console.log("Database is connected");
        } else {
            console.log("Error while connecting with database");
            if(callBack) callBack();
        }
    }.bind(this));
}

// Connect
connectToDb(initDb);
module.exports = connection;

// Create DB
app.get('/createdb', (req, res) => {
    var sql = 'CREATE DATABASE mydb';
    connection.query(sql, (err, result, fields) => {
        if (err) {
            console.log(err);
        }
        ;
        console.log(result);
        res.send('Database created...');
    });
});

app.get('/createuserstable', (req, res) => {
    createUsersTable(req, res);
});
function createUsersTable(req, res) {
    console.log("creating users querry");
    var sql = 'CREATE TABLE users(id int(11) NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, password varchar(255) NOT NULL, created_at datetime NOT NULL, updated_at datetime NOT NULL, PRIMARY KEY (id))';
    connection.query(sql, (err, result, fields) => {
        if (err) {
            if (res){
                res.send("something went wrong with query");
            }
            console.log(err);
        } else {
            console.log(result);
            if (res){
                res.send('Users table created...');
            }
        }
    })
}

var registration = require('./javascript/registration');
var authentication = require('./javascript/authenticate');
app.post('/javascript/registration', registration.register);
app.post('/authenticate', authentication.authenticate);


var server = app.listen(8080, function () {
    console.log('Server listening on port 8080');
});