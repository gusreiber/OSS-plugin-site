import React, { PropTypes } from 'react';

export default class Label extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  static propTypes = {
    activeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    category: PropTypes.string.isRequired,
    label: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    }).isRequired,
    toggleLabel: PropTypes.func.isRequired
  }

  handleOnChange(event) {
    this.props.toggleLabel(this.props.label, this.props.category);
  }

  render() {
    const { activeLabels, label } = this.props;
    const checked = activeLabels.find((active) => active === label.id) !== undefined;
    return (
      <li key={label.id}>
        <label>
          <input type="checkbox" name="labels" value={label.id} checked={checked} onChange={this.handleOnChange} />
          <span>{label.title}</span>
        </label>
      </li>
    );
  }

}
