import PureComponent from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import {labels} from '../resources';
import ModalView, {Body, Header} from 'react-header-modal';
import { Router, Route, browserHistory, IndexRoute, Navigation, History } from 'react-router';
import LineChart from './LineChart'
import { categories } from './Widget/Categories';
import moment from 'moment';
import { actions, plugin as pluginSelector, createSelector, connect } from '../resources';
import keydown from 'react-keydown';
import { getMaintainersLinked, getLabels, getDependencies, cleanTitle } from '../helper';

const { func, object, any, string } = PropTypes;

export class PluginDetail extends PureComponent {
  componentWillMount() {
    if (this.props.params && this.props.params.pluginName) {
      this.getPluginHelper.call(this, this.props.params);
    }
    this.props.generateLabelData();
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
  closeDialog(event){
    if(event) event.preventDefault();
    let router = this.context.router;
    if(document.referrer && document.referrer.length > 0 && document.referrer !== window.location.href)
      router.goBack();
    else{
      window.location.href = '/';
    }    
  }
  
  @keydown( 'esc' )
  keyClose( event ) {
    this.closeDialog(event);
  }
  render() {
    if (!this.props.plugin || !this.props.plugin.title || !this.props.labels) {
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
          maintainers,
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
    const displayLabels = this.props.labels;
    const beforeClose = this.closeDialog.bind(this);
    
    return (<ModalView hideOnOverlayClicked enableEscapeButton isVisible {...{beforeClose}}>
      <Header>
        <div className="back" onClick={beforeClose}>Find plugins</div>
      </Header>
      <Body>
        
        <div>
          <div className="row flex">
            <div className="col-md-9 main">
              <div className="container-fluid padded">
                <h1 className="title">
                  {cleanTitle(title)}
                  <span className="v">{version}</span>
                  <span className="sub">Minimum Jenkins requirement: {requiredCore}</span>
                  <span className="sub">ID: {name}</span>
                </h1>
                <div className="row flex">
                  <div className="col-md-4">
                    <p>
                    Installs: {currentInstalls}<br />
                    Recent installs: {trend}<br/>
                    Last released: <span  title={moment(releaseTimestamp).format("dddd, MMMM Do YYYY")}>{moment(releaseTimestamp).fromNow()}</span><br/>
                    </p>

                  </div>
                  <div className="col-md-4 maintainers">
                    <h5>Maintainers</h5>
                    {getMaintainersLinked(maintainers)}
                  </div>
                  <div className="col-md-4 dependencies">
                    <h5>Dependencies</h5>
                    {getDependencies(dependencies)}
                  </div>
                </div>
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
            <div className="chart">
            <LineChart
              total={currentInstalls}
              installations={installations}
            />
            </div>
            <h5>Labels</h5>
            {getLabels(labels,sha1,displayLabels,true)}
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
  generateLabelData: func.isRequired,
  labels: any,
  params: object.isRequired, // From react-router
};

PluginDetail.contextTypes = {
  router: object.isRequired,
};

const selectors = createSelector([pluginSelector,labels], (plugin,labels) => ({plugin,labels}));

export default connect(selectors, actions)(PluginDetail);
