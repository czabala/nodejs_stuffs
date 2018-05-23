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
	console.log(`Writing to file ./request.txt for request ${request.method} and ${request.url}`);
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
  } else if (request.method === 'POST' && request.url === '/request'){
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.end(`<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:aucklandcouncil.govt.nz:service:supplier:operations:componentmodel:order">
   <soap:Header/>
   <soap:Body>
	<updateWorkOrderResponse xmlns="urn:aucklandcouncil.govt.nz:service:supplier:operations:componentmodel:order" xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
		<updateResponse xmlns="">
			<orderId>003101034422</orderId>
			<supplierId>901630</supplierId>
			<supplierOrderId>3307122</supplierOrderId>
			<status>COMP</status>
  		</updateResponse>
	</updateWorkOrderResponse>
  </soap:Body>
</soap:Envelope>`);

  } else if (request.method === 'GET' && request.url === '/file'){
    response.writeHead(200, { 'Content-Type': 'text/plain', 'Content-disposition': 'attachment; filename=' + 'testPDF.pdf' });
	filestream = fs.createReadStream('./testPDF.pdf');
	filestream.pipe(response);
  } else if (request.method === 'GET' && request.url === '/file_like_SAP'){
    response.writeHead(200, { 'server': 'SAP NetWeaver Application Server 7.49 / AS Java 7.50', 'content-type': 'application/pdf;charset=;version=0046'}); //', 'content-length': '27319'});-->removed content length
	filestream = fs.createReadStream('./testPDF2.pdf');
	filestream.pipe(response);
  } else if (request.method === 'GET' && request.url === '/file_modif'){
    response.writeHead(200, { 'server': 'SAP NetWeaver Application Server 7.49 / AS Java 7.50','content-type': 'application/pdf;charset=UTF-8;version=1.0'});
	filestream = fs.createReadStream('./testPDF2.pdf');
	filestream.pipe(response);
  } else if (request.method === 'POST' && request.url === '/wsfileattachment'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
  } else if (request.method === 'POST' && request.url === '/axis2_postfile'){
    response.writeHead(200, { 'Content-Type': 'text/plain' });
	console.log("hey! i'm called axis2_postfile");
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end(`Hello, called using ${request.url} Doco: 
			the following calls can be used:
			POST /request
			GET /file
			GET /file_like_sap
			GET /file_modif
			POST /wsfileattachment
			POST /axis2_postfile (when axis2 is the caller)		
			
			GET /echo
	
		`);
    console.error(`Hello, what the heck is ${request.url} ??? please explain.`);
  }
}).listen(port);



console.log(`listening to port ${port}`);
