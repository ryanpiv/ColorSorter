import React from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/main.scss';
import ColorSorter from './ColorSorter';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import initialState from './initialState';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ColorSorter props={initialState} />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
