import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import Category from './Category';

export default class Categories extends React.PureComponent {

  static propTypes = {
    categories: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    handleChecks: PropTypes.func.isRequired
  };

  render() {
    const {categories, labels, handleChecks} = this.props;
    const sortedCategories = categories.valueSeq();
    return (
      <fieldset className={classNames(styles.Categories)}>
        <legend>
          Categories
          <button className={classNames('btn btn-secondary btn-sm')}
            name="clear"
            value="category,labelFilter"
              onClickCapture={handleChecks}>Show all</button>
        </legend>
        <ul className={classNames(styles.Cols3, 'Cols3')}>
          {sortedCategories.map((item) => {
            if (item.id === 'junk') {
              return null;
            }
            const theseLabels = [];
            item.labels.map(labelID => {
              labels.map((label) => {
                if (labelID === label.id) {
                  theseLabels.push(label);
                  return false;
                }
              });
            });
            return (
              <Category
                key={item.id}
                title={item.title}
                tooltip={item.description}
                id={item.id}
                labels={theseLabels}
              />
            );
          })}
        </ul>
      </fieldset>
    );
  }
}
