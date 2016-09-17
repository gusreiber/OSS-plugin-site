import { ACTION_TYPES } from '../actions';

const initialState = {
  categories: [],
  labels: [],
  stats: {
    installed: [],
    trend: [],
    updated: []
  }
};

export const data = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATA:
      return Object.assign({}, state, {
        categories: action.data.categories,
        labels: action.data.labels,
        stats: {
          installed: action.data.installed,
          trend: action.data.trend,
          updated: action.data.updated
        }
      });
    default:
      return state;
  }
};
