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
  isHome,
  searchOptions,
  filterVisibleList,
  createSelector,
  connect,
} from './resources';
import React, { PropTypes, Component } from 'react';
import Widget from './components/Widget/Widget';

const { object, func, any, bool } = PropTypes;

export class Application extends Component {

  componentWillMount() {
    const { location } = this.props;
    const q = location.query;
    if(q.labels || q.q || q.categories || q.maintainers || q.cores){
      this.props.generatePluginData(q);
      this.isHome = false;;
    }
    else{
      this.props.generateInstalledData();
      this.props.generateUpdatedData();
      this.props.generateTrendData();
      this.isHome = true;
    }
    this.props.generateLabelData();
    this.props.generateCategoryData();
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(nextProps.location.query !== this.props.location.query) {
      this.props.generatePluginData(nextProps.location.query);
    }
  }
  
  shouldComponentUpdate(nextProp,nextState) {
    
    const p = nextProp;
    const q = this.props.location.query;
    const cats = this.props.categories || {};
    const labels = this.props.labels || {};
    
    if(this.isHome){
      return !(!( p.installed && p.updated && p.trend));
    }
    else{
      return !(isNaN(cats.size) && isNaN(labels.size));
    }
  }
  render() {

    const {
      filterVisibleList,
      totalSize,
      searchOptions,
      isFetching,
      isHome,
      labels,
      categories,
      installed,
      updated,
      trend,
      location,
    } = this.props;
    
    if(this.isHome){
      if(!installed || !updated || !trend) return null;
    }
    else{
      if(!categories || !labels) return null;
    }
    
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
        isHome = {this.isHome}
      />
    </div>);
  }
}

Application.propTypes = {
  location: object.isRequired,
  generatePluginData: func.isRequired,
  generateLabelData: func.isRequired,
  generateCategoryData: func.isRequired,
  generateInstalledData: func.isRequired,
  generateUpdatedData: func.isRequired,
  generateTrendData: func.isRequired,
  filterVisibleList: any,
  labels: any,
  categories: any,
  installed: any,
  updated: any,
  trend: any,
  totalSize: any.isRequired,
  searchOptions: any.isRequired,
  isFetching: bool.isRequired,
  isHome: bool.isRequired,
};

const selectors = createSelector(
  [ totalSize, isFetching,isHome, labels,categories,installed,updated,trend, filterVisibleList, searchOptions],
  ( totalSize, isFetching,isHome, labels,categories,installed,updated,trend, filterVisibleList,  searchOptions) => ({
    totalSize,
    isFetching,
    isHome,
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
