/**
 * @function browserRequestOn - request wrapper module for
 * XMLHttpRequest calls which uses on event approach
 *
 * @param {string} target - target url
 * @param {function} callback - callback function
 */
export function browserRequestOn(target, callback) {
  const request = new XMLHttpRequest();

  request.onreadystatechange = function onreadystatechange() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        callback(request.responseText);
      } else callback({ error: { status: this.status } });
    } else callback({ error: { readyState: this.readyState } });
  };
  request.open('GET', target, false);
  request.send();
}

/**
 * @function browserRequestEvent - request wrapper module for
 * XMLHttpRequest calls which uses addevent approach
 *
 * @param {string} target - target url
 * @param {function} callback - callback function
 */
export function browserRequestEvent(target, callback) {
  const request = new XMLHttpRequest();

  request.addEventListener('readystatechange', function addEventListener() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        callback(request.responseText);
      } else callback({ error: { status: this.status } });
    } else callback({ error: { readyState: this.readyState } });
  });
  request.open('GET', target, false);
  request.send();
}
