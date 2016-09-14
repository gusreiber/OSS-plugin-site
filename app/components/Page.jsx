import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class Page extends React.PureComponent {

  static propTypes = {
    className: PropTypes.string.isRequired,
    display: PropTypes.any.isRequired,
    isCurrent: PropTypes.bool,
    page: PropTypes.number.isRequired
  };

  static defaultProps = {
    isCurrent: false
  };

  render() {
    return (
      <li className={classNames('page-item', { active: this.props.isCurrent })}>
        <a className="page-link" aria-label={this.props.className} dangerouslySetInnerHTML={{__html: this.props.display }} />
      </li>
    )
  }

}
