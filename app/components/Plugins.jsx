import React, { PropTypes } from 'react';
import Plugin from './Plugin';

export default class Plugins extends React.PureComponent {

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
