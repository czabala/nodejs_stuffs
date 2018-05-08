const http = require('http');

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if ((request.method === 'GET' && request.url === '/echo') || (request.method === 'POST' && request.url === '/echo')){
    console.log(`request method: ${request.method}`);	
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
    console.error('ERROR: 404');
  }
}).listen(4040);

console.log("listening to 4040");
