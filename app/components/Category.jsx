import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Main.css';
import Label from './Label';

export default class Category extends React.PureComponent {

  static propTypes = {
    activeCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    }).isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired
  };

  render() {
    const { activeCategories, activeLabels, category, labels } = this.props;
    const matchedLabels = category.labels.map((id) => labels.find((label) => label.id === id));
    const checked = activeCategories.find((active) => active === category.id) !== undefined;
    return (
      <li className={classNames(styles[category.id], category.id, { mask: checked })}>
        <label>
          <input type="checkbox" name="categories" value={category.id} checked={checked} />
          <span>{category.title}</span>
        </label>
        <ul>
          {matchedLabels.map((label) => {
            return(
              <Label
                key={label.id}
                activeLabels={activeLabels}
                label={label}
              />
            );
          })}
        </ul>
      </li>
    );
  }
}
