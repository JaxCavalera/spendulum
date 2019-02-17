import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// Router Wrapped Container
import { App } from './container/App';

// Styles
import './index.css';

// Optional Progressive Web App Support - currently unused
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
