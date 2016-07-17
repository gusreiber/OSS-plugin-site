import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import PureComponent from 'react-pure-render/component';

export class Category extends PureComponent {

  static propTypes = {
    tooltip: PropTypes.any.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
    active: PropTypes.any.isRequired
  };

  render() {
    const { id, active, title, tooltip, labels } = this.props;
    return (<li key={id} className={classNames(styles[id], id)}
    title={tooltip}>
      <label className={classNames(active)}>
        <input type="checkbox" name="category" value={id}/> 
        <span>{title}</span> 
      </label>
      <ul>
        {labels.map((label,index) => {
          return(
            <li key={label.id}>
              <label>
                <input type="checkbox" name="label" value={label.id} /> 
                <span>{label.title}</span>
              </label>
            </li>);
        })}
      </ul>
    </li>);
  }
}

export default class Categories extends PureComponent {

  static propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const {location, router, categories} = this.props;
    const sortedCategories = categories.valueSeq();
    return (
      <fieldset className={classNames(styles.Categories, "categories")}>
      <legend>
        Categories 
        <button className={classNames('btn btn-secondary btn-sm')}
          onClick={()=>{
            location.query = {category:null};
            logger.log(location);
            router.replace(this.props.location);       
        }}>Show all</button>
      </legend>
      <ul className={classNames(styles.Cols3, "Cols3")}>
      
      {sortedCategories.map(
        (item, index) => {
          if (item.hidden) return null;
          return (
            <Category
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
