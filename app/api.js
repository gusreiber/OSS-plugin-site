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

  static getInitialData() {
    return Promise.all([
      this.getCategories(),
      this.getLabels(),
      this.getInstalled(),
      this.getTrend(),
      this.getUpdated()
    ]).then((data) => {
      return {
        categories: data[0],
        labels: data[1],
        installed: data[2],
        trend: data[3],
        updated: data[4]
      };
    });
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

  static getPlugin(name) {
    const url = `${env.REST_API_URL}/plugin/${name}`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data;
      });
  }

  static getPlugins(query, categories, labels, sort, page, limit) {
    const data = {
      q: query,
      categories: categories.join(','),
      labels: labels.join(','),
      limit: limit,
      page: page,
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

  static getInstalled() {
    const url = `${env.REST_API_URL}/plugins/installed`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data.plugins;
      });
  }

  static getUpdated() {
    const url = `${env.REST_API_URL}/plugins/updated`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data.plugins;
      });
  }

  static getTrend() {
    const url = `${env.REST_API_URL}/plugins/trend`;
    return fetch(url, fetchOptions)
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(data => {
        return data.plugins;
      });
  }

}
