import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import { logger } from '../../commons';
import Autocomplete from './Autocomplete';
import Categories from './Categories';
import PureComponent from 'react-pure-render/component';


export default class Filters extends PureComponent {

  render() {
    const {categories, router, location, sideFilter} = this.props;
    return (
        <div className={classNames(styles.FiltersBox)}>
        <div className={classNames(styles.filters, 'filters', ((sideFilter)? null :'container'))}>
          <div className={classNames(styles.Header,'row')}>
            <div className={(sideFilter)?'col-md-12':'col-md-3'}>
              <fieldset>
                <legend>Sort</legend>
                <label><input type="radio" name="sort" value="rel" defaultChecked /> Relevance</label>
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
            <div className={(sideFilter)?'col-md-12':'col-md-9'}>
              <Categories
                categories={categories}
                router={router}
                location={location}
              />
            </div>

          </div>
          <div className={classNames(styles.Footer,'row')}>
            <div className={classNames('col-md-12')}>
              <button className={classNames('pull-xs-right btn')}>Go</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
