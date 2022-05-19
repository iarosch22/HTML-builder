const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'text.txt'), 'utf8', (error, fileContent) => {
  if(error) throw error;
  console.log(fileContent);
});