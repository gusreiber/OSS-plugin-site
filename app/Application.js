/** @flow */
import {
  actions,
  totalSize,
  labels,
  categories,
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

    if(location.query.category || location.query.q || location.query.labelFilter) {
      this.props.generatePluginData(location.query);
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
      location,
    } = this.props;
    if (!categories || !labels) return null;
    console.log(categories);
    return (<div>
      <DevelopmentFooter />
      <Widget
        labels={labels}
        categories={categories}
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
  totalSize: any.isRequired,
  searchOptions: any.isRequired,
  isFetching: bool.isRequired,
};

const selectors = createSelector(
  [ totalSize, isFetching, labels,categories, filterVisibleList, searchOptions],
  ( totalSize, isFetching, labels,categories, filterVisibleList,  searchOptions) => ({
    totalSize,
    isFetching,
    labels,
    categories,
    filterVisibleList,
    searchOptions
  })
);

export default connect(selectors, actions)(Application);