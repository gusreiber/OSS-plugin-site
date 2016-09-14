import env from './commons/env';

import fetch from 'isomorphic-fetch';
import querystring from 'querystring';
require('es6-promise').polyfill();

const fetchOptions = { credentials: 'same-origin' };

export default class Api {

  static checkStatus(response) {
    if (response.status >= 300 || response.status < 200) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
    return response;
  }

  static parseJSON(response) {
    return response.json();
  }

  static getCategories() {
    const url = `${env.REST_API_URL}/categories`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data.categories;
      });
  }

  static getLabels() {
    const url = `${env.REST_API_URL}/labels`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data.labels;
      });
  }

  static getPlugins(query, categories, labels, sort) {
    const data = {
      q: query,
      categories: categories.join(','),
      labels: labels.join(','),
      sort: sort
    };
    const url = `${env.REST_API_URL}/plugins?${querystring.stringify(data)}`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data;
      });
  }

}
