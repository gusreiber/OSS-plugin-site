import Entry from './Entry';
import styles from './Widget.css';
import LabelWidget from './Labels';
import Pagination from './Pagination';
import Filters from './Filters';
import Sort from './Sort';
import Views from './Views';
import Categories from './Categories';
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

  showResults(locationQuery){
    if(this.state.showResults === true ||(typeof locationQuery === 'boolean' && locationQuery)){ 
      this.state.showResults = true;
      return 'showResults';
    } 
    const lq = locationQuery || this.props.location.query;
    if(lq.q || lq.labelFilter || lq.category ){
      this.state.showResults = true;
      return 'showResults';
    }
    return false;
  }
  
  sortList(valSeq,attr,func){
    func = func ||
      function(itemA,itemB){
          if(itemA.category === 'junk') return 1; 
          var dateA = new Date(itemA[attr]);
          var dateB = new Date(itemB[attr]);
          return (dateA > dateB)? -1:
            (dateA < dateB)? 1: 0;
        };
    return valSeq.sort(func);
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
    
    
    return (
      <div className={classNames(styles.ItemFinder, this.showResults(), view, 'item-finder')}>
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
                        location.query.q = event.target.value;
                        location.query.limit = searchOptions.limit;
                        router.replace(location);
                        this.showResults(location.query);
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
          { this.state.showFilter ? 
            <Filters
              showResults={this.showResults}
              state={this.state}
              categories={categories}
              router={router}
              location={location}
            />
          : null }
        </form>
        <div className="row results">
          {this.state.showFilter && this.state.showResults?
            <div className="col-md-2"></div>
            :null
          }
          <div className={classNames(styles.ItemsList, 'items-box col-md-'+ (this.state.showFilter && this.state.showResults? '10':'12') )}>

          
          <nav className="page-controls">
            <ul className="nav navbar-nav">
              <li className="nav-item count">
                {totalSize > 0 &&
                <span className="nav-link">
                {fromRange} to&nbsp;
                  {toRange} of {totalSize}
              </span>
                }
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
        <div className="NoLabels">
        <div className="container">
          <div className="row">
            <div className={classNames(styles.NoLabels,"col-md-3 NoLabels")}>
              <Categories
                parent={this}
                noLabels={true}
                applyFilters={function(){alert('?');}}
                categories={categories}
                router={router}
                location={location}
              />
            </div>
            <div className="col-md-3">
              <fieldset>
                <legend>Most downloaded</legend>
                {totalSize > 0 && getVisiblePlugins.valueSeq().sortBy(plugin => plugin.download)
                  .map((plugin,i) => {
                    if(i>9) return false;
                    return (
                      <Entry
                        className="Entry"
                        linkOnly={true}
                        key={plugin.name}
                        plugin={plugin}
                      />
                    );
                })}
              </fieldset>             
            </div>
            <div className="col-md-3">
              <fieldset>
                <legend>Recently updated</legend>
                {totalSize > 0 && 
                  this.sortList(getVisiblePlugins.valueSeq(),'releaseTimestamp')
                    .map((plugin,i) => {
                      if(i>9) return false;
                      return (
                      <Entry
                        className="Entry"
                        linkOnly={true}
                        key={plugin.name}
                        plugin={plugin}
                      />
                    );
                })}
              </fieldset>
            </div>
            
            <div className="col-md-3">
              <fieldset>
                <legend>Rapidly adopted</legend>            
                {totalSize > 0 && 
                  this.sortList(getVisiblePlugins.valueSeq(),'trend')
                    .map((plugin,i) => {
                      if(i>9) return false;
                      return (
                      <Entry
                        className="Entry"
                        linkOnly={true}
                        key={plugin.name}
                        plugin={plugin}
                      />
                    );
                })}                      
              </fieldset>
            </div>
            
            
          </div>
        </div>
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
