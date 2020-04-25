import React from 'react';
import Nav from './components/Nav';
import ColorCell from './components/ColorCell';

function ColorSorter() {
  return (
    <main class="main">
      <div class="c-copy l-flex l-absolute-center u-height-0 u-width-0">
        <span class="c-copy__value-container l-flex l-absolute-center">
          <p class="c-copy__value"></p>
        </span>
      </div>
      <Nav />
      <div class="c-grid l-flex u-width-100 u-height-100-vh js-grid">
        <ColorCell />
      </div>
    </main>
  );
}

export default ColorSorter;
