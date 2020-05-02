import React from 'react';

export const ColorCell = ({ ...props }) => {
  const { color, setClipboardColor, session } = props;
  const displaySettings = session.settings.display;

  const handleClick = () => {
    setClipboardColor(color);
  }

  return (
    <li className="c-color-grid__item l-flex l-absolute-center"
      onClick={handleClick}
      style={{
        backgroundColor: `#${color.hexVal}`,
      }}>
      <span className="c-color-grid__item-text">{color.name}</span>
      {displaySettings.hex.checked &&
        <span className="c-color-grid__item-text">#{color.hexVal}</span>
      }
      {displaySettings.rgb.checked &&
        <span className="c-color-grid__item-text">rgb({color.rgb && `${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]}`})</span>
      }
      {displaySettings.hsl.checked &&
        <span className="c-color-grid__item-text">hsl({color.hsl && `${color.hsl[0]},\n${color.hsl[1]},\n${color.hsl[2]}\n${color.hsl[3]}`})</span>
      }
    </li >
  );
}

export default ColorCell;
