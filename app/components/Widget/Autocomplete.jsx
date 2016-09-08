import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const {name, placeholder, label} = this.props;
    return (
      <label>
        <span className={classNames(styles.Top)}>{label}</span>
        <input type="text" placeholder={placeholder} name={name} />
      </label>
    );
  }
}
