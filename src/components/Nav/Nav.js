import React from 'react';
import NavHistoryColor from './NavHistoryColor';

export const Nav = ({ ...props }) => {
  const { setClipboardColor, colorsHistory, setIsSettingsModalOpen, session } = props;

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleDownloadClick = () => {
    const colors = session && session.colors;
    if (colors && colors.length > 0) {
      const text = colors.map((obj) => {
        return `${obj.name}:${obj.hex}`;
      });

      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', 'colors.txt');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    }
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
        <li className="nav__li nav__li--no-border nav__li--left-auto">
          <a href="https://github.com/RyanPiv/color-sorter" target="_blank" rel="noopener noreferrer" className="nav__li-icon nav__li-icon--github">Github</a>
        </li>
        <li className="nav__li nav__li--no-border" onClick={handleDownloadClick}>
          <i className="nav__li-icon nav__li-icon--download"></i>
        </li>
        <li className="nav__li nav__li--no-border" onClick={handleSettingsClick}>
          <i className="nav__li-icon nav__li-icon--settings"></i>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
