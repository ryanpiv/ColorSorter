import React from 'react';

export const Nav = () => {
  return (
    <nav class="nav l-flex l-align-center">
      <ul class="nav__ul l-flex">
        <li class="nav__li  nav__brand">
          JSON Color Picker
        </li>
        <li class="nav__li nav__li-settings">
          <i class="nav__li-settings--icon"></i>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
