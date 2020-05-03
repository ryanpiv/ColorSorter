import React from 'react';

export const NavHistoryColor = ({ ...props }) => {
  const { setClipboardColor, color } = props;

  const handleColorClick = () => {
    setClipboardColor(color);
  }

  return (
    <li className="nav__li nav__color"
      style={{
        backgroundColor: `${color.hex}`,
      }}
      onClick={handleColorClick} >
      {color.hex}
    </li>
  );
}

export default NavHistoryColor;
