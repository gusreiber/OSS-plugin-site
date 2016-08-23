import PureComponent from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import ModalView, {Body, Header} from 'react-header-modal';
import LineChart from './LineChart'
import { categories } from './Widget/Categories';
import moment from 'moment';
import { actions, plugin as pluginSelector, createSelector, connect } from '../resources';

import { getMaintainersLinked, getLabels, getDependencies, cleanTitle } from '../helper';

const { func, object, any, string } = PropTypes;

export class PluginDetail extends PureComponent {
  componentWillMount() {
    if (this.props.params && this.props.params.pluginName) {
      this.getPluginHelper.call(this, this.props.params);
    }
  }

  componentWillReceiveProps(nextProp) {
    if (this.props.params.pluginName !== nextProp.params.pluginName) {
      this.getPluginHelper.call(this, nextProp.params);
    }
  }

  getPluginHelper(params) {
    const { pluginName: name } = params;
    const { getPlugin } = this.props;
    getPlugin(name);
  }

  render() {
    if (!this.props.plugin || !this.props.plugin.title) {
      return null;
    }
    const {
      context: {
        router,
        },
      props: {
        plugin: {
          title,
          name,
          excerpt,
          download,
          developers,
          sha1,
          version,
          scm,
          previousVersion,
          url,
          releaseTimestamp,
          previousTimestamp,
          category,
          labels,
          dependencies,
          stats: {
            installations,
            installationsPerVersion,
            currentInstalls,
            trend
            },
          wiki,
          requiredCore,
          detail
          },
        },
      } = this;
    const afterClose = () => {
      router.goBack();
    };
    return (<ModalView hideOnOverlayClicked isVisible {...{afterClose}}>
      <Header>
        <div className="back" onClick={afterClose}>Plugin detail</div>
      </Header>
      <Body>
        <div>
          <div className="row flex">
            <div className="col-md-9 main">
              <div className="container-fluid padded">
                <h1 className="title">
                  {cleanTitle(title)}
                  <span className="v">{version}</span>
                  <span className="sub">Required minimum Jenkins: {requiredCore}</span>
                </h1>
                <div className="row flex">
                  <div className="col-md-4">
                    <p>
                    Installs: {currentInstalls}<br />
                    Trend: {trend}<br/>
                    Last released: {moment(releaseTimestamp).fromNow()}<br/>
                    </p>

                  </div>
                  <div className="col-md-4">
                    <h5>Maintainers</h5>
                    {getMaintainersLinked(developers)}
                  </div>
                  <div className="col-md-4">
                    <h5>Dependencies</h5>
                    {getDependencies(dependencies)}
                  </div>
                </div>
                <a href={"https://updates.jenkins-ci.org/latest/" + name + ".hpi" } className="btn btn-primary btn-lg download"><i className="icon-download"></i> Installation instructions</a>
                <div className="content" dangerouslySetInnerHTML={{__html: wiki.content}}></div>
              </div>
            </div>
            <div className="col-md-3 gutter">
            <a href={"https://updates.jenkins-ci.org/latest/" + name + ".hpi" } className="btn btn-primary"><i className="icon-download"></i>
              <span>Download</span>
              <span className="v">{cleanTitle(title)} {version}</span>
            </a>

            <a href={"https://updates.jenkins-ci.org/download/plugins/" + name } className="btn btn-secondary"><i className="icon-box"></i>
              <span>Archives</span>
              <span className="v">Get past versions</span>
            </a>
            <LineChart
              total={currentInstalls}
              installations={installations}
            />
            <h5>Labels</h5>
            {labels.map(
                (label,i) => {return(<a className="lbl" key={'label_'+i}>{label}</a>)}
            )}
            </div>
          </div>

        </div>
      </Body>
    </ModalView>);
  }
}

PluginDetail.propTypes = {
  getPlugin: func,
  plugin: any,
  params: object.isRequired, // From react-router
};

PluginDetail.contextTypes = {
  router: object.isRequired,
};

const selectors = createSelector([pluginSelector], (plugin) => ({plugin}));

export default connect(selectors, actions)(PluginDetail);
