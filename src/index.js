import utils from './utils/index';

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
  let readyState = 4;
  let status = 200;
  let responseText = { message: 'this data is sent from mocked XMLHttpRequest' };

  // functions augmented with jest build in mock abilities
  const open = jest.fn();
  const onreadystatechange = jest.fn();
  const send = jest.fn(function send() {
    this.onreadystatechange();
  });

  /**
   * @function addEventListener - dummy function to change
   * onreadystatechange content
   *
   * @param {string} e - event name
   * @param {Function} c - callback
   */
  const addEventListener = jest.fn(function addEventListener(e, c) {
    this.onreadystatechange = c;
  });


  /**
   * @function setData - set data to return on next request
   *
   * @param {any} newData - data to be returned as response
   * @param {number} [newStatus=200] - new status for response
   * @param {number} [newReadyState=4] - new status for readystate
   */
  function setData(newData, newStatus = 200, newReadyState = 4) {
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
      readyState,
      status,
      responseText,
      open,
      onreadystatechange,
      addEventListener,
      send,
    };
  }

  // override/define XMLHttpRequest
  window.XMLHttpRequest = mockConstructor;

  // returning necessary methods for further testing and functionality
  return {
    open,
    onreadystatechange,
    addEventListener,
    cleanUp,
    setData,
    send,
  };
}

/** @module xmlhttprequest-jest-mock */
export default mainMock;
