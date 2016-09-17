import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Plugin from './Plugin';

class Plugins extends React.PureComponent {

  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired,
    plugins: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    return (
      <div>
        {this.props.plugins.map((plugin) => {
          return (
            <Plugin key={plugin.name} labels={this.props.labels} plugin={plugin} />
          );
        })}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { ui, data} = state;
  const { plugins } = ui;
  const { labels } = data;
  return {
    labels,
    plugins
  };
};

export default connect(mapStateToProps)(Plugins);
