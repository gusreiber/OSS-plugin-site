import React, { PropTypes } from 'react';
import View from './View';

const views = ['Tiles', 'List', 'Table'];

export default class Views extends React.PureComponent {

  static propTypes = {
    updateView: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired
  };

  render() {
    return (
      <fieldset className="btn-group">
        { views.map((view, index) => {
          return (
            <View
              key={index}
              isActive={view === this.props.view}
              updateView={this.props.updateView}
              view={view}
            />
          );
        })}
      </fieldset>
    );
  }

}
