// Create web server
// 1. Create web server
// 2. Handle request
// 3. Read file
// 4. Write file
// 5. Redirect

var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Create server
http.createServer(function(request, response) {
    var pathName = url.parse(request.url).pathname;
    var query = url.parse(request.url, true).query;
    if (pathName === '/') {
        fs.readFile('./view/index.html', 'utf8', function(error, data) {
            if (error) {
                throw error;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (pathName === '/create') {
        fs.readFile('./view/create.html', 'utf8', function(error, data) {
            if (error) {
                throw error;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (pathName === '/create_process') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`./data/${title}`, description, function(error) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    } else if (pathName === '/update') {
        fs.readFile(`./data/${query.id}`, 'utf8', function(error, data) {
            if (error) {
                throw error;
            }
            fs.readFile('./view/update.html', 'utf8', function(error, content) {
                if (error) {
                    throw error;
                }
                var html = content.replace(/__title__/g, query.id).replace(/__description__/g, data);
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(html);
            });
        });
    } else if (pathName === '/update_process') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on
