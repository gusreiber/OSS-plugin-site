import { createSelector } from 'reselect';
import Immutable, { Record }from 'immutable';
import keymirror from 'keymirror';
import { api, logger } from './commons';
import fetch from 'isomorphic-fetch';

require('es6-promise').polyfill();

api.init({
  latency: 100
});

export const SearchOptions = Record({
  limit: 50,
  page: 1,
  pages: 0,
  total: 0
});

export const Stats = Record({
  installations: null,
  installationsPerVersion: null,
  installationsPercentage: null,
  installationsPercentagePerVersion: null,
  name: null,
});

export const Plugin = Record({
  id: null,
  name: null,
  title: null,
  buildDate: null,
  releaseTimestamp: null,
  version: null,
  previousVersion: null,
  previousTimestamp: null,
  compatibleSinceVersion: null,
  scm: null,
  url: null,
  sha1: null,
  wiki: Wiki,
  excerpt: null,
  iconDom: null,
  download:null,
  trend:null,
  category: null,
  requiredCore: null,
  developers: [],
  labels: [],
  categories:[],
  dependencies: [],
  stats: Stats,
  detail:null,
});

export const Wiki = Record({
  content: null,
  url: null
});

export const State = Record({
  plugins: null,
  plugin: Plugin,
  isFetching: false,
  labels: null,
  categories:null,
  labelFilter: Record({//fixme: that should become label: search, sort: field
    field: 'title',
    searchField: null,
    asc: false,
    search: []
  }),
  searchOptions: SearchOptions,
});

// fetch helper
const fetchOptions = { credentials: 'same-origin' };
function checkStatus(response) {
  if (response.status >= 300 || response.status < 200) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function parseJSON(response) {
  return response.json();
}

export const ACTION_TYPES = keymirror({
  CLEAR_PLUGINS_DATA: null,
  FETCH_PLUGINS_DATA: null,
  SET_PLUGINS_DATA: null,
  SET_PLUGIN_DATA: null,
  CLEAR_PLUGIN_DATA: null,
  SET_LABEL_FILTER: null,
  SET_LABELS: null,
  SET_CATEGORIES: null,
  SET_QUERY_INFO: null
});

export const actionHandlers = {
  [ACTION_TYPES.CLEAR_PLUGIN_DATA](state) {
    return state.set('plugin', null);
  },
  [ACTION_TYPES.SET_PLUGIN_DATA](state, { payload: record }){
    return state.set('plugin', record);
  },
  [ACTION_TYPES.CLEAR_PLUGINS_DATA](state) {
    return state.set('plugins', Immutable.Map());
  },
  [ACTION_TYPES.FETCH_PLUGINS_DATA](state, {}){
    return state.set('isFetching', !state.isFetching);
  },
  [ACTION_TYPES.SET_PLUGINS_DATA](state, { payload }){
    return state.set('plugins', payload);
  },
  [ACTION_TYPES.SET_LABELS](state, { payload }){
    return state.set('labels', payload);
  },
  [ACTION_TYPES.SET_CATEGORIES](state, { payload }){
    return state.set('categories', payload);
  },
  [ACTION_TYPES.SET_QUERY_INFO](state, { payload }){
    return state.set('searchOptions', payload);
  }
};

export const actions = {

  clearPluginsData: () => ({ type: ACTION_TYPES.CLEAR_PLUGINS_DATA }),
  clearPluginData: () => ({ type: ACTION_TYPES.CLEAR_PLUGINS_DATA }),

  fetchPluginData: () => ({ type: ACTION_TYPES.FETCH_PLUGINS_DATA }),

  getPlugin: (name) => {
    return (dispatch, getState) => {
      dispatch({ type: ACTION_TYPES.CLEAR_PLUGIN_DATA });
      const plugins = getState().resources.plugins;
      let plugin;
      if (plugins) {
        plugin = plugins.filter((plugin) => plugin.name === name);
      }

      const url = `/plugin/${name}`;

      return fetch(url, fetchOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
          const record = new Plugin(data);
          dispatch({
            type: ACTION_TYPES.SET_PLUGIN_DATA,
            payload: record,
          });
        });
    };
  },

  generateCategoryData: () =>{
    return (dispatch) => {
      return api.getJSON('/categories', (error, data) => {
        if (data && data.categories){
          dispatch({
            type: ACTION_TYPES.SET_CATEGORIES,
            payload: Immutable.List(data.categories)
          });
        }
      })
    };
  },

  generateLabelData: () => {
    return (dispatch) => {
      return api.getJSON('/labels',(error, data) => {
        if (data && data.labels) {
          dispatch({
            type: ACTION_TYPES.SET_LABELS,
            payload: Immutable.List(data.labels)
          });
        }
      });
    };
  },

  generatePluginData(query={}) {
    return (dispatch) => {
      let page = query.page || 1;
      let PLUGINS_URL = `/plugins?page=${page}`;
     ['limit', 'q', 'sort', 'asc', 'categories', 'labels']
        .filter(item => query[item])
        .map(item => PLUGINS_URL += `&${item}=${query[item]}`);
      logger.log(query, PLUGINS_URL);
      dispatch(actions.clearPluginsData());
      dispatch(actions.fetchPluginData());

      return api.getJSON(PLUGINS_URL,(error, data) => {
        if (data) {
          const searchOptions = new SearchOptions({
            limit: data.limit,
            page: data.page,
            pages: data.pages,
            total: data.total
          });

          const items = data.plugins.map(item => new Plugin(item));
          const recordsMap = Immutable.OrderedSet(items);
          dispatch({
            type: ACTION_TYPES.SET_PLUGINS_DATA,
            payload: recordsMap
          });
          dispatch({
            type: ACTION_TYPES.SET_QUERY_INFO,
            payload: searchOptions
          });
          dispatch(actions.fetchPluginData());
        }
      });
    };
  }
};

export const resources = state => state.resources;
export const plugins = createSelector([resources], resources => resources.plugins);
export const labels = createSelector([resources], resources => resources.labels);
export const categories = createSelector([resources], resources => resources.categories);
export const plugin = createSelector([resources], resources => resources.plugin);
export const searchOptions = createSelector([resources], resources => resources.searchOptions);

export const isFetching = createSelector([resources], resources => resources.isFetching);

export const totalSize = createSelector(
  [ searchOptions ],
  ( searchOptions ) => {
    return searchOptions.total || 0;
  }
);

export const filterVisibleList = createSelector (
  [plugins],
  (plugins) => {
    return plugins;
  }
);

export const getVisiblePluginsLabels = createSelector(
  [ filterVisibleList ],
  ( plugins ) => plugins ? groupAndCountLabels(plugins) : new Immutable.List());

export function reducer(state = new State(), action){
  const { type } = action;
  if (type in actionHandlers) {
    return actionHandlers[type](state, action);
  } else {
    return state;
  }
}

export { createSelector } from 'reselect';
export { connect } from 'react-redux';
