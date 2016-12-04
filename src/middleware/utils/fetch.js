import fetch from 'isomorphic-fetch';
import { toastr } from 'react-redux-toastr';

import getApiEntrypoint from './getApiEntrypoint.js';

toastr.success('Sucessfully...', '...loaded the Toastr component');

const params = data => ({
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export default (uri, { method, data, errorMessage } = {}) => {
  let opts = {
    credentials: 'include',
    mode: 'cors',
  };
  if (method) {
    opts = {
      ...params(data),
      method,
      ...opts,
    };
  }
  return fetch(getApiEntrypoint(uri), opts)
  .catch((error) => {
    // Don't use errorMessage here to allow for removing duplicates.
    toastr.error('Connection problem', 'The server could not be reached. Check your internet connection and reload the page...'); // TODO: i18n
    return Promise.reject(error);
  })
  .then((response) => {
    let handled = false;
    return response.json().then((json) => {
      if (response.ok) {
        return json;
      }
      toastr.error(errorMessage || 'Error', json.message);
      handled = true;
      return Promise.reject(response);
    }).catch((error) => {
      if (!handled) {
        toastr.error(errorMessage || 'Error', 'Server returned invalid JSON'); // TODO: i18n
      }
      return Promise.reject(error);
    });
  });
};
