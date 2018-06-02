const express = require('express');
const app = express();

//--->//aklc.govt.nz/shared/CityWide/APPS/PIP/TEST/DRAFT/PFP/9999_PFP_TEST_CZ3
app.use('/PFP', express.static('//aklc.govt.nz/shared/CityWide/APPS/PIP/TEST/DRAFT/PFP/9999_test_CZ'), (req,res,next) => {
	console.log(`/PFP requested of type:${req.method}, ${req.originalUrl}`);
	next();
});

app.listen(4040, () => console.log('listening to port 4040'));

