const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({input, output});

let writeableStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
output.write('Введите текст: \n');

rl.on('line', (input) => {
  if(input === 'exit') {
    output.write('Всего доброго! Процесс завершен');
    rl.close();
  }
  writeableStream.write(`${input}\n`);
});

rl.on('SIGINT', () => {
  output.write('Всего доброго! Процесс завершен');
  rl.close();
});
