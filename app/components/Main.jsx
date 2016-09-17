import React from 'react';
import { withRouter } from 'react-router';
import Api from '../commons/api';
import Dashboard from './Dashboard';

class Main extends React.Component {

  // ======== Life cycle methods ======== //

  componentWillMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }

  // ======== Class methods ======== //

  clearQuery() {
  }

  search(opts = { resetPage: false }) {
  }

  selectSort(sort) {
  }

  toggleCategory(category) {
  }

  toggleFilter(opts = { forceOpen: false, forceClose: false }) {
  }

  toggleLabel(label, categoryId) {
  }

  updatePage(page) {
  }

  updateQuery(query) {
  }

  updateView(view) {
  }

}

export default withRouter(Main);
