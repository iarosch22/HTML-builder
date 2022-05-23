const fs = require('fs/promises');
const path = require('path');

const destination = path.join(__dirname, 'files-copy');
const source = path.join(__dirname, 'files');

async function copyDir(destination, source) {
  await fs.mkdir(destination, {recursive: true});
  const files = await fs.readdir(source, {withFileTypes: true});
  files.forEach(async file => {
    await fs.copyFile(path.join(source, file.name), path.join(destination, file.name));
  });
}

copyDir(destination, source);