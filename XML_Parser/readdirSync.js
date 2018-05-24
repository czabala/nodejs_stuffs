const testFolder = './BUS1505/';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
})