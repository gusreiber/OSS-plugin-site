import keymirror from 'keymirror';
import Api from '../commons/api';

export const ACTION_TYPES = keymirror({
  // == UI related
  // Parse query params
  PARSE_QUERY_PARAMS: null,
  // Query string
  CLEAR_QUERY: null,
  SET_QUERY: null,
  // Fetching search results
  SET_IS_FETCHING: null,
  // Search results
  CLEAR_CRITERIA: null,
  SET_SEARCH_RESULTS: null,
  // Sort
  SET_SORT: null,
  // Category
  SET_CATEGORY: null,
  TOGGLE_CATGORY: null,
  // Label
  TOGGLE_LABEL: null,
  // Show filter
  TOGGLE_SHOW_FILTER: null,
  // Page
  SET_PAGE: null,
  // View
  SET_VIEW: null,
  // Plugin
  SET_PLUGIN: null,
  // First visit
  CLEAR_FIRST_VISIT: null,
  // == Data related
  SET_DATA: null
});

export const actions = {

  parseQueryParams: (queryParams) => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.PARSE_QUERY_PARAMS,
        queryParams: queryParams
      };
      dispatch(action);
      if (Object.keys(queryParams).length > 0) {
        return dispatch(actions.search());
      }
    };
  },

  clearQuery: () => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.CLEAR_QUERY
      };
      dispatch(action);
      return dispatch(actions.search());
    };
  },

  setQuery: (query) => ({ type: ACTION_TYPES.SET_QUERY, query: query }),

  clearIsFetching: () => ({ type: ACTION_TYPES.CLEAR_IS_FETCHING }),

  setIsFetching: () => ({ type: ACTION_TYPES.SET_IS_FETCHING }),

  clearCriteria: () => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.CLEAR_CRITERIA
      };
      dispatch(action);
      return dispatch(actions.search({ resetPage: true }));
    };
  },

  setSearchResults: (results) => ({ type: ACTION_TYPES.SET_SEARCH_RESULTS, results: results }),

  setSort: (sort) => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.SET_SORT,
        sort: sort
      };
      dispatch(action);
      return dispatch(actions.search());
    };
  },

  setCategory: (categoryId) => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.SET_CATEGORY,
        categoryId: categoryId
      };
      dispatch(actions.clearCriteria());
      dispatch(action);
      return dispatch(actions.search());
    };
  },

  toggleCategory: (category) => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.TOGGLE_CATGORY,
        category: category
      };
      dispatch(action);
      return dispatch(actions.search());
    };
  },

  toggleLabel: (label, categoryId) => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.TOGGLE_LABEL,
        label: label,
        categoryId: categoryId
      };
      dispatch(action);
      return dispatch(actions.search());
    };
  },

  toggleShowFilter: (opts = { forceOpen: false }) => ({ type: ACTION_TYPES.TOGGLE_SHOW_FILTER, opts: opts }),

  setPage: (page) => {
    return (dispatch) => {
      const action = {
        type: ACTION_TYPES.SET_PAGE,
        page: page
      };
      dispatch(action);
      return dispatch(actions.search());
    };
  },

  setView: (view) => ({ type: ACTION_TYPES.SET_VIEW, view: view }),

  setData: (data) => ({ type: ACTION_TYPES.SET_DATA, data: data }),

  search: (opts = { resetPage: false }) => {
    return (dispatch, getState) => {
      dispatch(actions.setIsFetching());
      const state = getState().ui;
      const { activeCategories, activeLabels, limit, query, sort } = state;
      const page = opts.resetPage ? 1 : state.page;
      return Api.getPlugins(query, activeCategories, activeLabels, sort, page, limit)
        .then(results => dispatch(actions.setSearchResults(results)));
    };
  },

  getPlugin: (name) => {
    return (dispatch) => Api.getPlugin(name).then(data => dispatch(actions.setPlugin(data)));
  },

  setPlugin: (plugin) => ({ type: ACTION_TYPES.SET_PLUGIN, plugin: plugin }),

  loadInitialData: () => {
    return (dispatch) => {
      return Api.getInitialData().then(data => dispatch(actions.setData(data)));
    };
  },

  clearFirstVisit: () => ({ type: ACTION_TYPES.CLEAR_FIRST_VISIT })

};
