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
import React, { PropTypes } from 'react';
import Widget from './components/Widget/Widget';

class Application extends React.Component {

  static contextTypes = {
    location: PropTypes.object.isRequired
  };

  static propTypes = {
    generatePluginData: PropTypes.func.isRequired,
    generateLabelData: PropTypes.func.isRequired,
    generateCategoryData: PropTypes.func.isRequired,
    generateInstalledData: PropTypes.func.isRequired,
    generateUpdatedData: PropTypes.func.isRequired,
    generateTrendData: PropTypes.func.isRequired,
    filterVisibleList: PropTypes.any,
    labels: PropTypes.any,
    categories: PropTypes.any,
    installed: PropTypes.any,
    updated: PropTypes.any,
    trend: PropTypes.any,
    totalSize: PropTypes.any.isRequired,
    searchOptions: PropTypes.any.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isHome: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { location } = this.context;
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
    if(nextProps.isFetching === this.props.isFetching && this.props.isFetching) return false;
    if(nextProps.location.query !== this.context.location.query) {
      this.props.generatePluginData(nextProps.location.query);
    }
  }

  shouldComponentUpdate(nextProp,nextState) {

    const p = nextProp;
    const q = this.context.location.query;
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
      trend
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
        getVisiblePlugins={filterVisibleList}
        totalSize={totalSize}
        isFetching = {isFetching}
        isHome = {this.isHome}
      />
    </div>);
  }
}

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
