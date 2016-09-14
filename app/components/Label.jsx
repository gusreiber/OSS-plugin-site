import React, { PropTypes } from 'react';

export default class Label extends React.PureComponent {

  static propTypes = {
    activeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    }).isRequired
  }

  render() {
    const { activeLabels, label } = this.props;
    const checked = activeLabels.find((active) => active === label.id) !== undefined;
    return (
      <li key={label.id}>
        <label>
          <input type="checkbox" name="labels" value={label.id} checked={checked} />
          <span>{label.title}</span>
        </label>
      </li>
    );
  }

}
