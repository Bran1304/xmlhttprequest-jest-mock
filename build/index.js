const { EOL } = require('os');
const { exit } = require('process');
const configs = require('./configs');
const build = require('./build');
const fancyTerminal = require('../src/utils/fancyTerminal');

console.log(fancyTerminal.blue('📦 bundling files'));
console.log(fancyTerminal.blue(`==================================================${EOL}`));

build(configs).then(() => {
  console.log(fancyTerminal.blue(`${EOL}==================================================`));
  console.log(fancyTerminal.blue('succesfully finished') + EOL);
}).catch((err) => {
  console.log(fancyTerminal.blue(`${EOL}==================================================`));
  console.log(fancyTerminal.red(`An error occured: ${err.message}`) + EOL);

  // force exit process with a error code so that publish script can stop publishing sequence
  exit(1);
});
