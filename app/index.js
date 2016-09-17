import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './containers/App';
import Main from './components/Main';
import PluginDetail from './components/PluginDetail';
import reducer from './reducers';
import { loadInitialData } from './actions';

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

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
