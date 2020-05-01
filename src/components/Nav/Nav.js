import React from 'react';
import NavHistoryColor from './NavHistoryColor';

export const Nav = ({ ...props }) => {
  const { setClipboardColor, colorsHistory, setIsSettingsModalOpen } = props;

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleDownloadClick = () => {
    const colors = JSON.parse(localStorage.getItem('color-sorter')).session.colors;
    const text = colors.map((obj) => {
      return `${obj.name}:#${obj.hexVal}`;
    });

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'colors.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <nav className="nav l-flex l-align-center">
      <ul className="nav__ul l-flex">
        {colorsHistory && colorsHistory.map((color, i) => {
          return <NavHistoryColor
            key={i}
            color={color}
            setClipboardColor={setClipboardColor}
          />
        })}
        <li className="nav__li nav__li--left-auto" onClick={handleDownloadClick}>
          <i className="nav__li-icon nav__li-icon--download"></i>
        </li>
        <li className="nav__li" onClick={handleSettingsClick}>
          <i className="nav__li-icon nav__li-icon--settings"></i>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
