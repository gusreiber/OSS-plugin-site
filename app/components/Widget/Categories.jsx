import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import PureComponent from 'react-pure-render/component';

export class Category extends PureComponent {
  constructor(properties) {
    super(properties);
  }

  static propTypes = {
    tooltip: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    location: PropTypes.object.isRequired
  };
  
  getResults(e){
    document.getElementById('plugin-search-form').dispatchEvent(new Event("submit"));  
  }
  
  checkState(name,value){
    const q = this.props.location.query;
    const qName = q[name];
    if(!q || !qName) return false;
    return qName.split(',').indexOf(value) > -1;
  }
  
  render() {
    const { id, title, tooltip, labels, location } = this.props;
    
    return (<li key={id} className={classNames(styles[id], id)} title={tooltip}>
      <label>
        <input type="checkbox" name="category" value={id}
          checked={this.checkState('category',id)}
          onChange={this.getResults}
        /> 
        <span>{title}</span> 
      </label>
        <ul>
          {labels.map((label,index) => {
            return(
              <li key={label.id} >
                <label>
                  <input type="checkbox" name="labelFilter" value={label.id} 
                  checked={this.checkState('labelFilter',label.id)}
                  onChange={this.getResults}
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
      <fieldset className={classNames(styles.Categories, "Categories")}>
        <legend>
          Categories 
          <button className={classNames('btn btn-secondary btn-sm')}
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
