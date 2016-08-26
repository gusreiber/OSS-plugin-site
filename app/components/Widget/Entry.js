import React, { PropTypes} from 'react';
import styles from './Widget.css';
import {cleanTitle, getMaintainers, getLabels  } from '../../helper';
import PureComponent from 'react-pure-render/component';
import classNames from 'classnames';
import { Link } from 'react-router';

export class Icon extends PureComponent {
   render() {
    const {type = ''} = this.props;
    let { title } = this.props;

    title = title
      .replace('Jenkins ','')
      .replace('jenkins ','')
      .replace(' Plugin','')
      .replace(' plugin','')
      .replace(' Plug-in','')
      .replace(' plug-in','');

    const colors = ['#6D6B6D','#DCD9D8','#D33833','#335061','#81B0C4','#709aaa','#000'];
    //pick color based on chars in the name to make semi-random, but fixed color per-plugin
    const color = colors[(title.length % 7)];
    const iconClass=`i-${type}`;

    const firstLetter = title.substring(0,1).toUpperCase();
    const firstSpace = title.indexOf(' ') + 1;
    const nextIndx = (firstSpace === 0)?
      1: firstSpace;
    const nextLetter = title.substring(nextIndx,nextIndx + 1);

    return (<i className={iconClass} style={{background: color}}>
        <span className="first">{firstLetter}</span>
        <span className="next">{nextLetter}</span>
      </i>
    );
  }
}

Icon.propTypes = {
  title: PropTypes.any.isRequired,
  type: PropTypes.any,
  labels: PropTypes.any.isRequired,
};

export default class Entry extends PureComponent {
  render() {
    const {plugin, linkOnly, setKey, labels} = this.props;
    return (
      <div
        key={(linkOnly)? setKey : plugin.get('sha1')}
        className={classNames(styles.Item,'Entry-box')}
      >


          {(linkOnly)?
            <Link to={`/${plugin.name}`} className="titleOnly">
              {cleanTitle(plugin.title)}
            </Link>
           :
            <Link to={`/${plugin.name}`} className={classNames('item','Entry',styles.Tile)}>
            <div className={classNames(styles.Icon,'Icon')}>
              <Icon title={plugin.get('title')} />
            </div>
            <div className={classNames(styles.Title,'Title')}>
              <h4>{cleanTitle(plugin.get('title'))}</h4>
            </div>

            <div className={classNames(styles.Wiki,'Wiki')}>
              {plugin.get('wiki.url')}
            </div>

            <div className={classNames(styles.Downloads,'Downloads')}>
              Installs: {plugin.stats.currentInstalls} {plugin.stats.trend}
            </div>

            <div className={classNames(styles.Version,'Version')}>
              <span className={classNames(styles.v,'v')}>{plugin.get('version')}</span>
              <span className="jc">
                <span className="j">Jenkins</span>
                <span className="c">{plugin.get('requiredCore')}+</span>
              </span>
            </div>
            <div className={classNames(styles.Labels,'Labels')}>
              {getLabels(plugin.get('labels'),plugin.get('sha1'),labels)}
            </div>
            <div className={classNames(styles.Excerpt,'Excerpt')} dangerouslySetInnerHTML={{__html: plugin.get('excerpt')}} />

            <div className={classNames(styles.Authors,'Authors')}>
              {getMaintainers(plugin.get('maintainers'),plugin.get('sha1'))}
            </div>
            </Link>
          }
      </div>
    );
  }
}

Entry.propTypes = {
  plugin: PropTypes.any.isRequired,
  linkOnly: PropTypes.bool,
  setKey:PropTypes.string
};
