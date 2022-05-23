const fs = require('fs/promises');
const path = require('path');
const {stdout: output } = require('process');

const dir = path.join(__dirname, 'secret-folder');

async function outputFiles(dir) {
  const files = await fs.readdir(dir, {withFileTypes: true});

  files.forEach(async file => {
    if(file.isFile()) {
      const stats = await fs.stat(path.join(dir, file.name));
      const name = file.name.split('.')[0];
      const type = path.extname(path.join(dir, file.name)).substring(1);
      const size = stats.size;
      
      output.write(`${name} - ${type} - ${size} bytes\n`);
    }
  });
}

outputFiles(dir);