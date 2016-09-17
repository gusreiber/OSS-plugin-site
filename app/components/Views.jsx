import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setView } from '../actions';
import View from './View';

const views = ['Tiles', 'List', 'Table'];

class Views extends React.PureComponent {

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

const mapStateToProps = (state) => {
  const { ui } = state;
  const { view } = ui;
  return {
    view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateView: (view) => {
      dispatch(setView(view));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Views);
