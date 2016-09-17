import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../styles/Main.css';
import Label from './Label';

export default class Category extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

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
    })).isRequired,
    toggleCategory: PropTypes.func.isRequired,
    toggleLabel: PropTypes.func.isRequired
  };

  handleOnChange() {
    this.props.toggleCategory(this.props.category);
  }

  render() {
    const { activeCategories, activeLabels, category, labels, toggleLabel } = this.props;
    const matchedLabels = category.labels.map((id) => labels.find((label) => label.id === id));
    const checked = activeCategories.find((active) => active === category.id) !== undefined;
    return (
      <li className={classNames(styles[category.id], category.id, { mask: checked })}>
        <label>
          <input type="checkbox" name="categories" value={category.id} checked={checked} onChange={this.handleOnChange}/>
          <span>{category.title}</span>
        </label>
        <ul>
          {matchedLabels.map((label) => {
            return(
              <Label
                key={label.id}
                activeLabels={activeLabels}
                category={category.id}
                label={label}
                toggleLabel={toggleLabel}
              />
            );
          })}
        </ul>
      </li>
    );
  }
}
