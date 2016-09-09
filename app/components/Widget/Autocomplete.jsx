import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';

const Autocomplete = ({ label, name, placeholder }) => (
  <label>
    <span className={classNames(styles.Top)}>{label}</span>
    <input name={name}
      placeholder={placeholder}
      type="text"
    />
  </label>
);

Autocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default Autocomplete;
