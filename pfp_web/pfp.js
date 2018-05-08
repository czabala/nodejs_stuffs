const express = require('express');
const app = express();

app.use('/PFP', express.static('./PFP_SAMPLE_FOLDER/8270080642'));

app.listen(4040, () => console.log('listening to port 4040'));

