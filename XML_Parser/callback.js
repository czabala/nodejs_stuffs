var myCallback = function(data) {
  console.log('got data: '+data);
};

exports.usingItNow = function(a, b, callback) {
  console.log(`Am I called first? Are these being called? Param1: ${a} and  Param2: ${b}`);
  callback('get it?');
};
/*
usingItNow("Ey", "Bee", myCallback); //-->local only can't be used on export

usingItNow("See", "Dee", () => {
	console.log("Did I work?");
});
*/
