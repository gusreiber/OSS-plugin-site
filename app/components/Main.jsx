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
      limit: 10,
      page: 0,
      pages: 0,
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

  search(event) {
    event.preventDefault();
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
        console.info("Got categories");
        this.setState({
          categories: categories
        });
      });
    Api.getLabels()
      .then(labels => {
        console.info("Got labels");
        this.setState({
          labels: labels
        });
      });
    Api.getInstalled()
      .then(installed => {
        console.info("Got installed");
        this.setState({
          installed: installed
        });
      });
    Api.getTrend()
      .then(trend => {
        console.info("Got trend");
        this.setState({
          trend: trend
        });
      });
    Api.getUpdated()
      .then(updated => {
        console.info("Got updated");
        this.setState({
          updated: updated
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
          installed={this.state.installed}
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
          trend={this.state.trend}
          updated={this.state.updated}
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
