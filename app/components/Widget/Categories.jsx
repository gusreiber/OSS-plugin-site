import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import PureComponent from 'react-pure-render/component';

export class Category extends PureComponent {
  constructor(properties) {
    super(properties);
    this.state = properties.location.query
  }

  static propTypes = {
    tooltip: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired
  };

  handleChange(e){
    //TODO:FIXME: seems hacky to toss the original target and the related child labels into the event like this... 
    //but I am doing it, so hold your nose...
    let myEvent = new Event("submit");
    myEvent.orgTarget = e.currentTarget;
    myEvent.children = this.props.labels;
    document.getElementById('plugin-search-form').dispatchEvent(myEvent);
  }

  checkState(name,value){
    const q = this.props.location.query;
    const qName = q[name];
    if(!q || !qName) return false;
    return qName.split(',').indexOf(value) > -1;
  }

  render() {
    const { id, title, tooltip, labels, location } = this.props;

    return (<li key={id} className={classNames(styles[id], id, (this.checkState('categories',id))?'mask':'')} title={tooltip}>
      <label>
        <input type="checkbox" name="categories" value={id}
          checked={this.checkState('categories',id)}
          onChange={this.handleChange.bind(this)}
        />
        <span>{title}</span>
      </label>
        <ul>
          {labels.map((label,index) => {
            return(
              <li key={label.id} >
                <label>
                  <input type="checkbox" name="labels" value={label.id} data-parent={id}
                  checked={this.checkState('labels',label.id)}
                  onChange={this.handleChange.bind(this)}
                />
                  <span>{label.title}</span>
                </label>
              </li>);
          })}
        </ul>
    </li>);
  }
}

export default class Categories extends PureComponent {
  constructor(properties) {
    super(properties);
  }

  static propTypes = {
    categories: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const {categories,labels, location, handleChecks} = this.props;
    const sortedCategories = categories.valueSeq();
    return (
      <fieldset className={classNames(styles.Categories)}>
        <legend>
          Categories
          <button className={classNames('btn btn-secondary btn-sm show-all')}
            name="clear"
            value="category,labelFilter"
              onClickCapture={handleChecks.bind(this)}>Show all</button>
        </legend>
      <ul className={classNames(styles.Cols3, "Cols3")}>

      {sortedCategories.map(
        (item, index) => {
          if (item.id === 'junk') return null;
          let theseLabels = [];
          item.labels.map(labelID=>{
            labels.map((label,i)=>{
              if(labelID === label.id){
                theseLabels.push(label);
                return false;
              }
            });
          });
          return (
            <Category
              location={location}
              key={item.id}
              title={item.title}
              tooltip={item.description}
              id={item.id}
              labels={theseLabels}
            />
          );
        }
      )}
    </ul>
    </fieldset>);
  }
}
Categories.contextTypes = {
    router: PropTypes.object.isRequired,
};
