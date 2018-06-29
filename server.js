var express = require('express');
var bodyParser=require('body-parser');
var connection = require('./db_connection');
var app = express();

var authenticate = require('./javascript/authenticate');
var registration = require('./javascript/registration');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/',function (req, res) {
    res.sendFile(__dirname + "/" + "registration.html");
})

app.get('/lohin.html',function (req, res) {
    res.sendFile(__dirname + "/" + "login.html");
})

app.post('/api/registration', registration.register);
app.post('/api/authenticate',authenticate.authenticate);

console.log(authenticate);
app.post('/javascript/registration', registration.register);
app.post('/javascript/authenticate', authenticate.authenticate);



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




var server = app.listen(8012, function(){
    console.log('Server listening on port 8080');
});