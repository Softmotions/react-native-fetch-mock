import {Map} from 'immutable';

class Response {
  constructor({
    status,
    data = {},
    headers = {},
    statusText = '',
  }) {
    this.status = status;
    this.data = data;
    this.headers = Map(headers);
    this.statusText = statusText;
  }

  get ok() {
    if (this.status >= 200 && this.status < 300) {
      return true;
    } else {
      return false;
    }
  }

  text() {
    try {
      return Promise.resolve(JSON.stringify(this.data));
    } catch (err) {
      return Promise.reject(new Error('failed text invoke.'));
    }
  }

  json() {
    return this.data;
  }

}

export default Response;
