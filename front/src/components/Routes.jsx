import React from 'react';
import {
  Router,
  Route,
  browserHistory
} from 'react-router';
import Paths from '../constants/PathsConstants';

import App from './App';

import Login from './views/login';
import Navigation from './views/navigation';

// smart components

browserHistory.listen((location) => {
  // Use setTimeout to make sure this runs after React Router's own listener
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    let notScroll = false;

    if (location.state && location.state.notScroll) {
      notScroll = true;
    }
    if (location.action === 'POP' || notScroll) {
      return;
    }
    // In all other cases, scroll to top
    window.scrollTo(0, 0);
  });
});

export default class Routes extends React.Component {

  render() {
    return (
      <Router history={ browserHistory }>
        <Route
          path={ Paths.root }
          component={ App }
        >
          <Route
            path={ Paths.navigation }
            component={ Navigation }
          />
          <Route
            path={ Paths.login }
            component={ Login }
          />
        </Route>
      </Router>
    );
  }
}
