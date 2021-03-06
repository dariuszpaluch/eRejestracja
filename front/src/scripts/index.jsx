import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';

import Routes from './components/Routes';
import Store from './store';
import ReduxDevTools from './ReduxDevTools';

//injectTapEventPlugin();

import 'styles/index';
import 'styles/calendar-default';
import 'styles/calendar';
let reduxDevTools = '';

if (process.env.NODE_ENV === 'development') {
  reduxDevTools = (
    <ReduxDevTools store={ Store } />
  );
}

ReactDOM.render(
  <div>
    <Provider store={ Store }>
      <Routes />
    </Provider>
    { reduxDevTools }
  </div>,
  document.getElementById('root')
);
