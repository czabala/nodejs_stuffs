const express = require('express');
const app = express();

app.use('/PFP', express.static('./PFP_SAMPLE_FOLDER/8270080642'), (req,res,next) => {
	console.log(`/PFP requested of type:${req.method}, ${req.originalUrl}`);
	next();
});

app.listen(4040, () => console.log('listening to port 4040'));

