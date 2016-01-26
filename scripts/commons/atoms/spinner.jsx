'use strict';

var React = require('react'),
    env = require('../utils/env');

module.exports = React.createClass({

  propTypes: {
    style: React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      style: {}
    };
  },

  render: function () {
    return <i className="icon-stopwatch spinner" style={this.props.style}>{this.props.children}loading</i>;
  }

});