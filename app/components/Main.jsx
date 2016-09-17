import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from '../styles/Main.css';
import classNames from 'classnames';
import Filters from './Filters';
import Footer from './Footer';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import Views from './Views';
import { search } from '../actions';

class Main extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  static propTypes = {
    isFiltered: PropTypes.bool.isRequired,
    showFilter: PropTypes.bool.isRequired,
    showResults: PropTypes.bool.isRequired,
    search: PropTypes.func.isRequired,
    view: PropTypes.string.isRequired
  };

  handleOnSubmit(event) {
    event.preventDefault();
    this.props.search({ resetPage: true });
  }

  render() {
    return (
      <div className={classNames(styles.ItemFinder, this.props.view, { showResults: this.props.showResults }, { isFiltered: this.props.isFiltered }, 'item-finder')}>
        <form ref="form" action="#" id="plugin-search-form"
            className={classNames(styles.HomeHeader, { showFilter: this.props.showFilter }, 'HomeHeader jumbotron')}
            onSubmit={this.handleOnSubmit}>
          <h1><span className="logo">project</span>Voltron</h1>
          <p className="tagline">The strength of many, shared by all.</p>
          <nav className={classNames(styles.navbar, 'navbar')}>
            <div className="nav navbar-nav">
              <SearchBox handleOnSubmit={this.handleOnSubmit} />
              <Views />
            </div>
          </nav>
          <Filters />
          <p>
            Extend your Jenkins environment with any of the 1000+ community added plugins.
            Better yet, join the community and contribute your own.
          </p>
        </form>
        <SearchResults />
        <Footer />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { ui } = state;
  const { isFiltered, showFilter, showResults, view } = ui;
  return {
    isFiltered,
    showFilter,
    showResults,
    view
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (opts) => {
      dispatch(search(opts));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
