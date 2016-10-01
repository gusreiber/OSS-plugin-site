import React from 'react';
import express from 'express';
import path from 'path';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { loadInitialData } from './app/actions';
import routes from './app/routes';
import configureStore from './app/store/configureStore';

const app = express();
const port = 5000;

app.set('x-powered-by', false);
app.set('view engine', 'hbs');
app.use('/assets/css', express.static('./public/css'));
app.use('/assets/js', express.static('./dist/client'));

app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error(`Error - ${error}`);
      return res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.error(`Redirect - ${redirectLocation.pathname}/${redirectLocation.search}`);
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      console.error(`Found ${req.url}`);
      const store = configureStore();
      const callback = () => {
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
      }
      store.dispatch(loadInitialData(callback));
    } else {
      console.error(`${req.url} not found`);
      return res.status(404).send('Not found')
    }
  })
});

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==>  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});
