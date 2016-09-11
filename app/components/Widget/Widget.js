import Entry from './Entry';
import styles from './Widget.css';
import Pagination from './Pagination';
import Filters from './Filters';
import Views from './Views';
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import Spinner from '../../commons/spinner';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import keydown from 'react-keydown';
import { getLabel } from '../../helper';

class Widget extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state  = {q:''};
    const { location } = context;
    const que = location.query;
    Object.keys(location.query).map((key)=>{
      this.state[key] = que[key];
    });

    if(que.q || que.categories || que.labels || que.maintainers)
      this.state.showResults = 'showResults';
  }

  static contextTypes = {
    location: PropTypes.object.isRequired
  };

  static propTypes = {
    totalSize: PropTypes.any.isRequired,
    labels: PropTypes.any,
    getVisiblePlugins: PropTypes.any,
    searchOptions: PropTypes.any.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isHome: PropTypes.bool.isRequired,
    getVisiblePluginsLabels: PropTypes.any,
    categories: PropTypes.any,
    installed: PropTypes.any,
    updated: PropTypes.any,
    trend: PropTypes.any
  };

  shouldComponentUpdate(nextProp,nextState) {
    //if(nextProp.isFetching) return false;
    return true;
  }

  formSubmit(e){
    //TODO: FIXME: These are attributes that need to come from label and category click events to check the parent-child rules their selection.
    // would be better for readability if their optional attributes were passed directly into this function.
    const clicked = e.nativeEvent.orgTarget || e.currentTarget;
    const parent = clicked.getAttribute('data-parent');
    const childred =e.nativeEvent.children || [];

    // These constant elements are pieces that will be used to reconcile the state of the form with the state and results of the app
    const { router } = this.props;
    const form = document.getElementById('plugin-search-form');
    const formElems = findDOMNode(form).elements;
    const state = this.state;

    // keep track of which location properties are new...
    let newLocationQuery = {};
    // keep existing state if not otherwise changed...
    const { location } = this.context;
    location.query = {showFilter:true,maintainers:state.maintainers};
    // reset the application state in preparation for evaluating the form settings...
    router.replace({});
    e.preventDefault();

    // Because selection is redundant with selection of its child labels, we need the UI to reflect that truth back to the user.
    // This helper function will look at each checked element and see if it still makes sense, given whatever was last clicked
    // and the parent category / child label relationship. It will return true if this checked element is redundant with latest clicked.
    function disqualifyByParentRules(checkedElem){
      if(checkedElem === clicked || !clicked.checked) return;
      const name = checkedElem.name;
      const value = checkedElem.value;
      const affectedLabels = childred;
      if(clicked.name === 'categories' && name === 'labels'){
       for(var i = 0; i < affectedLabels.length; i++){
         if(affectedLabels[i].id === value) return true;
       }
      }
      if(clicked.name === 'labels' && name === 'categories'){
        if(parent === value) return true;
      }
    }

    // function checks each form element and translates its state into the router's query sting...
    function checkElements(elem){
      const name = elem.name;
      const value = elem.value;
      const uncheck = (clicked.name === 'clear') ? clicked.value : '';
      if(name && uncheck.indexOf(name) === -1){
        if(elem.type === 'checkbox' || elem.type === 'radio'){
          if(typeof newLocationQuery[name] === 'string' ) return;
          if(elem.checked){
            if(disqualifyByParentRules(elem)) return;
            if(newLocationQuery[name])
              newLocationQuery[name].push(value);
            else
              newLocationQuery[name] = [value];
            if(elem.type !== 'radio') state.showResults = 'showResults';
            location.query[name] = newLocationQuery[name].join();
          }
        }
        else if (elem.name === 'clear' || value === ''){
          return;
        }
        else{
          state.showResults = 'showResults';
          location.query[name] = value;
        }
      }
    }

    // now lets check-em...
    for(let i = 0; i < formElems.length; i++){
      checkElements(formElems[i],location.query);
    }
    router.replace(location);

    return false;
  }

  sortList(valSeq,attr,func){
    func = func ||
      function (itemA,itemB){
          if(itemA.category === 'junk') return 1;
          var dateA = new Date(itemA[attr]);
          var dateB = new Date(itemB[attr]);
          return (dateA > dateB)? -1:
            (dateA < dateB)? 1: 0;
        };
    return valSeq.sort(func);
  }

  //TODO: these clear function should be 1 + an arg.
  clearMaintainers(event) {
    const { router } = this.props;
    const { location } = this.context;
    router.replace({});
    location.query = location.query || {};
    const labelId = event.currentTarget.name;
    const activeLabels = location.query.maintainers;
    const newLabels = (activeLabels)? activeLabels.split(','):[];
    newLabels.splice(newLabels.indexOf(labelId),1);
    const labelString = newLabels.join(',');
    if(newLabels.length ===0)
      delete location.query.maintainers;
    else
      location.query.categories = labelString;
    router.replace(location);
    this.setState({ maintainers: labelString});
  }

  clearCategories(event) {
    const { router } = this.props;
    const { location } = this.context;
    router.replace({});
    location.query = location.query || {};
    const labelId = event.currentTarget.name;
    const activeLabels = location.query.categories;
    const newLabels = (activeLabels)? activeLabels.split(','):[];
    newLabels.splice(newLabels.indexOf(labelId),1);
    const labelString = newLabels.join(',');
    if(newLabels.length ===0)
      delete location.query.categories;
    else
      location.query.categories = labelString;
    router.replace(location);
    this.setState({ categories: labelString});
  }

  clearLabels(event) {
    const { router } = this.props;
    const { location } = this.context;
    router.replace({});
    location.query = location.query || {};
    const labelId = event.currentTarget.name;
    const activeLabels = location.query.labels;
    const newLabels = (activeLabels)? activeLabels.split(','):[];
    newLabels.splice(newLabels.indexOf(labelId),1);
    const labelString = newLabels.join(',');
    if(newLabels.length ===0)
      delete location.query.labels;
    else
      location.query.labels = labelString;
    router.replace(location);
    this.setState({ labels: labelString});

  }

  clearSearch(event) {
    const { router } = this.props;
    const { location } = this.context;
    if(event) event.preventDefault();
    router.replace({});
    location.query = location.query || {};
    delete location.query.q;
    router.replace(location);
    this.setState({ q: ''});
  }

  toggleFilters(event,forceClose,forceOpen){
    if(event) event.preventDefault();

    if(forceOpen && typeof forceOpen === 'boolean'){
      this.setState({ showFilter: true});
    }
    else{
      if(this.state.showFilter || forceClose)
        this.setState({ showFilter: false});
      else
        this.setState({ showFilter: true});
    }
  }
  onChange(event){
    const target = event.currentTarget;
    if(target.name === 'q'){
      this.setState({q:target.value});
    }
    return true;
  }
  keyPress(event){
    const target = event.currentTarget;
    // toggle filters on ESC
    if(event.keyCode === 27){
      this.toggleFilters(event);
    }
    // submit form on ENTER
    if(event.keyCode === 13)
      this.formSubmit(event);
    // button clicked
    if(target.className && target.className.indexOf('SearchBtn') > -1)
      this.formSubmit(event);

  }

  clickClose(event){
    let el = event.target;
    for(let i = 0; i < 3; i++){
      el = el.parentNode;
      if(el, el.hasAttribute('data-reactroot')){
        this.toggleFilters(event,true);
      }
    }
  }


  @keydown( 'esc' )
  keyClose( event ) {
    this.keyPress(event,false,true);
  }

  render() {
    const {
      totalSize,
      isFetching,
      isHome,
      searchOptions,
      getVisiblePlugins,
      labels,
      categories,
      installed,
      updated,
      trend
    } = this.props;

    const { router } = this.context;
    const { location } = this.context;
    const {view = 'Tiles'} = location.query;

    const
      toRange = searchOptions.limit * Number(searchOptions.page) <= Number(searchOptions.total) ?
      searchOptions.limit * Number(searchOptions.page) : Number(searchOptions.total),
      fromRange = ((searchOptions.limit) * (Number(searchOptions.page)) - (searchOptions.limit - 1));

    return (
      <div className={classNames(styles.ItemFinder, view, this.state.showResults, 'item-finder')} onClick={this.clickClose.bind(this)}>
        <form ref="form" action="#" id="plugin-search-form" className={classNames(styles.HomeHeader, (this.state.showFilter)?'showFilter':'', 'HomeHeader jumbotron')} onSubmit={(e)=>{this.formSubmit(e);}}>

            <h1><span className="logo">Jenkins</span> Plugin Pantry</h1>


            <nav className={classNames(styles.navbar,'navbar')}>
              <div className="nav navbar-nav">
                <fieldset className={classNames(styles.SearchBox, 'form-inline SearchBox')}>

                  <div className={classNames(styles.searchBox, 'form-group')}>
                    <label className={classNames(styles.searchLabel, 'input-group')}>
                      <a className={classNames(styles.ShowFilter, styles.Fish, 'input-group-addon btn btn-primary ShowFilter')}
                        onClick={this.toggleFilters.bind(this)}
                       >
                        Browse
                        <span>{this.state.showFilter ? '▼' : '◄' }</span>
                      </a>
                      <input
                        name="q"
                          value={this.state.q}
                          className={classNames('form-control')}
                          onChange={this.onChange.bind(this)}
                          onFocus={(e)=>{this.toggleFilters(e,false,true)}}
                          onKeyDown={this.keyPress.bind(this)}
                          placeholder="Find plugins..."
                      />
                      <input type="submit" className="sr-only" />
                      <div onClick={this.keyPress.bind(this)} className={classNames(styles.SearchBtn, 'input-group-addon SearchBtn btn btn-primary')}>
                        <i className={classNames('icon-search')}/>
                      </div>
                    </label>
                  </div>
                </fieldset>

                <Views />

              </div>
            </nav>

            { this.state.showFilter ?
              <Filters
                labels={labels}
                categories={categories}
                location={location}
                router = {router}
                showResults={this.state.showResults}
                handleChecks={this.formSubmit}
              />
            : null }

            <p>Extend your Jenkins environment with any of the 1000+ community added plugins.
            Better yet, join the community and contribute your own.</p>

        </form>
        <div className="row results">
          {this.state.showFilter && this.state.showResults ? <div className="col-md-2"/> : null}
          <div className={classNames(styles.ItemsList, `items-box col-md-${this.state.showFilter && this.state.showResults ? '10' : '12'}` )}>


          <nav className="page-controls">
            <ul className="nav navbar-nav">
              <li className="nav-item active-filters">
                {location.query.maintainers ?
                  <div className="active-maintainers">
                    {location.query.maintainers.split(',').map((m,i)=>{
                      return(<a className="nav-link" key={'active-cats_'+m} name={m} onClick={this.clearMaintainers.bind(this)}>{getLabel(m)}</a>)
                    })}
                  </div>:null}
                {location.query.categories ?
                <div className="active-categories">
                  {location.query.categories.split(',').map((c,i)=>{
                    return(<a className="nav-link" key={'active-cats_'+c} name={c} onClick={this.clearCategories.bind(this)}>{getLabel(c,categories)}</a>)
                  })}
                </div>:null}
                {location.query.labels ?
                <div className="active-labels">
                  {location.query.labels && location.query.labels.split(',').map((l,i)=>{
                    return(<a className="nav-link" key={'active-labels_'+l} name={l} onClick={this.clearLabels.bind(this)}>{getLabel(l,labels)}</a>)
                  })}
                </div>:null}
                {location.query.q?
                <div className="active-string">
                  <a className="nav-link" title="clear search string" onClick={this.clearSearch.bind(this)} href="#clear-search-string">{location.query.q}</a>
                </div>:null}
              </li>
              <li className="nav-item page-picker">
                {totalSize > 0 &&
                  <span className="nav-link">
                    {fromRange} to&nbsp;
                    {toRange} of {totalSize}
                  </span>
                }
                {!isFetching && totalSize > 0 &&
                Number(searchOptions.pages) > 1 && <Pagination
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
                    labels={labels}
                    plugin={plugin}/>);
                })}
                {totalSize === 0 && !isFetching && (
                    <div className="no-results">
                      <h1>No results found</h1>
                      <p>You search did not return any results. Please try changing your search criteria or reloading the browser.</p>
                    </div>)}
              </div>
            </div>
          </div>

          <div className="clearfix"/>

          </div>
        </div>
        {categories && installed && updated && trend ?
        <div className="NoLabels">
        <div className="container">
          <div className="row">
            <div className={classNames(styles.NoLabels,'col-md-3 NoLabels')}>
              <fieldset>
                <legend>Browse categories</legend>
                {categories && categories.map((cat) => {
                  return(
                      <div key={`cat-box-id-${cat.id}`} className="Entry-box">
                        <a onClick={ () => {
                          location.query = {categories:cat.id};
                          router.replace(location);
                          this.setState({showResults: 'showResults'});
                        }}
                         key={`cat-id-${cat.id}`}>
                           {cat.title}
                       </a>
                     </div>
                   );
                })}
              </fieldset>
            </div>
            <div className="col-md-3">
              <fieldset>
                <legend>Most installed</legend>
                {installed && installed && installed.valueSeq()
                  .map((plugin) => {
                    return (
                      <Entry
                        className="Entry"
                        linkOnly
                        key={`installed_entry_${plugin.name}`}
                        setKey={`installed_${plugin.name}`}
                        plugin={plugin}
                      />
                    );
                })}
              </fieldset>
            </div>
            <div className="col-md-3">
              <fieldset>
                <legend>Recently updated</legend>
                {updated && updated.valueSeq()
                  .map((plugin) => {
                    return (
                      <Entry
                        className="Entry"
                        linkOnly
                        key={`updated_entry_${plugin.name}`}
                        setKey={`updated_${plugin.name}`}
                        plugin={plugin}
                      />
                    );
                })}
              </fieldset>
            </div>

            <div className="col-md-3">
              <fieldset>
                <legend>Recently installed</legend>
                {trend && trend.valueSeq()
                  .map((plugin) => {
                    return (
                      <Entry
                        className="Entry"
                        linkOnly
                        key={`updated_entry_${plugin.name}`}
                        setKey={`updated_${plugin.name}`}
                        plugin={plugin}
                      />
                    );
                })}
              </fieldset>
            </div>


          </div>
        </div>
        </div>:null}
      </div>
    );
  }

}

export default withRouter(Widget);
