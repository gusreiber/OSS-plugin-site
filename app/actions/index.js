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
  // == Data related
  SET_DATA: null
});

export const parseQueryParams = (queryParams) => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.PARSE_QUERY_PARAMS,
      queryParams: queryParams
    };
    dispatch(action);
    if (Object.keys(queryParams).length > 0) {
      dispatch(search());
    }
  };
};

export const clearQuery = () => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.CLEAR_QUERY
    };
    dispatch(action);
    dispatch(search());
  };
};

export const setQuery = (query) => {
  return {
    type: ACTION_TYPES.SET_QUERY,
    query: query
  };
};

export const clearIsFetching = () => {
  return {
    type: ACTION_TYPES.CLEAR_IS_FETCHING
  };
};

export const setIsFetching = () => {
  return {
    type: ACTION_TYPES.SET_IS_FETCHING
  };
};

export const clearCriteria = () => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.CLEAR_CRITERIA
    };
    dispatch(action);
    dispatch(search({ resetPage: true }));
  };
};

export const setSearchResults = (results) => {
  return {
    type: ACTION_TYPES.SET_SEARCH_RESULTS,
    results: results
  };
};

export const setSort = (sort) => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.SET_SORT,
      sort: sort
    };
    dispatch(action);
    dispatch(search());
  };
};

export const setCategory = (categoryId) => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.SET_CATEGORY,
      categoryId: categoryId
    };
    dispatch(clearCriteria());
    dispatch(action);
    dispatch(search());
  };
};

export const toggleCategory = (category) => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.TOGGLE_CATGORY,
      category: category
    };
    dispatch(action);
    dispatch(search());
  };
};

export const toggleLabel = (label, categoryId) => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.TOGGLE_LABEL,
      label: label,
      categoryId: categoryId
    };
    dispatch(action);
    dispatch(search());
  };
};

export const toggleShowFilter = (opts = { forceOpen: false }) => {
  return {
    type: ACTION_TYPES.TOGGLE_SHOW_FILTER,
    opts: opts
  };
};

export const setPage = (page) => {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.SET_PAGE,
      page: page
    };
    dispatch(action);
    dispatch(search());
  };
};

export const setView = (view) => {
  return {
    type: ACTION_TYPES.SET_VIEW,
    view: view
  };
};

export const setData = (data) => {
  return {
    type: ACTION_TYPES.SET_DATA,
    data: data
  };
};

export const search = (opts = { resetPage: false }) => {
  return (dispatch, getState) => {
    dispatch(setIsFetching());
    const state = getState().ui;
    const { activeCategories, activeLabels, limit, query, sort } = state;
    const page = opts.resetPage ? 1 : state.page;
    Api.getPlugins(query, activeCategories, activeLabels, sort, page, limit)
      .then(results => dispatch(setSearchResults(results)));
  };
};

export const getPlugin = (name) => {
  return (dispatch) => {
    Api.getPlugin(name).then(data => dispatch(setPlugin(data)));
  }
}

export const setPlugin = (plugin) => {
  return {
    type: ACTION_TYPES.SET_PLUGIN,
    plugin: plugin
  };
};

export const loadInitialData = (callback) => {
  return (dispatch) => {
    Api.getInitialData().then(data => dispatch(setData(data))).then(callback);
  };
};
