const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'styles');

let writeableStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

async function createBundle(source) {
  const files = await fs.promises.readdir(source, {withFileTypes: true});
  files.forEach(async file => {
    const type = path.extname(path.join(source, file.name)).substring(1);
    let readableStream = fs.createReadStream(path.join(source, file.name), 'utf8');
    if(type === 'css') {
      readableStream.on('data', function(chunk) {
        writeableStream.write(chunk);
      });
    }
  });
}

createBundle(source);