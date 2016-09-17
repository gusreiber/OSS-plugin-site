import { ACTION_TYPES } from '../actions';

const initialState = {
  activeCategories: [],
  activeLabels: [],
  activeQuery: '',
  categories: [],
  installed: [],
  isFetching: false,
  isFiltered: false,
  labels: [],
  limit: 50,
  page: 1,
  pages: 1,
  plugins: [],
  query: '',
  showFilter: false,
  showResults: false,
  sort: 'relevance',
  total: 0,
  trend: [],
  updated: [],
  view: 'Tiles'
};

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CLEAR_QUERY:
      return Object.assign({}, state, {
        query: ''
      });
    case ACTION_TYPES.SET_QUERY:
      return Object.assign({}, state, {
        query: action.query
    });
    case ACTION_TYPES.SET_IS_FETCHING:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ACTION_TYPES.SET_SEARCH_RESULTS:
      return Object.assign({}, state, {
        activeQuery: state.query,
        isFetching: false,
        page: action.results.page,
        pages: action.results.pages,
        plugins: action.results.plugins,
        showFilter: true,
        showResults: true,
        total: action.results.total
      });
    case ACTION_TYPES.SET_SORT:
      return Object.assign({}, state, {
        sort: action.sort
      });
    case ACTION_TYPES.TOGGLE_CATGORY: {
      const category = action.category;
      const { activeCategories, activeLabels } = state;
      const checked = activeCategories.find((active) => active === category.id) !== undefined;
      const newActiveCategories = checked ?
        // Remove category and its labels
        activeCategories.filter((active) => active !== category.id) :
        // Add category but remove its labels.
        activeCategories.concat(category.id);
      const newActiveLabels = activeLabels.filter((active) => !category.labels.includes(active));
      return Object.assign({}, state, {
        activeCategories: newActiveCategories,
        activeLabels: newActiveLabels
      });
    }
    case ACTION_TYPES.TOGGLE_LABEL: {
      const label = action.label;
      const categoryId = action.categoryId;
      const { activeCategories, activeLabels } = state;
      const checked = activeLabels.find((active) => active === label.id) !== undefined;
      if (checked) {
        const newActiveLabels = activeLabels.filter((active) => active !== label.id);
        return Object.assign({}, state, {
          activeLabels: newActiveLabels
        });
      } else {
        const newActiveCategories = activeCategories.filter((active) => active !== categoryId);
        const newActiveLabels = activeLabels.concat(label.id);
        return Object.assign({}, state, {
          activeCategories: newActiveCategories,
          activeLabels: newActiveLabels
        });
      }
    }
    case ACTION_TYPES.TOGGLE_SHOW_FILTER:
      return Object.assign({}, state, {
        showFilter: !state.showFilter
      });
    case ACTION_TYPES.SET_PAGE:
      return Object.assign({}, state, {
        page: action.page
      });
    case ACTION_TYPES.SET_VIEW:
      return Object.assign({}, state, {
        view: action.view
      });
    default:
      return state;
  }
};
