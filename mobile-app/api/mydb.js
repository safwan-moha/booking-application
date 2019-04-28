import base64 from 'base-64';
import { fetch } from 'fetch';
import { backend_url, base_username, base_password } from './constants';

class mydb {
  constructor() {
  }

  sendGet = ({ urlEnd }) => {
    const headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(`${base_username}:${base_password}`));

    const url = backend_url + urlEnd;
    console.log('GET: ' + url);
    return fetch(url, {
      headers,
      method: "GET"
    });
  }

  sendPost = ({ urlEnd, payload }) => {
    const headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode(`${base_username}:${base_password}`));
    headers.append("Content-Type", "application/json");

    const url = backend_url + urlEnd;
    console.log('POST: ' + url);
    return fetch(url, {
      headers,
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  login = ({ username, password }) => {
    return this.sendGet({
      urlEnd: `login/BUYER/auth/${username}`,
      payload: { hash: password }
    });
  }

  getServiceProviders = () => {
    return this.sendGet({
      urlEnd: `seller`
    });
  }

  addAppointment = (payload) => {
    return this.sendPost({
      urlEnd: `buyer/book/`,
      payload
    });
  }
}

export default new mydb();