// some code adapted from chatgpt

let http = require('http');
let url = require('url');
let dt = require('./modules/utils');
const fs = require('fs');
const path = path
const filePath = '../readFile/file.txt';

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);

    if (q.pathname == '/COMP4537/labs/3/getDate/' && q.query.name) {
        // console.log(q.query);
        res.writeHead(200, {'Content-Type': 'text/html'});
        let name = q.query.name || 'Unknown';
        console.log('Name:', name);
        let message = dt.getDate(name);
        const messageInBlue = `<p style="color: blue;">${message}</p>`;
        res.end(messageInBlue);
    // Part C.1 -- write to a file.txt in the readFile directory
    } else if (q.pathname == '/COMP4537/labs/3/writeFile/' && q.query.text) {
        let text = q.query.text;
        fs.appendFile(filePath, text + '\n', (appendErr) => {
            if (appendErr) {
                res.writeHead(500, {'Content-Type': 'text/plain' });
                res.end('Unable to append to file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Text appended to file');
            }
        });
    // Part C.2 -- read from the file in the readFile directory
    } else if (q.pathname === '/COMP4537/labs/3/readFile/file.txt') {
        fs.readFile(filePath, 'utf8', (readErr, data) => {
            if (readErr) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
            } else {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            }
        })
    } else {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end('Not Found');
    }
}).listen(process.env.PORT || 3000);