import React from 'react';
import ReactDOM from 'react-dom';

// adding in CSS
import './css/index.css';
import './css/App.css';
import './css/flex.css';
import "./css/404.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
