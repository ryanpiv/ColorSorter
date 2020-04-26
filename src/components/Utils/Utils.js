/**
 * Finds an HTML element in the DOM
 *
 * @param {NodeList} css The CSS attribute to base the search from
 * @param {Function} parent A parent HTML element to limit scope of the selector
 */
export const $ = (css, parent) => (parent || document).querySelector(css);

/**
 * Selects an array of elements from the document and
 * converts to an array if the first parameter is not a Node List.
 * Otherwise, converts a Node List to an Array.
 *
 * @param {String} css CSS class or attribute selector.
 * @param {String} parent Parent element or document if none provided.
 * @return {Array}
 */
export const $$ = (css, parent) => {
  let nodes = css;
  if (typeof css === 'string') {
    nodes = (parent || document).querySelectorAll(css);
  }
  return Array.prototype.slice.call(nodes, 0);
};

/**
 * Shorthand for traversing node lists
 *
 * @param {NodeList} array The NodeList to traverse
 * @param {Function} callback A callback function to return
 */
export const nodeEach = (array, callback) => [].forEach.call(array, callback);

/**
 * Creates JS event listeners through CSS classes
 *
 * @param {NodeList} eventName The event that should be fired
 * @param {Function} className The class to listen to for changes
 * @param {Function} callback A callback function to return
 */
export const addClassListener = (eventName, className, callback) => {
  const elements = $$(className);
  if (elements && elements.length > 0) {
    elements.forEach((element) => {
      element.addEventListener(eventName, (event) => {
        if (callback) { callback(event); }
      }, false);
    });
  }
};

/**
 * Get cookie by name
 */
export const getCookie = (name) => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
};

export const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
