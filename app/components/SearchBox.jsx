import React, { PropTypes } from 'react';
import styles from './Main.css';
import classNames from 'classnames';

export default class SearchBox extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleToggleFilter = this.handleToggleFilter.bind(this);
  }

  static propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    showFilter: PropTypes.bool.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired
  };

  handleOnChange(event) {
    event.preventDefault();
    this.props.updateQuery(event.currentTarget.value);
  }

  // For some reason the input.onFocus was overriding a.onClick so use the
  // same function and detect the caller
  handleToggleFilter(event) {
    event.preventDefault();
    const forceOpen = event.currentTarget.name === 'query';
    this.props.toggleFilter({ forceOpen: forceOpen });
  }

  render() {
    const { query, showFilter } = this.props;
    return (
      <fieldset className={classNames(styles.SearchBox, 'form-inline SearchBox')}>
        <div className={classNames(styles.searchBox, 'form-group')}>
          <label className={classNames(styles.searchLabel, 'input-group')}>
            <a className={classNames(styles.ShowFilter, styles.Fish, 'input-group-addon btn btn-primary ShowFilter')}
              onClick={this.handleToggleFilter}
            >
              Browse <span>{showFilter ? '▼' : '◄' }</span>
            </a>
            <input name="query"
                value={query}
                onChange={this.handleOnChange}
                onFocus={this.handleToggleFilter}
                className={classNames('form-control')}
                placeholder="Find plugins..."
            />
            <input type="submit" className="sr-only" />
            <div className={classNames(styles.SearchBtn, 'input-group-addon SearchBtn btn btn-primary')} onClick={this.props.handleOnSubmit}>
              <i className={classNames('icon-search')} />
            </div>
          </label>
        </div>
      </fieldset>
    );
  }

}
