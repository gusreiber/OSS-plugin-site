/** @flow */
import {
  actions,
  totalSize,
  labels,
  categories,
  installed,
  updated,
  trend,
  isFetching,
  searchOptions,
  filterVisibleList,
  createSelector,
  connect,
} from './resources';
import React, { PropTypes, Component } from 'react';
import Widget from './components/Widget/Widget';

const { object, func, any, bool } = PropTypes;

export default class Application extends Component {

  componentWillMount() {
    const { location } = this.props;
    const q = location.query;
    if(q.labels || q.q || q.categories || q.maintainers || q.cores)
      this.props.generatePluginData(q);
    else{
      this.props.generateInstalledData();
      this.props.generateUpdatedData();
      this.props.generateTrendData();
    }
    this.props.generateLabelData();
    this.props.generateCategoryData();

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.location.query !== this.props.location.query) {
      this.props.generatePluginData(nextProps.location.query);
    }
  }

  render() {
    const {
      filterVisibleList,
      totalSize,
      searchOptions,
      isFetching,
      labels,
      categories,
      installed,
      updated,
      trend,
      location,
    } = this.props;
    if (!categories || !labels || (!installed && !filterVisibleList) || (!updated && !filterVisibleList) || (!trend && !filterVisibleList)) return null;
    return (<div>
      <Widget
        labels={labels}
        categories={categories}
        installed={installed}
        updated={updated}
        trend={trend}
        searchOptions={searchOptions}
        location={location}
        router={this.context.router}
        getVisiblePlugins={filterVisibleList}
        totalSize={totalSize}
        isFetching = {isFetching}
      />
    </div>);
  }
}

Application.propTypes = {
  location: object.isRequired,
  generatePluginData: func.isRequired,
  generateLabelData: func.isRequired,
  generateCategoryData: func.isRequired,
  filterVisibleList: any,
  labels: any,
  categories: any,
  installed: any,
  updated: any,
  trend: any,
  totalSize: any.isRequired,
  searchOptions: any.isRequired,
  isFetching: bool.isRequired,
};

const selectors = createSelector(
  [ totalSize, isFetching, labels,categories,installed,updated,trend, filterVisibleList, searchOptions],
  ( totalSize, isFetching, labels,categories,installed,updated,trend, filterVisibleList,  searchOptions) => ({
    totalSize,
    isFetching,
    labels,
    categories,
    installed,
    updated,
    trend,
    filterVisibleList,
    searchOptions
  })
);

export default connect(selectors, actions)(Application);
