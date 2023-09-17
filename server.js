// const http = require('http');
// const https = require('https');
// const fs = require('fs');
// const path = require('path');

// const server = http.createServer((req, res) => {
    
//     // Determine the requested file path based on the URL
//     let filePath = './' + req.url;

//     // Resolve the file extension
//     const extname = path.extname(filePath);
//     let contentType = 'text/html';

//     // Map file extensions to their content types (add more as needed)
//     const contentTypeMap = {
//         '.html': 'text/html',
//         '.js': 'text/javascript',
//         '.css': 'text/css',
//         // Add more types here
//     };

//     contentType = contentTypeMap[extname] || 'application/octet-stream';

//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 // File not found, respond with a 404 error
//                 res.writeHead(404, { 'Content-Type': 'text/html' });
//                 res.end('File not found');
//             } else {
//                 // Other server error, respond with a 500 error
//                 res.writeHead(500);
//                 res.end(`Server Error: ${err.code}`);
//             }
//         } else {
//             // Serve the file with the appropriate content type
//             res.writeHead(200, { 'Content-Type': contentType });
//             res.end(content, 'utf-8');
//         }
//     });
// });

// const port = process.env.PORT || 3000;

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
