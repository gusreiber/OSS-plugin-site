import React, { PropTypes } from 'react';

export default class ActiveLabel extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  static propTypes = {
    label: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    }),
    toggleLabel: PropTypes.func.isRequired
  };

  handleOnClick(event) {
    event.preventDefault();
    this.props.toggleLabel(this.props.label);
  }

  render() {
    const { label } = this.props;
    const text = label.title !== null ? label.title : label.id;
    return (
      <a className="nav-link" onClick={this.handleOnClick}>{text}</a>
    );
  }

}
