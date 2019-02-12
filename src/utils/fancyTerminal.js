/**
 * terminalColors - colors for terminal output
 */
const terminalColors = {
  red: '\x1b[31m',
  redBg: '\x1b[41m',
  green: '\x1b[32m',
  greenBg: '\x1b[42m',
  blue: '\x1b[34m',
};

const reset = '\x1b[0m';

/**
 * fancyTerminal - fancy terminal object
 */
const fancyTerminal = {};

/**
 * @function assignColors - assign color keys to main object as functions
 *
 * @param {string} colorKey - color key
 */
function assignColors(colorKey) {
  if (Object.prototype.hasOwnProperty.call(terminalColors, colorKey)) {
    fancyTerminal[colorKey] = function assign(message) {
      return `${terminalColors[colorKey]}${message}${reset}`;
    };
  }
}

Object.keys(terminalColors).forEach(assignColors);

/** @module fancyTerminal - a module for colorful terminal output */
module.exports = fancyTerminal;
