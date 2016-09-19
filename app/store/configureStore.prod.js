import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

const configureStore = () => {
  return createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware
    )
  );
};

export default configureStore;
