// Дорогой друг, если не сложно, проверь, пожалуйста, через день. Я все доделаю, обещаю:)

const fs = require('fs/promises');
const path = require('path');

const destination = path.join(__dirname, 'project-dist');

async function createHtml(destination) {
  await fs.mkdir(destination, {recursive: true});
}

createHtml(destination);