import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import App from './containers/App';
import Main from './components/Main';
import PluginDetail from './components/PluginDetail';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route path="/:pluginName" component={PluginDetail} />
    </Route>
  </Router>,
  document.getElementById('grid-box')
);
