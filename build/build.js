const rollup = require('rollup');
const fs = require('fs');
const fancyTerminal = require('../src/utils/fancyTerminal');


/**
 * @function getSize - return size of a content in kb
 *
 * @param {string} content - content of a file
 * @returns {string} - size of content in kb
 */
function getSize(content) {
  return `${(content.length / 1024).toFixed(2)}kb`;
}

/**
 * @function write - write code to a file
 *
 * @param {string} target - target path
 * @param {string} code - code
 * @returns {Promise<string>} - Promise with an error or
 * size of written file in kb
 */
function write(target, code) {
  return new Promise((res, rej) => {
    const dirRegex = /^(.+)\/(.+)$/;

    const pathResults = dirRegex.exec(target);

    if (!pathResults) {
      return rej(Error(`invalid path: ${target}`));
    }
    if (!fs.existsSync(pathResults[1])) {
      fs.mkdirSync(pathResults[1], { recursive: true });
    }

    fs.writeFile(target, code, 'utf8', (err) => {
      if (err) {
        return rej(Error(`An error occured: ${err}`));
      }
      return res(getSize(code));
    });
  });
}

/**
 * @function build - build rollup bundles
 *
 * @param {Array<object>} configs - an array of rollup configs
 */
async function build(configs) {
  for ({ input: inputOptions, output: outputOptions } of configs) {
    const bundle = await rollup.rollup(inputOptions);

    const { output } = await bundle.generate(outputOptions);

    for ({ code, fileName } of output) {
      try {
        const m = await write(outputOptions.file, code);
        console.log(`${fancyTerminal.green(`${fileName}:`)} ${m}`);
      } catch (err) {
        console.log(`${fancyTerminal.redBg(`${fileName}:`)} ${fancyTerminal.red(err.message)}`);
        throw err;
      }
    }
  }
}

/** @module build - build rollup bundles */
module.exports = build;

/** @module build - write code to a file */
module.exports.write = write;
