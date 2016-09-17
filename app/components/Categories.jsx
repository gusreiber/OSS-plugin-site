import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from '../styles/Main.css';
import Category from './Category';

export default class Categories extends React.PureComponent {

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    })).isRequired
  };

  render() {
    return (
      <fieldset className={classNames(styles.Categories)}>
        <legend>
          Categories
          <button className={classNames('btn btn-secondary btn-sm show-all')} name="clear">Show all</button>
        </legend>
        <ul className={classNames(styles.Cols3, 'Cols3')}>
          {this.props.categories.map((category) => {
            return (
              <Category
                key={category.id}
                category={category}
              />
            );
          })}
        </ul>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => {
  const { data } = state;
  const { categories } = data;
  return {
    categories
  };
};

export default connect(mapStateToProps)(Categories);
