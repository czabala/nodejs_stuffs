const testFolder = './BUS2092/';
const resultFolder = './result_Folder/';
const fs = require('fs');
const p = require('./xml_parser.js');

fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
	//reading file
	fs.readFile(testFolder+file, 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		//parsing the XML contents
		console.log("parsing the XML file:");
		p.parseXML(data, '//docId/text()', '//contRep/text()', '//contentType/text()',(result)=>{
		    //write to File
			//console.log(result);
			fs.appendFile(resultFolder+'file.txt', `${result} \r\n`, function(err){
			  if (err) throw err;
			  console.log(result + ' Saved!');
			});
		});
	});
  });
})