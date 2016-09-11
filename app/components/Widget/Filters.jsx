import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Widget.css';
import Autocomplete from './Autocomplete';
import Categories from './Categories';

export default class Filters extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  static contextTypes = {
    location: PropTypes.object.isRequired
  };

  static propTypes = {
    categories: PropTypes.object.isRequired,
    labels: PropTypes.object.isRequired,
    handleChecks: PropTypes.func.isRequired,
    showResults: PropTypes.string
  };

  handleChange(e) {
    const val = e.currentTarget.value;
    const name = e.currentTarget.name;
    this.setState({[name]:val});
    document.getElementById('plugin-search-form').dispatchEvent(new Event("submit"));
  }

  render() {
    const { location } = this.context;
    const sort = location.query.sort || 'relevance';
    const {categories, labels, handleChecks, showResults} = this.props;
    return (
        <div className={classNames(styles.FiltersBox)}>
        <div className={classNames(styles.filters, 'filters', showResults ? 'col-md-2' : 'container')}>
          <div className={classNames(styles.Header,'row')}>
            <div className={showResults ?'col-md-12' : 'col-md-3'}>
              <fieldset className="sortOptions">
                <legend>Sort {location.query.sort}</legend>
                <label><input type="radio" name="sort" value="relevance" checked = {sort === 'relevance'} onChange={this.handleChange} /> Relevance</label>
                <label><input type="radio" name="sort" value="installed" checked = {sort === 'installed'} onChange={this.handleChange}  /> Most installed</label>
                <label><input type="radio" name="sort" value="trend" checked = {sort === 'trend'} onChange={this.handleChange} /> Recently installed</label>
                <label><input type="radio" name="sort" value="title" checked = {sort === 'title'} onChange={this.handleChange} /> Title</label>
                <label><input type="radio" name="sort" value="updated" checked = {sort === 'updated'} onChange={this.handleChange} /> Release date</label>
              </fieldset>
              <fieldset className="filterOptions">
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
            <div className={showResults ? 'col-md-12' : 'col-md-9'}>
              <Categories
                categories={categories}
                labels={labels}
                handleChecks={handleChecks}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
