import React, { PropTypes} from 'react';
import styles from './Widget.css';
import {cleanTitle, getMaintainers, getLabels  } from '../../helper';
import classNames from 'classnames';
import { Link } from 'react-router';
import Icon from './Icon';

export default class Entry extends React.PureComponent {

  static propTypes = {
    labels: PropTypes.any,
    plugin: PropTypes.any.isRequired,
    setKey: PropTypes.string,
  };

  render() {
    const { labels, plugin, setKey } = this.props;
    const link = setKey !== undefined ?
      <Link to={`/${plugin.name}`} className="titleOnly">
        {cleanTitle(plugin.title)}
      </Link>
      :
      <Link to={`/${plugin.name}`} className={classNames('item', 'Entry', styles.Tile)}>
        <div className={classNames(styles.Icon, 'Icon')}>
          <Icon title={plugin.get('title')} />
        </div>
        <div className={classNames(styles.Title, 'Title')}>
          <h4>{cleanTitle(plugin.get('title'))}</h4>
        </div>
        <div className={classNames(styles.Wiki, 'Wiki')}>
          {plugin.get('wiki.url')}
        </div>
        <div className={classNames(styles.Downloads, 'Downloads Installs')}>
          Installs: {plugin.stats.currentInstalls}
        </div>
        <div className={classNames(styles.Version, 'Version')}>
          <span className={classNames(styles.v, 'v')}>{plugin.get('version')}</span>
          <span className="jc">
            <span className="j">Jenkins</span>
            <span className="c">{plugin.get('requiredCore')}+</span>
          </span>
        </div>
        <div className={classNames(styles.Labels, 'Labels')}>
          {getLabels(plugin.get('labels'), plugin.get('sha1'),labels)}
        </div>
        <div className={classNames(styles.Excerpt, 'Excerpt')}
          dangerouslySetInnerHTML={{__html: plugin.get('excerpt')}} />
        <div className={classNames(styles.Authors, 'Authors')}>
          {getMaintainers(plugin.get('maintainers'), plugin.get('sha1'))}
        </div>
      </Link>;
    return (
      <div
        key={setKey !== undefined ? setKey : plugin.get('sha1')}
        className={classNames(styles.Item, 'Entry-box')}
      > {link}
      </div>
    );
  }
}
