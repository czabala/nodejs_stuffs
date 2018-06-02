const throttledQueue = require('throttled-queue');
const http = require('http');

let throttle = throttledQueue(3, 5000) // 15 times per second

for (let j = 0; j < 5000; j++) {
 throttle(function(){
   getData(function(res){
     // do parsing
   });
 });

}

function getData(callback){
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