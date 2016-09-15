import React from 'react';
import Api from '../api';
import Dashboard from './Dashboard';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
    this.clearQuery = this.clearQuery.bind(this);
    this.search = this.search.bind(this);
    this.selectSort = this.selectSort.bind(this);
    this.toggleCategory = this.toggleCategory.bind(this);
    this.toogleFilter = this.toggleFilter.bind(this);
    this.toggleLabel = this.toggleLabel.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.updateView = this.updateView.bind(this);
  }

  clearQuery() {
    this.setState({
      query: ''
    }, () => {
      this.search();
    });
  }

  search() {
    const { query, activeCategories, activeLabels, sort, page, limit } = this.state;
    this.setState({
      isFetching: true
    });
    Api.getPlugins(query, activeCategories, activeLabels, sort, page, limit)
      .then(data => {
        this.setState({
          activeCategories: activeCategories,
          activeLabels: activeLabels,
          activeQuery: query,
          isFetching: false,
          limit: limit,
          page: data.page,
          pages: data.pages,
          plugins: data.plugins,
          showFilter: true,
          showResults: true,
          total: data.total
        });
      });
  }

  selectSort(sort) {
    this.setState({
      sort: sort
    }, () => {
      if (this.state.showResults) {
        this.search();
      }
    });
  }

  toggleCategory(category) {
    const { activeCategories, activeLabels } = this.state;
    const checked = activeCategories.find((active) => active === category.id) !== undefined;
    if (checked) {
      // Remove category and its labels
      const newActiveCategories = activeCategories.filter((active) => active !== category.id);
      const newActiveLabels = activeLabels.filter((active) => !category.labels.includes(active));
      this.setState({
        activeCategories: newActiveCategories,
        activeLabels: newActiveLabels
      }, () => {
        this.search();
      });
    } else {
      // Add category but remove its labels.
      const newActiveCategories = activeCategories.concat(category.id);
      const newActiveLabels = activeLabels.filter((active) => !category.labels.includes(active));
      this.setState({
        activeCategories: newActiveCategories,
        activeLabels: newActiveLabels
      }, () => {
        this.search();
      });
    }
  }

  toggleFilter({ forceOpen = false, forceClose = false }) {
    const showFilter = forceOpen ? true : (forceClose ? false : !this.state.showFilter);
    this.setState({
      showFilter: showFilter
    });
  }

  toggleLabel(label, categoryId) {
    const { activeCategories, activeLabels } = this.state;
    const checked = activeLabels.find((active) => active === label.id) !== undefined;
    if (checked) {
      const newActiveLabels = activeLabels.filter((active) => active !== label.id);
      this.setState({
        activeLabels: newActiveLabels
      }, () => {
        this.search();
      });
    } else {
      const newActiveCategories = activeCategories.filter((active) => active !== categoryId);
      const newActiveLabels = activeLabels.concat(label.id);
      this.setState({
        activeCategories: newActiveCategories,
        activeLabels: newActiveLabels
      }, () => {
        this.search();
      });
    }
  }

  updateQuery(query) {
    this.setState({
      query: query
    });
  }

  updateView(view) {
    this.setState({
      view: view
    });
  }

  componentWillMount() {
    Api.getInitialData().then((data) => {
      const { categories, labels, installed, trend, updated } = data;
      this.setState({
        categories: categories,
        labels: labels,
        installed: installed,
        trend: trend,
        updated: updated
      }, () => {
        const activeCategories = this.props.location.query.categories || this.state.activeCategories;
        const activeLabels = this.props.location.query.labels || this.state.activeLabels;
        const sort = this.props.location.query.sort || this.state.sort;
        const query = this.props.location.query.q || this.state.query;
        const forceSearch = activeCategories.length != 0 || activeLabels.length != 0 || query !== '';
        this.setState({
          activeCategories: activeCategories,
          activeLabels: activeLabels,
          query: query,
          sort: sort
        }, () => {
          if (forceSearch) {
            this.search();
          }
        });
      })
    });
  }

  render() {
    return (
      <div>
        <Dashboard
          activeCategories={this.state.activeCategories}
          activeLabels={this.state.activeLabels}
          activeQuery={this.state.activeQuery}
          categories={this.state.categories}
          clearQuery={this.clearQuery}
          installed={this.state.installed}
          isFetching={this.state.isFetching}
          isFiltered={this.state.isFiltered}
          labels={this.state.labels}
          limit={this.state.limit}
          page={this.state.page}
          pages={this.state.pages}
          plugins={this.state.plugins}
          query={this.state.query}
          search={this.search}
          selectSort={this.selectSort}
          showFilter={this.state.showFilter}
          showResults={this.state.showResults}
          sort={this.state.sort}
          toggleCategory={this.toggleCategory}
          toggleFilter={this.toogleFilter}
          toggleLabel={this.toggleLabel}
          total={this.state.total}
          trend={this.state.trend}
          updated={this.state.updated}
          updateQuery={this.updateQuery}
          updateView={this.updateView}
          view={this.state.view}
        />
      </div>
    );
  }

}
