var express = require('express');
var app = express();

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

var server = app.listen(8080, function(){
    console.log('Server listening on port 8080');
});