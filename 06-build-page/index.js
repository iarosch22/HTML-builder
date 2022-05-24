// Дорогой друг, если не сложно, проверь, пожалуйста, через день. Я все доделаю, обещаю:) Спасибо!

const fsP = require('fs/promises');
const fs = require('fs');
const path = require('path');

const destination = path.join(__dirname, 'project-dist');
const source = path.join(__dirname, 'components');

async function createHtml(destination, source) {
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
}

createHtml(destination, source);