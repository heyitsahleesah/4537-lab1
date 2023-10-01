let http = require('http');
http.createServer(function(request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'});
    response.write("responses coming from Server..");
    response.end();
}).listen(8080);
console.log('listening...');

const mo = require('./modules/math');
console.log(`Hello ALISSA. Subtraction does ${mo.subtract(a,b)} and addition does ${mo.add(a,b)}`);
