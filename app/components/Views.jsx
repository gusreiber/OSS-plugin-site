import React, { PropTypes } from 'react';
import View from './View';

const views = ['Tiles', 'List', 'Table'];

export default class Views extends React.PureComponent {

  static propTypes = {
    view: PropTypes.string.isRequired
  };

  buildIcon(item) {
    switch (item) {
      case 'Tiles': return 'icon-grid-alt';
      case 'List': return 'icon-list2';
      case 'Table': return 'icon-menu3';
      default: return '';
    }
  }

  render() {
    return (
      <fieldset className="btn-group">
        { views.map((view, index) => {
          const icon = this.buildIcon(view);
          return (
            <View key={index}
              icon={icon}
              isActive={view === this.props.view}
              onClick={(event) => {
                event.preventDefault();
              }}
            />
          );
        })}
      </fieldset>
    );
  }

}
