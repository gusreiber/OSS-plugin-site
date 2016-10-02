import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ModalView, {Body, Header} from 'react-header-modal';
import { browserHistory, Link } from 'react-router';
import moment from 'moment';
import { getPlugin } from '../actions';
import LineChart from './LineChart';
import { cleanTitle } from '../commons/helper';

class PluginDetail extends React.PureComponent {

  // This is ultimately called in server.js to ensure the plugin is loaded prior to rendering
  // so the plugin, including wiki content, is rendered in the response from the server. Thus
  // making this SEO friendly.
  static fetchData({ store, location, params, history }) {  // eslint-disable-line no-unused-vars
    return store.dispatch(getPlugin(params.pluginName));
  }

  static propTypes = {
    getPlugin: PropTypes.func.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string
    })).isRequired,
    plugin: PropTypes.shape({
      excerpt: PropTypes.string,
      labels: PropTypes.arrayOf(PropTypes.string),
      maintainers: PropTypes.arrayOf(PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string
      })),
      name: PropTypes.string.isRequired,
      requiredCore: PropTypes.string,
      sha1: PropTypes.string,
      stats: PropTypes.shape({
        currentInstalls: PropTypes.number
      }).isRequired,
      title: PropTypes.string.isRequired,
      wiki: PropTypes.shape({
        content: PropTypes.string,
        url: PropTypes.string
      }).isRequired,
      version: PropTypes.string
    })
  };

  componentDidMount() {
    if (this.props.plugin === null) {
      this.props.getPlugin();
     }
   }

  closeDialog = (event) => {
    event && event.preventDefault();
    browserHistory.goBack();
  }

  getDependencies(dependencies) {
    return dependencies.sort((a, b) => a.optional === b.optional ? 0 : (a.optional ? 1 : -1)).map((dependency) => {
      const required = !dependency.optional ? '(required)' : '';
      return (
        <div key={dependency.name}>
          <Link to={`/${dependency.name}`}>{dependency.name} v.{dependency.version} {required}</Link>
        </div>
      );
    });
  }

  getLabels(labels) {
    return labels.map((id) => {
      const label = this.props.labels.find((label) => label.id === id);
      const text = label !== undefined ? label.title : id;
      return (
        <div className="label-link" key={id}>
          <Link to={`/?labels=${id}`}>{text}</Link>
        </div>
      );
    });
  }

  getMaintainers(maintainers) {
    return maintainers.map((maintainer) => {
      // TODO: Adjust Main.state to add to maintainers filter
      const name = maintainer.name || maintainer.id;
      return <div className="maintainer" key={maintainer.id}>{name}</div>;
    });
  }

  render() {
    const plugin = this.props.plugin;
    if (plugin === null) {
      return null;
    }
    const beforeClose = this.closeDialog;
    return (
      <ModalView hideOnOverlayClicked isVisible {...{beforeClose}}>
        <Header>
          <div className="back" onClick={beforeClose}>Find plugins</div>
        </Header>
        <Body>
          <div>
            <div className="row flex">
              <div className="col-md-9 main">
                <div className="container-fluid padded">
                  <h1 className="title">
                    {cleanTitle(plugin.title)}
                    <span className="v">{plugin.version}</span>
                    <span className="sub">Minimum Jenkins requirement: {plugin.requiredCore}</span>
                    <span className="sub">ID: {plugin.name}</span>
                  </h1>
                  <div className="row flex">
                    <div className="col-md-4">
                      <p>
                        Installs: {plugin.stats.currentInstalls}<br />
                        Last released: <span  title={moment(plugin.releaseTimestamp).format('dddd, MMMM Do YYYY')}>
                          {moment(plugin.releaseTimestamp).fromNow()}</span><br/>
                      </p>
                    </div>
                    <div className="col-md-4 maintainers">
                      <h5>Maintainers</h5>
                      {this.getMaintainers(plugin.maintainers)}
                    </div>
                    <div className="col-md-4 dependencies">
                      <h5>Dependencies</h5>
                      {this.getDependencies(plugin.dependencies)}
                    </div>
                  </div>
                  <div className="content" dangerouslySetInnerHTML={{__html: plugin.wiki.content}} />
                </div>
              </div>
              <div className="col-md-3 gutter">
                <a href={plugin.url} className="btn btn-primary">
                  <i className="icon-download" />
                  <span>Download</span>
                  <span className="v">{cleanTitle(plugin.title)} {plugin.version}</span>
                </a>
                <a href={`https://updates.jenkins-ci.org/download/plugins/${plugin.name}` }
                    className="btn btn-secondary">
                  <i className="icon-box" />
                  <span>Archives</span>
                  <span className="v">Get past versions</span>
                </a>
                <div className="chart">
                  <LineChart
                    total={plugin.stats.currentInstalls}
                    installations={plugin.stats.installations}
                  />
                </div>
                <h5>Labels</h5>
                {this.getLabels(plugin.labels)}
              </div>
            </div>
          </div>
        </Body>
      </ModalView>
    );
  }
}

const mapStateToProps = (state) => {
  const { data, ui } = state;
  const { labels } = data;
  const { plugin } = ui;
  return {
    labels,
    plugin
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPlugin: () => {
      dispatch(getPlugin(ownProps.params.pluginName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PluginDetail);
