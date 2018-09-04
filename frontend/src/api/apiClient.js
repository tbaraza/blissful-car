/* eslint-disable no-undef */
/* eslint-disable quote-props */

import axios from 'axios';

const API_ROOT = 'http://localhost:9000/api/v1/';

const apiClient = (method, url, { ...rest }) => {
  const instance = axios.create({
    baseURL: API_ROOT,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const config = {
    method,
    url,
    responseType: 'json',
    ...rest,
  };

  return instance
    .request(config)
    .then(response => Promise.resolve(response.data))
    .catch(err => Promise.reject(err));
};
export default apiClient;
