const http = require('http');
const url = require('url');
const GET = 'GET';
const POST = 'POST';
const endpoint = "https://alissalg-fd0c12a35b34.herokuapp.com/COMP4537/labs/4/api/definitions/";

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // let name = q.query.word || 'Unknown';
    // console.log('word:', word);
    
    // const messageInBlue = `<p style="color: blue;">${message}</p>`;
    // res.end(messageInBlue);
    "Access-Control-Allow-Origin"; "*",
    "Access-Control-Allow-Methods"; "*"
}).listen(process.env.PORT || 3000);
console.log(req.headers);
if (req.method === GET) {
    const q = url.parse(req.url, true);
    
}