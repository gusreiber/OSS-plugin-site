import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default class View extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    updateView: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired
  };

  buildIcon(view) {
    switch (view) {
      case 'Tiles': return 'icon-grid-alt';
      case 'List': return 'icon-list2';
      case 'Table': return 'icon-menu3';
      default: return '';
    }
  }

  handleOnClick(event) {
    event.preventDefault();
    this.props.updateView(this.props.view);
  }

  render() {
    const { isActive, updateView, view } = this.props;
    const icon = this.buildIcon(view);
    return (
      <button className={classNames('btn btn-secondary', { active: isActive })} onClick={this.handleOnClick}>
        <i className={icon} />
      </button>
    );
  }

}
