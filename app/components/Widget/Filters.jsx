import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import Autocomplete from './Autocomplete';
import Categories from './Categories';
import PureComponent from 'react-pure-render/component';


export default class Filters extends PureComponent {
  constructor(properties) {
    super(properties);
    this.state  = properties.state;
  }
  
  applyFilters(e,parent){

    var location = parent.props.location;
    var router = parent.props.router;
    var trg = e.target;
    var formVals = $(trg).closest('form').serializeArray();
    var oldValuesToRest = $.extend({},parent.props.state);
    var newLocation = {};
    
    location.query = {category:'',labelFilter:''};
    
    formVals.map((field,i)=>{     
      if (newLocation[field.name])
          newLocation[field.name].push(field.value);
      else
        newLocation[field.name] = new Array(field.value);

      location.query[field.name] = newLocation[field.name].join();
    });
    if(trg.name === 'all'){
      var clears = trg.value.split(',');
      clears.map((val)=>{
        location.query[val] = '';
      });
    }
    router.replace(location);
    parent.setState(location.query);
    parent.props.showResults(location.query);
    
  }
  
  render() {
    const {categories, router, location, sideFilter, state} = this.props;
    return (
        <div className={classNames(styles.FiltersBox)}>
        <div className={classNames(styles.filters, 'filters', ((state.showResults)? 'col-md-2' :'container'))}>
          <div className={classNames(styles.Header,'row')}>
            <div className={(state.showResults)?'col-md-12':'col-md-3'}>
              <fieldset>
                <legend>Sort</legend>
                <label><input type="radio" name="sort" value="name" defaultChecked /> Relevance</label>
                <label><input type="radio" name="sort" value="trend"  /> Trend</label>
                <label><input type="radio" name="sort" value="download"  /> Downloads</label>
                <label><input type="radio" name="sort" value="title"  /> Title</label>
                <label><input type="radio" name="sort" value="updated"  /> Updated date</label>
                <label><input type="radio" name="sort" value="created"  /> Created date</label>
              </fieldset>
              <fieldset>
                <legend>Filters <button className={classNames('btn btn-secondary btn-sm')}>Clear all</button></legend>
                <Autocomplete
                  label="Maintainers"
                  name="maintainers"
                  placeholder="Plugin maintainers"
                />

                <Autocomplete
                  label="Core version"
                  name="core"
                  placeholder="Minimum Jenkins version"
                />
              </fieldset>                
            </div>
            <div className={(state.showResults)?'col-md-12':'col-md-9'}>
              <Categories
                state={state}
                parent={this}
                applyFilters={this.applyFilters}
                categories={categories}
                router={router}
                location={location}
              />
            </div>

          </div>
          <div className={classNames(styles.Footer,'row')}>
            <div className={classNames('col-md-12')}>
              <button className={classNames('pull-xs-right btn')}
                onClick={(e)=>{
                  this.applyFilters(e,this);
                }}>Go</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
