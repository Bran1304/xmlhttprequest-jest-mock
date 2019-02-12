/*!
 * xmlhttprequest-jest-mock v1.0.0 
 * Erdem Bircan 2019
 * @license MIT
 */
'use strict';

/**
 * terminalColors - colors for terminal output
 */
var terminalColors = {
  red: '\x1b[31m',
  redBg: '\x1b[41m',
  green: '\x1b[32m',
  greenBg: '\x1b[42m',
  blue: '\x1b[34m',
};

var reset = '\x1b[0m';

/**
 * fancyTerminal - fancy terminal object
 */
var fancyTerminal = {};

/**
 * @function assignColors - assign color keys to main object as functions
 *
 * @param {string} colorKey - color key
 */
function assignColors(colorKey) {
  if (Object.prototype.hasOwnProperty.call(terminalColors, colorKey)) {
    fancyTerminal[colorKey] = function assign(message) {
      return ("" + (terminalColors[colorKey]) + message + reset);
    };
  }
}

Object.keys(terminalColors).forEach(assignColors);

/** @module fancyTerminal - a module for colorful terminal output */
var fancyTerminal_1 = fancyTerminal;

/**
 * @function throwError - Error wrapper
 *
 * @param {string} message - error message
 */
function throwError(message) {
  var errorTemplate = (fancyTerminal_1.redBg('[xmlhttprequest-jest-mock]:')) + " " + message;
  throw Error(errorTemplate);
}

/** @module utils - a module for utilities */
var utils = { throwError: throwError };

/**
 * @function mainMock - main entry for our mock functionality
 *
 * @returns {Object} - object that can be used for further testing
 */
function mainMock() {
  if (typeof window === 'undefined') {
    utils.throwError('window is not defined');
  }

  // variables for request related checks
  var readyState = 4;
  var status = 200;
  var responseText = { message: 'this data is sent from mocked XMLHttpRequest' };

  // functions augmented with jest build in mock abilities
  var open = jest.fn();
  var onreadystatechange = jest.fn();
  var send = jest.fn(function send() {
    this.onreadystatechange();
  });

  /**
   * @function addEventListener - dummy function to change
   * onreadystatechange content
   *
   * @param {string} e - event name
   * @param {Function} c - callback
   */
  var addEventListener = jest.fn(function addEventListener(e, c) {
    this.onreadystatechange = c;
  });


  /**
   * @function setData - set data to return on next request
   *
   * @param {any} newData - data to be returned as response
   * @param {number} [newStatus=200] - new status for response
   * @param {number} [newReadyState=4] - new status for readystate
   */
  function setData(newData, newStatus, newReadyState) {
    if ( newStatus === void 0 ) newStatus = 200;
    if ( newReadyState === void 0 ) newReadyState = 4;

    responseText = newData;
    status = newStatus;
    readyState = newReadyState;
  }

  /**
   * @function cleanUp - clean up mocked implementation
   */
  function cleanUp() {
    if (window.XMLHttpRequest) {
      delete window.XMLHttpRequest;
    }
  }

  // mock constructor that will replace window XMLHttpRequest
  function mockConstructor() {
    return {
      readyState: readyState,
      status: status,
      responseText: responseText,
      open: open,
      onreadystatechange: onreadystatechange,
      addEventListener: addEventListener,
      send: send,
    };
  }

  // override/define XMLHttpRequest
  window.XMLHttpRequest = mockConstructor;

  // returning necessary methods for further testing and functionality
  return {
    open: open,
    onreadystatechange: onreadystatechange,
    addEventListener: addEventListener,
    cleanUp: cleanUp,
    setData: setData,
    send: send,
  };
}

module.exports = mainMock;
