import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';

export default class Autocomplete extends React.PureComponent {

  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const { label, name, placeholder } = this.props;
    return (
      <label>
        <span className={classNames(styles.Top)}>{label}</span>
        <input name={name}
          placeholder={placeholder}
          type="text"
        />
      </label>
    );
  }
}
