import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { store } from './store/index';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
const themes = {
  default: {
    darkBlue: '#1755B1',
    blue: '#A5DCF4',
    white: '#E5F4E3',
    yellow: '#FFF07C',
    darkYellow: '#FDE95C'
  }
};
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={themes.default}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
