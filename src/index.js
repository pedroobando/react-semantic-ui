import React from 'react';
import { render } from 'react-dom';

import App from './app/layout/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
// import { loadEvent } from './features/events/eventActions';

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';

const rootEl = document.getElementById('root');
const store = configureStore();

// dispara la carga de datos (Events)
// store.dispatch(loadEvent());

// console.log(store.getState());

render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </Provider>,
  rootEl
);
