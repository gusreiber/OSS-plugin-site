import React, { PropTypes } from 'react';
import styles from './Widget/Widget.css';
import classNames from 'classnames';
import Filters from './Filters';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import Views from './Views';

export default class Dashboard extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    activeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeQuery: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,
    isFetching: PropTypes.bool.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    plugins: PropTypes.arrayOf(PropTypes.object).isRequired,
    query: PropTypes.string.isRequired,
    showFilter: PropTypes.bool.isRequired,
    showResults: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    view: PropTypes.string.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    selectSort: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={classNames(styles.ItemFinder, this.props.view, { showResults: this.props.showResults }, { isFiltered: this.props.isFiltered }, 'item-finder')}>
        <form ref="form" action="#" id="plugin-search-form"
            className={classNames(styles.HomeHeader, { showFilter: this.props.showFilter }, 'HomeHeader jumbotron')}
            onSubmit={this.props.search}>
          <h1><span className="logo">project</span>Voltron</h1>
          <p className="tagline">The strength of many, shared by all.</p>
          <nav className={classNames(styles.navbar, 'navbar')}>
            <div className="nav navbar-nav">
              <SearchBox
                query={this.props.query}
                showFilter={this.props.showFilter}
                toggleFilter={this.props.toggleFilter}
                updateQuery={this.props.updateQuery}
              />
              <Views view={this.props.view} />
            </div>
          </nav>
          <Filters
            activeCategories={this.props.activeCategories}
            activeLabels={this.props.activeLabels}
            categories={this.props.categories}
            labels={this.props.labels}
            selectSort={this.props.selectSort}
            showFilter={this.props.showFilter}
            showResults={this.props.showResults}
            sort={this.props.sort}
          />
          <p>
            Extend your Jenkins environment with any of the 1000+ community added plugins.
            Better yet, join the community and contribute your own.
          </p>
        </form>
        <SearchResults
          activeCategories={this.props.activeCategories}
          activeLabels={this.props.activeLabels}
          activeQuery={this.props.activeQuery}
          categories={this.props.categories}
          isFetching={this.props.isFetching}
          labels={this.props.labels}
          limit={this.props.limit}
          page={this.props.page}
          pages={this.props.pages}
          plugins={this.props.plugins}
          showFilter={this.props.showFilter}
          showResults={this.props.showResults}
          total={this.props.total}
        />
      </div>
    );
  }

}
