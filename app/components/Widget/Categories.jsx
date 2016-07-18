import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import PureComponent from 'react-pure-render/component';

export class Category extends PureComponent {
  constructor(properties) {
    super(properties);
    this.state  = properties.parent.state;
  }
  componentWillReceiveProps = function(nextProps){
    //category
    this.setState(this.props.parent.state);
  }  
  static propTypes = {
    tooltip: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    active: PropTypes.any.isRequired,
    parent: PropTypes.any.isRequired,
    applyFilters: PropTypes.any.isRequired
  };

  render() {
    const { id, active, title, tooltip, labels, parent, applyFilters } = this.props;
    
    this.checkState = function(prop,id){
      var value = this.state[prop];
      if (typeof value !== 'string') return false;
      if (value.indexOf(',') < 0 )
        return value === id;
      else
        return value.indexOf(id) > -1;
    }
    
    return (<li key={id} className={classNames(styles[id], id)}
    title={tooltip}>
      <label className={classNames(active)}>
        <input type="checkbox" name="category" value={id}
          onChange={(e)=>{ 
            applyFilters(e,parent);
          }}
          checked={this.checkState('category',id)}
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
                onChange={(e)=>{ 
                  applyFilters(e,parent);
                }}
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
    //this.state  = properties.state;
  }

  static propTypes = {
    parent: PropTypes.object.isRequired

  };
  
  render() {
    const {location, categories, applyFilters, state, parent} = this.props;
    const sortedCategories = categories.valueSeq();
    return (
      <fieldset className={classNames(styles.Categories, "categories")}>
      <legend>
        Categories 
        <button className={classNames('btn btn-secondary btn-sm')}
          name="all"
          value="category,labelFilter"
            onClickCapture={(e)=>{
            applyFilters(e,parent);
        }}>Show all</button>
      </legend>
      <ul className={classNames(styles.Cols3, "Cols3")}>
      
      {sortedCategories.map(
        (item, index) => {
          if (item.hidden) return null;
          return (
            <Category
              state={state}
              parent={parent}
              applyFilters={applyFilters}
              key={item.id}
              title={item.title}
              tooltip={item.description}
              id={item.id}
              labels={item.labels}
              active={(location.query.category === item.id) ? 'active' : ''}
            />
          );
        }
      )}
    </ul>
    </fieldset>);
  }
}
