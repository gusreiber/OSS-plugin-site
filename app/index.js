import createAppStore from './createAppStore';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import Application from './Application';
import App from './App';
import Main from './components/Main';
import PluginDetail from './components/PluginDetail';

import React from 'react';

const store = createAppStore();

render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Application} />
          <Route path="/main" component={Main} />
          <Route path="/:pluginName" component={PluginDetail} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('grid-box')
);
