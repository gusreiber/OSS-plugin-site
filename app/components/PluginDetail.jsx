import React, { PropTypes } from 'react';
import ModalView, {Body, Header} from 'react-header-modal';
import { browserHistory } from 'react-router';
import keydown from 'react-keydown';
import moment from 'moment';
import Api from '../api';
import LineChart from './LineChart';
import { cleanTitle } from '../helper';

export default class PluginDetail extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      labels: [],
      plugin: null
    };
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentWillMount() {
    const name = this.props.params.pluginName;
    Promise.all([
      Api.getLabels(),
      Api.getPlugin(name)
    ]).then((data) => {
      this.setState({
        labels: data[0],
        plugin: data[1]
      });
    });
  }

  @keydown('esc')
  closeDialog(event) {
    event && event.preventDefault();
    browserHistory.goBack();
  }

  getDependencies(dependencies) {
    return dependencies.map((dependency) => {
      const required = !dependency.optional ? '(required)' : '';
      return <div key={dependency.name}>{dependency.name} v.{dependency.version} {required}</div>;
    });
  }

  getLabels(labels) {
    return labels.map((id) => {
      const label = this.state.labels.find((label) => label.id === id);
      const text = label !== undefined ? label.title : id;
      return <div className="label-link" key={id}>{text}</div>;
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
    const plugin = this.state.plugin;
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
                        Last released: <span  title={moment(plugin.releaseTimestamp).format("dddd, MMMM Do YYYY")}>{moment(plugin.releaseTimestamp).fromNow()}</span><br/>
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
                <a href={`https://updates.jenkins-ci.org/download/plugins/${plugin.name}` } className="btn btn-secondary">
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
