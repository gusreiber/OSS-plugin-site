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
      isFetching: false,
      isFiltered: false,
      labels: [],
      limit: 10,
      page: 0,
      pages: 0,
      plugins: [],
      query: '',
      showFilter: false,
      showResults: false,
      sort: 'relevance',
      total: 0,
      view: 'Tiles'
    };
    this.toogleFilter = this.toggleFilter.bind(this);
    this.selectSort = this.selectSort.bind(this);
    this.search = this.search.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }

  toggleFilter() {
    const showFilter = !this.state.showFilter;
    this.setState({
      showFilter: showFilter
    });
  }

  search() {
    const { query, activeCategories, activeLabels, sort, page, limit } = this.state;
    this.setState({
      isFetching: true,
      showResults: false
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
    });
  }

  updateQuery(query) {
    this.setState({
      query: query
    });
  }

  componentDidMount() {
    Api.getCategories()
      .then(categories => {
        this.setState({
          categories: categories
        });
      });
    Api.getLabels()
      .then(labels => {
        this.setState({
          labels: labels
        });
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
          isFetching={this.state.isFetching}
          isFiltered={this.state.isFiltered}
          labels={this.state.labels}
          limit={this.state.limit}
          page={this.state.page}
          pages={this.state.pages}
          plugins={this.state.plugins}
          query={this.state.query}
          showFilter={this.state.showFilter}
          showResults={this.state.showResults}
          sort={this.state.sort}
          total={this.state.total}
          view={this.state.view}
          search={this.search}
          selectSort={this.selectSort}
          toggleFilter={this.toogleFilter}
          updateQuery={this.updateQuery}
        />
      </div>
    );
  }

}
