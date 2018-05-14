import { Map } from 'immutable';

class Response {
  constructor() {
    this.status = 200;
    this.data = {};
    this.headers = Map();
    this.statusText = '';
  }

  success(payload) {
    this.status = 200;
    this.data = {
      is_ok: true,
      status: 'ok',
      description: 'OK',
      payload
    };
  }

  failure(description, payload = null, status = null) {
    if (payload * 1 + '' === payload + '') {
      status = payload;
      payload = null;
    }

    if (!status) {
      status = 500;
    }

    this.status = status;

    this.data = {
      is_ok: false,
      status: 'error',
      description: description,
      payload
    };
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
