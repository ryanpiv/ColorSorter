import React from 'react';
import NavHistoryColor from './NavHistoryColor';

export const Nav = ({ ...props }) => {
  const { setClipboardColor, colorsHistory } = props;

  return (
    <nav className="nav l-flex l-align-center">
      <ul className="nav__ul l-flex">
        <li className="nav__li  nav__brand">
          JSON Color Picker
        </li>
        <li className="nav__li nav__li-settings">
          <i className="nav__li-settings--icon"></i>
        </li>
        {colorsHistory && colorsHistory.map((color, i) => {
          return <NavHistoryColor
            key={i}
            color={color}
            setClipboardColor={setClipboardColor}
          />
        })}
      </ul>
    </nav>
  );
}

export default Nav;
