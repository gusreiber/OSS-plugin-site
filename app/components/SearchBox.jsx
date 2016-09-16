import React, { PropTypes } from 'react';
import styles from './Main.css';
import classNames from 'classnames';

export default class SearchBox extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.forceShowFilter = this.forceShowFilter.bind(this);
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
    this.props.updateQuery(this.query.value);
  }

  forceShowFilter(event) {
    this.props.toggleFilter({ forceOpen: true });
  }

  render() {
    const { query, showFilter, toggleFilter } = this.props;
    return (
      <fieldset className={classNames(styles.SearchBox, 'form-inline SearchBox')}>
        <div className={classNames(styles.searchBox, 'form-group')}>
          <label className={classNames(styles.searchLabel, 'input-group')}>
            <a className={classNames(styles.ShowFilter, styles.Fish, 'input-group-addon btn btn-primary ShowFilter')}
              onClick={toggleFilter}
            >
              Browse <span>{showFilter ? '▼' : '◄' }</span>
            </a>
            <input ref={(ref) => this.query = ref}
                value={query}
                onChange={this.handleOnChange}
                onFocus={this.forceShowFilter}
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
