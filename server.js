var express = require('express');
var bodyParser=require('body-parser');
const mysql = require('mysql');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());

app.get('/lohin.html',function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
});

var http = require('http');
var fs = require('fs');
var path = require('path');

var formidable = require('formidable');
app.use(express.static(path.join(__dirname, '')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/fileupload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    form.uploadDir = path.join(__dirname, '/fileupload');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name), function () {

        });
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

app.get('/files', function (req, res) {
    fs.readdir("fileupload", function(err, items) {
        console.log(items);
        res.write(JSON.stringify(items));
        res.end();
    });
});

// Create connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mydb'
});

// Connect
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});
module.exports = connection;


// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE mydb';
    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int(11) NOT NULL AUTO_INCREMENT, username varchar(255) NOT NULL, password varchar(255) NOT NULL, created_at datetime NOT NULL, updated_at datetime NOT NULL, PRIMARY KEY (id))';
    connection.query(sql, (err, result, fields) => {
        if(err) throw err;
        console.log(result);
        res.send('Users table created...');
    });
});

var authenticate = require('./javascript/authenticate');
var registration = require('./javascript/registration');

app.post('/javascript/registration', registration.register);
app.post('/javascript/authenticate',authenticate.authenticate);

var server = app.listen(8080, function(){
    console.log('Server listening on port 8080');
});