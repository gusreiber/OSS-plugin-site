import keymirror from 'keymirror';
import Api from '../commons/api';

export const ACTION_TYPES = keymirror({
  // == UI related
  // Query string
  CLEAR_QUERY: null,
  SET_QUERY: null,
  // Fetching search results
  SET_IS_FETCHING: null,
  // Search results
  SET_SEARCH_RESULTS: null,
  // Sort
  SET_SORT: null,
  // Category
  TOGGLE_CATGORY: null,
  // Label
  TOGGLE_LABEL: null,
  // Show filter
  TOGGLE_SHOW_FILTER: null,
  // Page
  SET_PAGE: null,
  // View
  SET_VIEW: null,
  // == Data related
  SET_DATA: null
});

export const clearQuery = () => {
  return {
    type: ACTION_TYPES.CLEAR_QUERY
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

export const setSearchResults = (results) => {
  return {
    type: ACTION_TYPES.SET_SEARCH_RESULTS,
    results: results
  };
};

export function setSort(sort) {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.SET_SORT,
      sort: sort
    };
    dispatch(action);
    dispatch(search());
  };
}

export function toggleCategory(category) {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.TOGGLE_CATGORY,
      category: category
    };
    dispatch(action);
    dispatch(search());
  };
}

export function toggleLabel(label) {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.TOGGLE_LABEL,
      label: label
    };
    dispatch(action);
    dispatch(search());
  };
}

export const toggleShowFilter = (opts) => {
  return {
    type: ACTION_TYPES.TOGGLE_SHOW_FILTER,
    opts: opts
  };
};

export function setPage(page) {
  return (dispatch) => {
    const action = {
      type: ACTION_TYPES.SET_PAGE,
      page: page
    };
    dispatch(action);
    dispatch(search());
  };
}

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

export function search(opts = { resetPage: false }) {
  return (dispatch, getState) => {
    dispatch(setIsFetching());
    const state = getState().ui;
    const { activeCategories, activeLabels, limit, query, sort } = state;
    const page = opts.resetPage ? 1 : state.page;
    Api.getPlugins(query, activeCategories, activeLabels, sort, page, limit)
      .then(results => dispatch(setSearchResults(results)));
  };
}

export const loadInitialData = () => {
  return (dispatch) => {
    Api.getInitialData().then(data => dispatch(setData(data)));
  };
};
