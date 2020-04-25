/**
 * Finds an HTML element in the DOM
 *
 * @param {NodeList} css The CSS attribute to base the search from
 * @param {Function} parent A parent HTML element to limit scope of the selector
 */
const $ = (css, parent) => (parent || document).querySelector(css);

/**
 * Selects an array of elements from the document and
 * converts to an array if the first parameter is not a Node List.
 * Otherwise, converts a Node List to an Array.
 *
 * @param {String} css CSS class or attribute selector.
 * @param {String} parent Parent element or document if none provided.
 * @return {Array}
 */
const $$ = (css, parent) => {
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
const nodeEach = (array, callback) => [].forEach.call(array, callback);

/**
 * Creates JS event listeners through CSS classes
 *
 * @param {NodeList} eventName The event that should be fired
 * @param {Function} className The class to listen to for changes
 * @param {Function} callback A callback function to return
 */
const addClassListener = (eventName, className, callback) => {
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
const getCookie = (name) => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
};

/**
 * Converts a single rgb value to hex
 *
 * @param {c} string Color value
 * @return {string}
 */
const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

/**
 * Creates hex string from rgb values
 *
 * @param {r} string Red value
 * @param {g} string Green value
 * @param {b} string Blue value
 * @return {string}
 */
const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Parses rgb string for values
 *
 * @param {rgb} string rgb value
 * @return {string}
 */
const hexFromRGB = (rgb) => {
  rgb = rgb.slice(4, rgb.length - 1);

  let comma = rgb.indexOf(',');
  const r = parseInt(rgb.substring(0, comma));

  rgb = rgb.slice(comma + 2, rgb.length);
  comma = rgb.indexOf(',');
  const g = parseInt(rgb.substring(0, comma));

  rgb = rgb.slice(comma + 2, rgb.length);
  const b = parseInt(rgb.substring(0, rgb.length));

  return rgbToHex(r, g, b);
}

/* TO DO: local storage utils */
