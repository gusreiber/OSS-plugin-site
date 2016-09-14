import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';

export default class Category extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    id: PropTypes.any.isRequired,
    labels: PropTypes.array.isRequired,
    title: PropTypes.any.isRequired,
    tooltip: PropTypes.any.isRequired
  };

  static contextTypes = {
    location: PropTypes.object.isRequired
  };

  handleChange(e) {
    //TODO:FIXME: seems hacky to toss the original target and the related child labels into the event like this...
    //but I am doing it, so hold your nose...
    const myEvent = new Event('submit');
    myEvent.orgTarget = e.currentTarget;
    myEvent.children = this.props.labels;
    document.getElementById('plugin-search-form').dispatchEvent(myEvent);
  }

  checkState(name, value) {
    const query = this.context.location.query || '';
    const queryName = query[name];
    return queryName ? queryName.split(',').indexOf(value) > -1 : false;
  }

  render() {
    const { id, title, tooltip, labels } = this.props;
    return (
      <li key={id} className={classNames(styles[id], id, (this.checkState('categories', id)) ? 'mask' : '')}
        title={tooltip}
      >
        <label>
          <input type="checkbox" name="categories" value={id}
            checked={this.checkState('categories', id)}
            onChange={this.handleChange}
          />
          <span>{title}</span>
        </label>
        <ul>
          {labels.map((label) => {
            return(
              <li key={label.id} >
                <label>
                  <input type="checkbox" name="labels" value={label.id} data-parent={id}
                  checked={this.checkState('labels', label.id)}
                  onChange={this.handleChange}
                />
                  <span>{label.title}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }
}