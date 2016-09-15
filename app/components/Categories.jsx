import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Main.css';
import Category from './Category';

export default class Categories extends React.PureComponent {

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
    toggleCategory: PropTypes.func.isRequired,
    toggleLabel: PropTypes.func.isRequired
  };

  render() {
    const { activeCategories, activeLabels, categories, labels, toggleCategory, toggleLabel } = this.props;
    return (
      <fieldset className={classNames(styles.Categories)}>
        <legend>
          Categories
          <button className={classNames('btn btn-secondary btn-sm show-all')} name="clear">Show all</button>
        </legend>
        <ul className={classNames(styles.Cols3, 'Cols3')}>
          {categories.map((category) => {
            return (
              <Category
                key={category.id}
                activeCategories={activeCategories}
                activeLabels={activeLabels}
                category={category}
                labels={labels}
                toggleCategory={toggleCategory}
                toggleLabel={toggleLabel}
              />
            );
          })}
        </ul>
      </fieldset>
    );
  }
}
