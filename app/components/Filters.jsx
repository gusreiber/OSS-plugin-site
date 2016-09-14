import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget/Widget.css';
import Categories from './Categories';
import Sort from './Sort';

export default class Filters extends React.PureComponent {

  static propTypes = {
    activeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired,
    selectSort: PropTypes.func.isRequired,
    showFilter: PropTypes.bool.isRequired,
    showResults: PropTypes.bool.isRequired,
    sort: PropTypes.string.isRequired
  };

  render() {
    const { activeCategories, activeLabels, categories, labels, selectSort, showFilter, showResults, sort } = this.props;
    return (
      showFilter &&
        <div className={classNames(styles.FiltersBox)}>
          <div className={classNames(styles.filters, 'filters', showResults ? 'col-md-2' : 'container')}>
            <div className={classNames(styles.Header,'row')}>
              <div className={showResults ? 'col-md-12' : 'col-md-3'}>
                <Sort
                  sort={sort}
                  selectSort={selectSort}
                />
              </div>
              <div className={showResults ? 'col-md-12' : 'col-md-9'}>
                <Categories
                  categories={categories}
                  labels={labels}
                  activeCategories={activeCategories}
                  activeLabels={activeLabels}
                />
              </div>
            </div>
          </div>
        </div>
    );
  }
}
