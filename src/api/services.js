import Constants from '../common/Constants';
import utils from '../utils/index';
import {Toast} from 'native-base';
import NetInfo from '@react-native-community/netinfo';

const internetText = 'Please check your internet connection.';

class Services {
  async get(endpoint, headers = {}) {
    // NetInfo.fetch().then(state => {
    //     if (state.isConnected == false) {
    //         utils.showToastMessage(internetText, 'info');
    //         return false
    //     }
    // });

    var postData = {
      method: 'GET',
      headers,
      timeout: 30000,
    };
    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if (response) {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        error.errorCode = 999;
        return Promise.reject(error);
      });
  }

  async put(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: 'PUT',
      headers,
      timeout: 30000,
    };

    if (!utils.isEmpty(internetText)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if ('response' in response) {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  async post(
    endpoint,
    headers = {'Content-Type': 'application/json'},
    body = {},
    isFormData = false,
  ) {
    var postData = {
      method: 'POST',
      headers,
    };

    if (!utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    console.log('postData', postData);
    console.log('endpoint', Constants.baseurl + endpoint);

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if ('response' in response) {
          return Promise.resolve(response);
        }
        return Promise.resolve(response);
      })
      .catch(error => {
        console.log('__error', error);

        return Promise.reject(error);
      });
  }

  async delete(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: 'DELETE',
      headers,
      timeout: 30000,
    };

    if (!utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if ('response' in response) {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  async patch(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: 'PATCH',
      headers,
      timeout: 30000,
    };

    if (!utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if ('response' in response) {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
export default new Services();
