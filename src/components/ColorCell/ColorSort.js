import Chroma from 'chroma-js';
import { firstBy } from "thenby";

export const constructColor = (colorObj) => {
  const { color } = colorObj;
  colorObj.hex = Chroma(color).hex();
  colorObj.hsl = Chroma(color).hsl();
  colorObj.rgb = Chroma(color).rgb();

  colorObj.hsl[0] = Math.round(colorObj.hsl[0]) || 0;
  colorObj.hsl[1] = Math.round(colorObj.hsl[1] * 100);
  colorObj.hsl[2] = Math.round(colorObj.hsl[2] * 100);
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
