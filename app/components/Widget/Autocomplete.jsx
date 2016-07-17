import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import PureComponent from 'react-pure-render/component';


export default class Autocomplete extends PureComponent {

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
