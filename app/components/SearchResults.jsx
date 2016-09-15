import React, { PropTypes } from 'react';
import styles from './Main.css';
import classNames from 'classnames';
import ActiveFilters from './ActiveFilters';
import Pagination from './Pagination';
import Plugins from './Plugins';
import Spinner from './Spinner';

export default class SearchResults extends React.PureComponent {

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
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    plugins: PropTypes.arrayOf(PropTypes.object).isRequired,
    showFilter: PropTypes.bool.isRequired,
    showResults: PropTypes.bool.isRequired,
    toggleCategory: PropTypes.func.isRequired,
    toggleLabel: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired
  }

  render() {
    return (
      <div className="row results">
        {this.props.showFilter && this.props.showResults && <div className="col-md-2" /> }
        <div className={classNames(styles.ItemsList, `items-box col-md-${this.props.showFilter && this.props.showResults ? '10' : '12'}`)}>
          <nav className="page-controls">
            <ul className="nav navbar-nav">
              <ActiveFilters
                activeCategories={this.props.activeCategories}
                activeLabels={this.props.activeLabels}
                activeQuery={this.props.activeQuery}
                categories={this.props.categories}
                labels={this.props.labels}
                toggleCategory={this.props.toggleCategory}
                toggleLabel={this.props.toggleLabel}
              />
              <Pagination
                limit={this.props.limit}
                page={this.props.page}
                pages={this.props.pages}
                total={this.props.total}
              />
            </ul>
          </nav>
          <div className="padded-box">
            <div id="cb-item-finder-grid-box" className={classNames(styles.GridBox, 'grid-box')}>
              <div className={classNames(styles.Grid, 'grid')}>
                {this.props.isFetching && <Spinner />}
                {!this.props.isFetching && this.props.total > 0 &&
                  <Plugins labels={this.props.labels} plugins={this.props.plugins} />
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
