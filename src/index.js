import React from 'react';
import { render } from 'react-dom';
import App from './app/layout/App';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  rootEl
);
