import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleLabel } from '../actions';

class Label extends React.PureComponent {

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

  handleOnChange() {
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

const mapStateToProps = (state) => {
  const { ui } = state;
  const { activeLabels } = ui;
  return {
    activeLabels
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLabel: (label) => {
      dispatch(toggleLabel(label));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Label);
