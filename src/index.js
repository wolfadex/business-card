import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'emotion';
import { ThemeProvider } from 'emotion-theming';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faTimes,
  faAddressCard,
  faList,
  faBroadcastTower,
  faSignOutAlt,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import App from './components/App';

library.add(
  faBars,
  faTimes,
  faAddressCard,
  faList,
  faBroadcastTower,
  faSignOutAlt,
  faSync,
);
injectGlobal`
  * {
    font-family: sans-serif;
    color: #4D5057;
  }

  body {
    margin: 0;
    background-color: #9Bc1BC;
  }

  button {
    cursor: pointer;
    background: none;
  }
`;

const rootElement = document.getElementById('root');
const theme = {
  primary: '#F98948',
  secondary: '#9BC1BC',
  black: '#4D5057',
  brown: '#694E32',
  green: '#4E6E5D',
};

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement,
);
