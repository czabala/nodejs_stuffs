var greet = require("./callback.js");

greet.usingItNow("See", "Dee", () => {
	console.log("Did I work?");
});

