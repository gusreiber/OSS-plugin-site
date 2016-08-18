/** @flow */
import {
  actions,
  totalSize,
  labels,
  categories,
  installed,
  isFetching,
  searchOptions,
  filterVisibleList,
  createSelector,
  connect,
} from './resources';
import React, { PropTypes, Component } from 'react';
import Widget from './components/Widget/Widget';
import DevelopmentFooter from './commons/developmentFooter';

const { object, func, any, bool } = PropTypes;

export default class Application extends Component {

  componentWillMount() {
    const { location } = this.props;
    const q = location.query;
    if(q.labels || q.q || q.categories || q.maintainers || q.cores)
      this.props.generatePluginData(q);
    else{
      this.props.generateInstalledData();
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
      location,
    } = this.props;
    if (!categories || !labels || !installed) return null;
    return (<div>
      <DevelopmentFooter />
      <Widget
        labels={labels}
        categories={categories}
        installed={installed}
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
  labels: any.isRequired,
  categories: any.isRequired,
  installed: any.isRequired,
  totalSize: any.isRequired,
  searchOptions: any.isRequired,
  isFetching: bool.isRequired,
};

const selectors = createSelector(
  [ totalSize, isFetching, labels,categories,installed, filterVisibleList, searchOptions],
  ( totalSize, isFetching, labels,categories,installed, filterVisibleList,  searchOptions) => ({
    totalSize,
    isFetching,
    labels,
    categories,
    installed,
    filterVisibleList,
    searchOptions
  })
);

export default connect(selectors, actions)(Application);
