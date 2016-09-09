import React, { PropTypes } from 'react';
import View from './View';

const items = ['Tiles', 'List', 'Table'];

export default class Views extends React.PureComponent {

  static contextTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
    const {location, router} = this.context;
    const {view = 'Tiles'} = location.query;
    return (
      <fieldset className="btn-group">
        { items.map((item, index) => {
          const icon = this.buildIcon(item);
          return (
            <View key={index}
              icon={icon}
              isActive={item === view}
              onClick={(event) => {
                event.preventDefault();
                location.query.view = item;
                router.replace(location);
              }}
            />
          );
        })}
      </fieldset>
    );
  }

}
