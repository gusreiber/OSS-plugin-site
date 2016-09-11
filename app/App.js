import React, { PropTypes } from 'react';

export default class App extends React.Component {

  static childContextTypes = {
    location: PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.any,
  };

  getChildContext() {
    return {
      location: this.props.location
    };
  }

  render() {
    return (
      <div>
          {this.props.children }
      </div>
    );
  }
}
