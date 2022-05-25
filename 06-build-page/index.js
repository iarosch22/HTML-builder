// Дорогой друг, если не сложно, проверь, пожалуйста, через день. Я все доделаю, обещаю:) Спасибо!

const fsP = require('fs/promises');
const fs = require('fs');
const path = require('path');

const destination = path.join(__dirname, 'project-dist');
const source = path.join(__dirname, 'components');
const sourceStyles = path.join(__dirname, 'styles');

(async () => {
  let temp = await fsP.readFile(path.join(__dirname, 'template.html'));
  let index = temp.toString();
  
  await fsP.mkdir(destination, {recursive: true});
  const files = await fsP.readdir(source, {withFileTypes: true});
  
  files.forEach(async file => {
    let dataFromComponent = await fsP.readFile(path.join(source, file.name));
    const nameOfComponent = file.name.split('.')[0];
  
    index = index.replace(`{{${nameOfComponent}}}`, dataFromComponent.toString());
    fs.writeFile(path.join(destination, 'index.html'), index, function(error) {
      if(error) throw error;
    });
  });
})();

(async () => {
  let writeableStream = fs.createWriteStream(path.join(destination, 'style.css'));
  const files = await fsP.readdir(sourceStyles, {withFileTypes: true});

  files.forEach(async file => {
    const type = path.extname(path.join(source, file.name)).substring(1);
    let readableStream = fs.createReadStream(path.join(sourceStyles, file.name), 'utf8');
    if(type === 'css') {
      readableStream.on('data', function(chunk) {
        writeableStream.write(chunk);
      });
    }
  });
})();

// const destinationAssets = path.join(__dirname, 'project-dist', 'assets');
// const sourceAssets = path.join(__dirname, 'assets');

// (async () => {
//   fs.mkdir(destinationAssets, {recursive: true});
// })();