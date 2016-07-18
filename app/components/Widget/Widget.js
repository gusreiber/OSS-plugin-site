import Entry from './Entry';
import styles from './Widget.css';
import LabelWidget from './Labels';
import Pagination from './Pagination';
import Filters from './Filters';
import Sort from './Sort';
import Views from './Views';
import React, { PropTypes } from 'react';
import Spinner from '../../commons/spinner';
import classNames from 'classnames';
import PureComponent from 'react-pure-render/component';

export default class Widget extends PureComponent {
  constructor(properties) {
    super(properties);
    this.state  = {};
    Object.keys(properties.location.query).map((key,item)=>{
      this.state[key] = properties.location.query[key];
    });
  }
  

  
  render() {
  
    const {
      totalSize,
      isFetching,
      searchOptions,
      getVisiblePlugins,
      labels,
      categories,
      location
      } = this.props;

    const { router } = this.context;

    const {view = 'Tiles'} = location.query;

    const
      toRange = searchOptions.limit * Number(searchOptions.page) <= Number(searchOptions.total) ?
      searchOptions.limit * Number(searchOptions.page) : Number(searchOptions.total),
      fromRange = (searchOptions.limit) * (Number(searchOptions.page) - 1);
    
    const sideFilter = this.state.showResults && this.state.showFilter;
    

      
    //<img src="http://stats.jenkins-ci.org/jenkins-stats/svg/total-jenkins.svg" />
    return (
      <div className={classNames(styles.ItemFinder, this.state.showResults, view, 'item-finder')}>
        <form action="#" className={classNames(styles.HomeHeader, 'HomeHeader jumbotron')} onSubmit={(e)=>{
          e.preventDefault(); return false;
        }}>
          <nav className={classNames(styles.navbar,"navbar")}>
            <div className="nav navbar-nav">
              <fieldset className={classNames(styles.SearchBox, 'form-inline SearchBox')}>
            
                <div className={classNames(styles.searchBox, 'form-group')}>
                  <label className={classNames(styles.searchLabel, 'input-group')}>
                    <a className={classNames(styles.ShowFilter, styles.Fish, 'input-group-addon ShowFilter')}
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ showFilter: !this.state.showFilter});
                     }}
                     >
                      Filter
                      <span>{this.state.showFilter ? "▼" : "◄" }</span>
                    </a>
                    <input
                      defaultValue={location.query.q}
                      className={classNames('form-control')}
                      onChange={event => {
                      debugger;
                        this.setState({showResults:'showResults'});
                        location.query.q = event.target.value;
                        location.query.limit = searchOptions.limit;
                        router.replace(location);
                      }}
                      placeholder="Find plugins..."
                    />
                    <div className={classNames(styles.SearchBtn, 'input-group-addon SearchBtn')}><i className={classNames('icon-search')}></i></div>
                  </label>
                </div>
              </fieldset>
              
              <Views
                router={router}
                location={location}
              />
            
            </div>
          </nav>
          { this.state.showFilter && !sideFilter ? 
            <Filters
              state={this.state}
              categories={categories}
              router={router}
              location={location}
              sideFilter={sideFilter}
            />: 
            null 
          }
        </form>
        {sideFilter ?
          <div className="col-md-2">
            <Filters
              categories={categories}
              router={router}
              location={location}
              sideFilter={sideFilter}
            />
          </div>
          :null
        }
        <div className={classNames(styles.ItemsList, 'items-box col-md-'+ (sideFilter? '10':'12') )}>

          
          <nav className="page-controls">
            <ul className="nav navbar-nav">
              <li className="nav-item filter">
                
              </li>
              <li className="nav-item page-picker">
                {!isFetching && totalSize > 0 &&
                Number(searchOptions.pages) > 1 && <Pagination
                  router={router}
                  location={location}
                  pages={Number(searchOptions.pages)}
                  page={Number(searchOptions.page)}
                />}
              </li>
              <li className="nav-item count">
                {totalSize > 0 &&
                <span className="nav-link">
                {fromRange} to&nbsp;
                  {toRange} of {totalSize}
              </span>
                }
              </li>

            </ul>


          </nav>
          <div className="padded-box">
            <div id="cb-item-finder-grid-box" className={classNames(styles.GridBox, 'grid-box')}>
              <div className={classNames(styles.Grid, 'grid')}>

                {isFetching && <Spinner>loading</Spinner>}

                {totalSize > 0 && getVisiblePlugins.valueSeq().map(plugin => {
                  return (<Entry
                    className="Entry"
                    key={plugin.name}
                    plugin={plugin}/>);
                })}
              </div>
            </div>
          </div>

          <div className="clearfix"></div>

        </div>

      </div>
    );
  }

}

Widget.contextTypes = {
  router: PropTypes.object.isRequired,
};

Widget.propTypes = {
  location: PropTypes.object.isRequired,
  totalSize: PropTypes.any.isRequired,
  labels: PropTypes.any.isRequired,
  getVisiblePlugins: PropTypes.any,
  searchOptions: PropTypes.any.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getVisiblePluginsLabels: PropTypes.any,
};
