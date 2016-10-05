import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Main from './components/Main';
import PluginDetail from './components/PluginDetail';
import { actions } from './actions';
import configureStore from './store/configureStore';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(actions.loadInitialData());

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/:pluginName" component={PluginDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('grid-box')
);
