
import React, { PropTypes, Component } from 'react';

export default class Spinner extends Component {

  static propTypes ={
    style: PropTypes.object
  };

  static defaultProps = {
    style: {}
  };

  render () {
    return (
      <div id='plugin-spinner' className='spinner double-bounce2'>
        <i className="icon-jenkins"></i>
        <div className="swing">
          <div className="swing-l"></div>
          <div></div>
          <div></div>
          <div className="swing-r"></div>
        </div>
        <div>...working...</div>
      </div>
    );
  }

};
