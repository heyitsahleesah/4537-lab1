// some code adapted from chatgpt
const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');


const lab3 = require('./COMP4537/labs/3/getDate/server.js');

const server = http.createServer((req, res) => {
    // parse the requested url
    let q = url.parse(req.url, true);

    // this part taken from chatgpt
    // lab 1 redirection 
    // Handle static files (CSS and JavaScript)
    if (q.pathname.startsWith('/COMP4537/labs/1/css/') || q.pathname.startsWith('/COMP4537/labs/1/js/')) {
        const filePath = path.join(__dirname, q.pathname);
        fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            const contentType = q.pathname.endsWith('.css') ? 'text/css' : 'application/javascript';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
        });
    }
    // Handle lab 1 HTML pages
    else if (q.pathname === '/COMP4537/labs/1/index.html' || q.pathname === '/COMP4537/labs/1/writer.html' || q.pathname === '/COMP4537/labs/1/reader.html') {
        const staticFilePath = path.join(__dirname, q.pathname);
        fs.readFile(staticFilePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
        });
    } else if(q.pathname.startsWith('/COMP4537/labs/3/')) {
            lab3.handleRequest(req, res);
    // lab 4 connectivity for server 1
    } else if (q.pathname.startsWith('/COMP4537/labs/4/js/')) {
        const filePath = path.join(__dirname, q.pathname);
        fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'application/javascript'});
            res.end(data);
        }
        });
    }
    // Handle lab 4 HTML pages
    else if ( q.pathname === '/COMP4537/labs/4/index.html'|| q.pathname === '/COMP4537/labs/4/search.html' || q.pathname === '/COMP4537/labs/4/store.html') {
        const staticFilePath = path.join(__dirname, q.pathname);
        fs.readFile(staticFilePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
        });
    }
    // Handle lab 5 HTML pages
    else if (q.pathname.startsWith('/COMP4537/labs/5/css/') || q.pathname.startsWith('/COMP4537/labs/5/js/')) {
        const filePath = path.join(__dirname, q.pathname);
        fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            const contentType = q.pathname.endsWith('.css') ? 'text/css' : 'application/javascript';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
        });
    }   // Handle lab 5 HTML pages
        else if ( q.pathname === '/COMP4537/labs/5/index.html') {
        const staticFilePath = path.join(__dirname, q.pathname);
        fs.readFile(staticFilePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
        });
    }
    // Handle lab 5 HTML pages
    else if (q.pathname.startsWith('/COMP4537/labs/6/css/') || q.pathname.startsWith('/COMP4537/labs/6/js/')) {
        const filePath = path.join(__dirname, q.pathname);
        fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            const contentType = q.pathname.endsWith('.css') ? 'text/css' : 'application/javascript';
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
        });
    }   // Handle lab 6 HTML pages
        else if ( q.pathname === '/COMP4537/labs/6/write.html' || q.pathname === '/COMP4537/labs/6/search.html') {
        const staticFilePath = path.join(__dirname, q.pathname);
        fs.readFile(staticFilePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('Not Found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}).listen(process.env.PORT || 3000);