// some code adapted from chatgpt

let http = require('http');
let url = require('url');
let dt = require('./modules/utils');

http.createServer(function (req, res) {
    let q = url.parse(req.url, true);

    if (q.pathname == '/COMP4537/labs/3/getDate/' && q.query.name) {
        // console.log(q.query);
        res.writeHead(200, {'Content-Type': 'text/html'});
        let name = q.query.name || 'Unknown';
        let message = dt.getDate(name);
        const messageInBlue = `<p style="color: blue;">${message}</p>`;
        res.end(messageInBlue);
    } else {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.end('Not Found');
    }
}).listen(process.env.PORT || 3000);