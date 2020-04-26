/**
 * Converts a single rgb value to hex
 *
 * @param {c} string Color value
 * @return {string}
 */
export const componentToHex = (c) => {
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
export const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Parses rgb string for values
 *
 * @param {rgb} string rgb value
 * @return {string}
 */
export const hexFromRGB = (rgb) => {
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

export const hexOrRgbMatch = (hexValue) => {
  return hexValue.match(/[^:|#]+(?=;)/g);
};

export const sassVarMatch = (sassVar) => {
  return sassVar.match(/[^$]+(?=:)/g);
}
