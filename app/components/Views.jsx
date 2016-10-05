import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions } from '../actions';
import View from './View';

const views = ['Tiles', 'List', 'Table'];

class Views extends React.PureComponent {

  static propTypes = {
    setView: PropTypes.func.isRequired,
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
              updateView={this.props.setView}
              view={view}
            />
          );
        })}
      </fieldset>
    );
  }

}

const mapStateToProps = (state) => {
  const { ui } = state;
  const { view } = ui;
  return {
    view
  };
};

export default connect(mapStateToProps, actions)(Views);
