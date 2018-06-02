const http = require('http');

console.log("start...");

for (var i=0; i < 40000; i++){

http.get('http://localhost:4040/wait', (resp) => {
  let data = '';
  
  //a chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    //console.log(JSON.parse(data).explanation);
	console.log(data);
  });

}).on("error", (err) => {

 console.log("Error: " + err.message);

});

}