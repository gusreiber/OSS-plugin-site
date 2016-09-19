import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Main from './components/Main';
import PluginDetail from './components/PluginDetail';
import { loadInitialData } from './actions';
import configureStore from './store/configureStore';

const store = configureStore();

store.dispatch(loadInitialData());

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/:pluginName" component={PluginDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('grid-box')
);
