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
  }
  
  render() {
    const {categories, labels, location, handleChecks, showResults} = this.props;
    return (
        <div className={classNames(styles.FiltersBox)}>
        <div className={classNames(styles.filters, 'filters', ((showResults)? 'col-md-2' :'container'))}>
          <div className={classNames(styles.Header,'row')}>
            <div className={(showResults)?'col-md-12':'col-md-3'}>
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
            <div className={(showResults)?'col-md-12':'col-md-9'}>
              <Categories
                categories={categories}
                labels={labels}
                location={location}
                handleChecks={handleChecks}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}
