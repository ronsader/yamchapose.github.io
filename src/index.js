import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import configureStore from './configureStore';
import App from './App';
import './App/App.css';

//GA
ReactGA.initialize('UA-135473318-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
