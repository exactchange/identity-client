const fetch = require('node-fetch');
const parser = require('node-fetch-parser');
const querystring = require('query-string');

let baseURL = '';

const request = (method, url, body = {}) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  return fetch(url, options);
};

const parse = parser({
  getToken: async params => (
    request(
      'POST',
      `${baseURL}/identity/auth`,
      params
    )
  ),

  getUser: async params => (
    request(
      'GET',
      `${baseURL}/identity/user?${querystring.stringify(params)}`
    )
  ),

  getUsers: async params => (
    request(
      'GET',
      `${baseURL}/identity/users?${querystring.stringify(params)}`
    )
  ),

  setUser: async params => (
    request(
      'PUT',
      `${baseURL}/identity/user`,
      params
    )
  ),

  createUser: async params => (
    request(
      'POST',
      `${baseURL}/identity/user`,
      params
    )
  ),

  resetPassword: async params => (
    request(
      'POST',
      `${baseURL}/identity/resetPassword`,
      params
    )
  )
});

module.exports = {
  setURL: url => baseURL = url,

  create: async credentials => (
    parse('getToken', credentials)
  ),

  read: async params => (
    parse('getUser', params)
  ),

  list: async params => (
    parse('getUsers', params)
  ),

  update: async params => (
    parse('setUser', params)
  ),

  register: async params => (
    parse('createUser', params)
  ),

  resetPassword: async params => (
    parse('resetPassword', params)
  )
};
