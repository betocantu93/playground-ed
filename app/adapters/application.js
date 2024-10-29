import { action } from '@ember/object';
import { underscore } from '@ember/string';
import JSONAPIAdapter from '@ember-data/adapter/json-api';

import { pluralize } from 'ember-inflector';

export default class ApplicationAdapter extends JSONAPIAdapter {
  /*
    Build headers with projectId, session token and client id
  */
  @action
  async getHeaders() {
    let headers = {
      'Content-Type': 'application/vnd.api+json',
    };

    return headers;
  }

  async ajax(url, type, options = {}) {
    let headers = await this.getHeaders();

    options.headers = Object.assign(options.headers || {}, headers);

    const response = await super.ajax(url, type, options);

    return response;
  }

  /*
    Sets the backend's host
  */
  get host() {
    return 'http://localhost:3000';
  }

  
}
