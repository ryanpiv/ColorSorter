export const colorObj = (hexVal, colorName) => {
  return {
    hexVal,
    colorName,
  }
};

export const constructColor = (colorObj) => {
  let { hexVal } = colorObj;
  /* Get the RGB values to calculate the Hue. */
  var r = colorObj.r || parseInt(hexVal.substring(0, 2), 16) / 255;
  var g = colorObj.g || parseInt(hexVal.substring(2, 4), 16) / 255;
  var b = colorObj.b || parseInt(hexVal.substring(4, 6), 16) / 255;

  /* Getting the Max and Min values for Chroma. */
  var max = Math.max.apply(Math, [r, g, b]);
  var min = Math.min.apply(Math, [r, g, b]);

  /* Variables for HSV value of hex color. */
  var chr = max - min;
  var hue = 0;
  var val = max;
  var sat = 0;

  if (val > 0) {
    /* Calculate Saturation only if Value isn't 0. */
    sat = chr / val;
    if (sat > 0) {
      if (r == max) {
        hue = 60 * (((g - min) - (b - min)) / chr);
        if (hue < 0) {
          hue += 360;
        }
      } else if (g == max) {
        hue = 120 + 60 * (((b - min) - (r - min)) / chr);
      } else if (b == max) {
        hue = 240 + 60 * (((r - min) - (g - min)) / chr);
      }
    }
  }
  colorObj.chroma = chr;
  colorObj.hue = hue;
  colorObj.sat = sat;
  colorObj.val = val;
  colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
  colorObj.red = parseInt(hexVal.substring(0, 2), 16);
  colorObj.green = parseInt(hexVal.substring(2, 4), 16);
  colorObj.blue = parseInt(hexVal.substring(4, 6), 16);
  // colorObj.rgb =
  return colorObj;
};

export const sortColorsByHue = (colors) => {
  return colors.sort(function (a, b) {
    return a.hue - b.hue;
  });
};
