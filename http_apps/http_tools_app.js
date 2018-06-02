const http = require('http');
const port = process.env.PORT || 4040;

var url = require('url');
var targetTime, currentTime;

//create server
http.createServer((request, response) => {
  
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  
  response.on('error', (err) => {
    console.error(err);
  });
  
  url = url.parse(request.url,true);
  
  console.log(url);
  
// Wait  
  if (request.method === 'GET' && url.pathname === '/wait'){
    console.log(`request method: ${request.method}`);	

	//wait for param sec number of seconds...	
	let datef = new Date();
	currentTime = Date.now();
	targetTime = currentTime + (url.query.sec*1000); // seconds to milliseconds 
	
	console.log(`target time = ${targetTime}, query.sec = ${url.query.sec}`);
	
	while (currentTime < targetTime){
	  currentTime = Date.now();	
	}
	//end wait 
	
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`waited for ${url.query.sec} seconds? Time run is ${datef.toTimeString().substring(0,15)}`);

// Timeout
  }else if (request.method === 'GET' && url.pathname === '/timeout'){
    response.writeHead(408, {'Content-Type': 'text/plain'});
    response.end('Timeout triggered');

// Simple Hello
  }else if (request.method === 'GET' && url.pathname === '/hello'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`Called /hello.  this is the parsed url: ${JSON.stringify(url)}`);
  }
  
}).listen(port);

console.log(`listening to port ${port}`);
 
 