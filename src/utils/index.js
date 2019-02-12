import fancyTerminal from './fancyTerminal';

/**
 * @function throwError - Error wrapper
 *
 * @param {string} message - error message
 */
function throwError(message) {
  const errorTemplate = `${fancyTerminal.redBg('[xmlhttprequest-jest-mock]:')} ${message}`;
  throw Error(errorTemplate);
}

/** @module utils - a module for utilities */
export default { throwError };
