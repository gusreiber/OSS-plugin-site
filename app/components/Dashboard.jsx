import React, { PropTypes } from 'react';
import styles from './Main.css';
import classNames from 'classnames';
import Filters from './Filters';
import Footer from './Footer';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import Views from './Views';

export default class Dashboard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
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
    clearQuery: PropTypes.func.isRequired,
    installed: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
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
    toggleCategory: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    toggleLabel: PropTypes.func.isRequired,
    trend: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,
    updated: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,
    search: PropTypes.func.isRequired,
    selectSort: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
    updateView: PropTypes.func.isRequired
  };

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.search({ resetPage: true });
  }

  render() {
    return (
      <div className={classNames(styles.ItemFinder, this.props.view, { showResults: this.props.showResults }, { isFiltered: this.props.isFiltered }, 'item-finder')}>
        <form ref="form" action="#" id="plugin-search-form"
            className={classNames(styles.HomeHeader, { showFilter: this.props.showFilter }, 'HomeHeader jumbotron')}
            onSubmit={this.handleOnSubmit}>
          <h1><span className="logo">project</span>Voltron</h1>
          <p className="tagline">The strength of many, shared by all.</p>
          <nav className={classNames(styles.navbar, 'navbar')}>
            <div className="nav navbar-nav">
              <SearchBox
                handleOnSubmit={this.handleOnSubmit}
                query={this.props.query}
                showFilter={this.props.showFilter}
                toggleFilter={this.props.toggleFilter}
                updateQuery={this.props.updateQuery}
              />
              <Views
                updateView={this.props.updateView}
                view={this.props.view}
              />
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
            toggleCategory={this.props.toggleCategory}
            toggleLabel={this.props.toggleLabel}
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
          clearQuery={this.props.clearQuery}
          installed={this.props.installed}
          isFetching={this.props.isFetching}
          labels={this.props.labels}
          limit={this.props.limit}
          page={this.props.page}
          pages={this.props.pages}
          plugins={this.props.plugins}
          showFilter={this.props.showFilter}
          showResults={this.props.showResults}
          toggleCategory={this.props.toggleCategory}
          toggleLabel={this.props.toggleLabel}
          total={this.props.total}
          trend={this.props.trend}
          updated={this.props.updated}
          updatePage={this.props.updatePage}
        />
        <Footer
          categories={this.props.categories}
          installed={this.props.installed}
          trend={this.props.trend}
          updated={this.props.updated}
        />
      </div>
    );
  }

}
