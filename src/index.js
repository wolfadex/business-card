import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faTimes,
  faAddressCard,
  faList,
  faBroadcastTower,
} from '@fortawesome/free-solid-svg-icons';
import App from './components/App';

library.add(faBars, faTimes, faAddressCard, faList, faBroadcastTower);

const rootElement = document.getElementById('root');
const theme = {};

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  rootElement,
);
