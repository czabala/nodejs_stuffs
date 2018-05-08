const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const port = process.env.PORT || 4040;

var requestBody = "";

http.createServer((request, response) => {
  
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  
  request.on('data',function(chunk,err){
	requestBody+=chunk;
	
  });
  
  request.on('end',function(){
	var post = qs.parse(requestBody);
	fs.writeFile("./request.txt",requestBody, (err) =>
	{
		if (err) throw err;	
	}
	
	);
//	response.end(requestBody);	
	requestBody = "";
  });
  
  if ((request.method === 'GET' && request.url === '/echo') || (request.method === 'POST' && request.url === '/echo')){
    console.log(`request method: ${request.method}`);	

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hey I\'m okay!!!!');
  } else if (request.method === 'GET' && request.url === '/file'){
    response.writeHead(200, { 'Content-Type': 'text/plain', 'Content-disposition': 'attachment; filename=' + 'testPDF.pdf' });
	filestream = fs.createReadStream('./testPDF.pdf');
	filestream.pipe(response);
  } else if (request.method === 'POST' && request.url === '/wsfileattachment'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
  } else if (request.method === 'POST' && request.url === '/axis2_postfile'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
	console.log("hey! i'm called axis2_postfile");
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end(`Hello, what the heck is ${request.url} ??? please explain.`);
    console.error(`Hello, what the heck is ${request.url} ??? please explain.`);
  }
}).listen(port);



console.log(`listening to port ${port}`);
