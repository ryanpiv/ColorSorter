import React from 'react';

export const NavHistoryColor = ({ ...props }) => {
  const { setClipboardColor, color } = props;

  const handleColorClick = () => {
    console.log(color);
    setClipboardColor(color);
  }

  return (
    <li className="nav__li nav__color"
      onClick={handleColorClick} >
      {color.hexVal}
    </li>
  );
}

export default NavHistoryColor;
