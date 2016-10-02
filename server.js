import React from 'react';
import express from 'express';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import routes from './app/routes';
import configureStore from './app/store/configureStore';

const app = express();
const port = 5000;

app.set('x-powered-by', false);
app.set('view engine', 'hbs');
app.use('/assets/css', express.static('./public/css'));
app.use('/assets/js', express.static('./dist/client'));

app.get('*', (req, res, next) => {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error(`Error - ${error}`);  // eslint-disable-line no-console
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      console.info(`Redirect - ${redirectLocation.pathname}/${redirectLocation.search}`); // eslint-disable-line no-console
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      console.info(`Found ${req.url}`); // eslint-disable-line no-console
      const store = configureStore();
      const component = renderProps.components[renderProps.components.length - 1].WrappedComponent;
      // Should the component have a static method `fetchData({ store, location, params, history })` then
      // be prepared to call it.
      const fetchData = (component && component.fetchData) || (() => Promise.resolve());
      const { location, params, history } = renderProps;
      fetchData({ store, location, params, history }).then(() => {
        const rendered = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = JSON.stringify(store.getState()).replace(/</g, '\\x3c');
        return res.status(200).render('index', {
          rendered: rendered,
          reduxState: finalState
        });
      }).catch((err) => next(err));
    } else {
      console.error(`${req.url} not found`);  // eslint-disable-line no-console
      return res.status(404).send('Not found');
    }
  });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info(`==>  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`); // eslint-disable-line no-console
  }
});
