import React, { PropTypes } from 'react';

export default class ActiveCategory extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  static propTypes = {
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired
    }),
    toggleCategory: PropTypes.func.isRequired
  };

  handleOnClick(event) {
    this.props.toggleCategory(this.props.category);
  }

  render() {
    return (
      <a className="nav-link" onClick={this.handleOnClick}>{this.props.category.title}</a>
    );
  }

}
