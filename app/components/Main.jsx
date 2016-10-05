import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/Main.css';
import classNames from 'classnames';
import Filters from './Filters';
import Footer from './Footer';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import Views from './Views';
import { actions } from '../actions';
import { isFiltered, showFilter, showResults, view } from '../selectors';
import { createSelector } from 'reselect';

class Main extends React.PureComponent {

  static propTypes = {
    isFiltered: PropTypes.bool.isRequired,
    parseQueryParams: PropTypes.func.isRequired,
    showFilter: PropTypes.bool.isRequired,
    showResults: PropTypes.bool.isRequired,
    search: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired
  };

  handleOnSubmit = (event) => {
    event.preventDefault();
    this.props.search({ resetPage: true });
  }

  componentDidMount() {
    // Support query params:
    // categories - comma separated list of filtered categories
    // labels - comma separated list of filtered labels
    // q - search query
    // page - specific page
    // sort - sort by
    // view - tiles, table, etc.
    const parseQueryParams = () => {
      const queryParams = this.props.location.query; // eslint-disable-line react/prop-types
      const activeCategories = queryParams.categories ? queryParams.categories.split(',') : undefined;
      const activeLabels = queryParams.labels ? queryParams.labels.split(',') : undefined;
      const page = queryParams.page ? Number(queryParams.page) : undefined;
      const query = queryParams.q || undefined;
      const sort = queryParams.sort || undefined;
      const view = queryParams.view || undefined;
      const data = {
        activeCategories: activeCategories,
        activeLabels: activeLabels,
        page: page,
        query: query,
        sort: sort,
        view: view
      };
      Object.keys(data).forEach((key) => {
        if (typeof data[key] === 'undefined') {
          delete data[key];
        }
      });
      return data;
    };
    const queryParams = parseQueryParams();
    this.props.parseQueryParams(queryParams);
  }

  render() {
    return (
      <div>
        <div className={classNames(styles.ItemFinder, this.props.view, { showResults: this.props.showResults },
            { isFiltered: this.props.isFiltered }, 'item-finder')}>
          <form ref="form" action="#" id="plugin-search-form"
              className={classNames(styles.HomeHeader, { showFilter: this.props.showFilter }, 'HomeHeader jumbotron')}
              onSubmit={this.handleOnSubmit}>
            <h1><span className="logo">project</span>Voltron</h1>
            <p className="tagline">The strength of many, shared by all.</p>
            <nav className={classNames(styles.navbar, 'navbar')}>
              <div className="nav navbar-nav">
                <SearchBox handleOnSubmit={this.handleOnSubmit} />
                <Views />
              </div>
            </nav>
            <Filters />
            <p>
              Extend your Jenkins environment with any of the 1000+ community added plugins.
              Better yet, join the community and contribute your own.
            </p>
          </form>
          <SearchResults />
          <Footer />
        </div>
      </div>
    );
  }

}

const selectors = createSelector(
  [ isFiltered, showFilter, showResults, view ],
  ( isFiltered, showFilter, showResults, view ) =>
  ({ isFiltered, showFilter, showResults, view })
);

export default connect(selectors, actions)(Main);
