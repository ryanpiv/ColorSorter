import Chroma from 'chroma-js';
import { firstBy } from "thenby";

export const colorObj = (hexVal, name) => {
  return {
    hexVal,
    name,
  }
};

const threeToSixDigitHex = (hexVal) => {
  return `${hexVal.substring(0, 1)}${hexVal.substring(0, 1)}${hexVal.substring(1, 2)}${hexVal.substring(1, 2)}${hexVal.substring(2, 3)}${hexVal.substring(2, 3)}`;
}

export const constructColor = (colorObj) => {
  let hexVal = colorObj.hexVal.length < 6 ? threeToSixDigitHex(colorObj.hexVal) : colorObj.hexVal;

  colorObj.hexVal = hexVal;
  colorObj.hsl = Chroma(hexVal).hsl();
  colorObj.rgb = Chroma(hexVal).rgb();
  colorObj.red = parseInt(hexVal.substring(0, 2), 16);
  colorObj.green = parseInt(hexVal.substring(2, 4), 16);
  colorObj.blue = parseInt(hexVal.substring(4, 6), 16);
  return colorObj;
};

export const sortColors = (colors) => {
  return colors.sort(
    firstBy((a, b) => {
      return a.hsl[0] - b.hsl[0];
    }).thenBy((a, b) => {
      return a.hsl[1] - b.hsl[1];
    }).thenBy((a, b) => {
      return a.hsl[2] - b.hsl[2];
    }).thenBy((a, b) => {
      return a.hsl[3] - b.hsl[3];
    })
  )
};
