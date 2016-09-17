import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/Main.css';
import classNames from 'classnames';
import ActiveFilters from './ActiveFilters';
import Pagination from './Pagination';
import Plugins from './Plugins';
import Spinner from './Spinner';

class SearchResults extends React.PureComponent {

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    showFilter: PropTypes.bool.isRequired,
    showResults: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired
  }

  render() {
    return (
      <div className="row results">
        {this.props.showFilter && this.props.showResults && <div className="col-md-2" /> }
        <div className={classNames(styles.ItemsList, `items-box col-md-${this.props.showFilter && this.props.showResults ? '10' : '12'}`)}>
          <nav className="page-controls">
            <ul className="nav navbar-nav">
              <ActiveFilters />
              <Pagination />
            </ul>
          </nav>
          <div className="padded-box">
            <div id="cb-item-finder-grid-box" className={classNames(styles.GridBox, 'grid-box')}>
              <div className={classNames(styles.Grid, 'grid')}>
                {this.props.isFetching && <Spinner />}
                {!this.props.isFetching && this.props.total > 0 &&
                  <Plugins />
                }
                {this.props.total === 0 && !this.props.isFetching &&
                  <div className="no-results">
                    <h1>No results found</h1>
                    <p>You search did not return any results. Please try changing your search criteria or reloading the browser.</p>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { ui } = state;
  const { isFetching, showFilter, showResults, total } = ui;
  return {
    isFetching,
    showFilter,
    showResults,
    total
  };
};

export default connect(mapStateToProps)(SearchResults);
