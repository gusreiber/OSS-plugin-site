import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Widget/Widget.css';
import classNames from 'classnames';
import { cleanTitle } from '../helper';

export default class PluginLink extends React.PureComponent {

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={classNames(styles.Item, 'Entry-box')}>
        <Link key={this.props.name} to={`/${this.props.name}`} className="titleOnly">
          {cleanTitle(this.props.title)}
        </Link>
      </div>
    );
  }

}
