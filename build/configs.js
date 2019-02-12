const path = require('path');
const buble = require('rollup-plugin-buble');
const node = require('rollup-plugin-node-resolve');
const cjs = require('rollup-plugin-commonjs');
const { version } = require('../package.json');
const packageName = require('../package.json').name;

const resolve = p => path.resolve(__dirname, '../', p);

/* eslint-disable operator-linebreak */
const banner =
`/*!
 * ${packageName} v${version} 
 * Erdem Bircan ${new Date().getFullYear()}
 * @license MIT
 */`;

const configs = [
  {
    file: resolve(`dist/${packageName}-common.js`),
    format: 'cjs',
  },
];

function generateConfigs(conf) {
  return {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        node(),
        cjs(),
        buble(),
      ],
    },
    output: {
      file: conf.file,
      format: conf.format,
      banner,
    },
  };
}

module.exports = configs.map(generateConfigs);
