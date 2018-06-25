var http = require('http');
var fs = require('fs');
var path = require('path');

var formidable = require('formidable');

http.createServer(function (request, response) {

    var bFile = false;
    var filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './index.html';
    } else if (request.url === '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(request, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var homedir = require('os').homedir();
            var newpath = homedir.replace('\\', "/").replace('\\', "/") + '/' + files.filetoupload.name;
            console.log(newpath);
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                response.write('File uploaded and moved!');
                response.end();
            });
            response.write('File uploaded');
            response.end();
        });
        bFile = true;

    }
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    if(!bFile) {
        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    fs.readFile('./404.html', function (error, content) {
                        response.writeHead(200, {'Content-Type': contentType});
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, {'Content-Type': contentType});
                response.end(content, 'utf-8');
            }
        });
    }
}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');