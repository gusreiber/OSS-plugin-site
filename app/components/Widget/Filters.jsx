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
    this.state = properties.location.query;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e){
    const val = e.currentTarget.value;
    const name = e.currentTarget.name;
    this.setState({[name]:val});
    document.getElementById('plugin-search-form').dispatchEvent(new Event("submit"));
  }
  render() {
    const {categories, labels, location, handleChecks, router, showResults} = this.props;
    return (
        <div className={classNames(styles.FiltersBox)}>
        <div className={classNames(styles.filters, 'filters', ((showResults)? 'col-md-2' :'container'))}>
          <div className={classNames(styles.Header,'row')}>
            <div className={(showResults)?'col-md-12':'col-md-3'}>
              <fieldset>
                <legend>Sort {location.query.sort}</legend>
                <label><input type="radio" name="sort" value="relevance" checked = {this.state.sort === 'relevance' || !this.state.sort} onChange={this.handleChange} /> Relevance</label>
                <label><input type="radio" name="sort" value="installed" checked = {this.state.sort === 'installed'} onChange={this.handleChange}  /> Most installed</label>
                <label><input type="radio" name="sort" value="trend" checked = {this.state.sort === 'trend'} onChange={this.handleChange}  /> Recently installed</label>
                <label><input type="radio" name="sort" value="title" checked = {this.state.sort === 'title'} onChange={this.handleChange}  /> Title</label>
                <label><input type="radio" name="sort" value="updated" checked = {this.state.sort === 'updated'} onChange={this.handleChange}  /> Release date</label>
              </fieldset>
              <fieldset>
                <legend>Filters <button onClickCapture={this.handleChange} name="clear" value="core,maintainers" className={classNames('btn btn-secondary btn-sm')}>Clear all</button></legend>
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
