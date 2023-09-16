import apis from '../apis';
// import axios from 'axios';
import axios, {AxiosResponse, AxiosError} from 'axios';
// import Constants from "../utils/Constants";
import {Constants, Utils} from '../utils';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const get_post = () => {
  try {
    return async dispatch => {
      headers = {};
      axios
        .get(API_URL, {
          headers,
        })
        .then(response => {
          // onResp('success_axios_dispatch ', response);
          // dispatch({
          //   type:,
          //   payload :response
          // })
        })
        .catch((reason: AxiosError) => {
          console.log('success_axios_dispatch', reason);
          onResp('error', reason.response);
        });
    };
  } catch (error) {}
};

export const login = (email, password, onResp) => {
  var body = {
    username: email,
    password: password,
  };

  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  axios
    .post('', body, headers)
    .then(res => {
      onResp('success', res);
    })
    .catch(error => {
      console.log('=== +', error);
      onResp('error', error);
    });
};

export const postRequest = (
  endpoint,
  body,
  token = '',
  mutliPart = false,
  onResp,
) => {
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  console.log('baseUrl ', Constants.baseurl + endpoint);
  console.log('body __ ', body);

  axios
    .post(
      Constants.baseurl + endpoint,

      {body},
      {
        headers,
      },
    )
    .then(response => {
      onResp('success', response);
      // console.log('success', response);
    })
    .catch((reason: AxiosError) => {
      // console.log('reason', reason);
      // if (reason.response.status == 401) {
      //     Utils.showToastMessage("Authentication Error", "danger");
      // }
      // else if (reason.response.status == 422) {
      //     if (reason.response.data.message) {
      //         Utils.showToastMessage(reason.response.data.message, "danger");
      //     }
      //     if ('errors' in reason.response.data) {

      //         var keys = [];
      //         for (var k in reason.response.data.errors) {
      //             break;
      //         }
      //         Utils.showToastMessage(reason.response.data.errors[k][0], "danger");

      //     }
      // }
      onResp('error dsfa', reason);
      // onResp('success', response);
      // console.log('success', response);
    });
};
// export const postRequest = (endpoint, body, token = '', mutliPart = false, onResp) => {

export const patchRequest = (
  endpoint,
  body,
  token = '',
  mutliPart = false,
  onResp,
) => {
  var headers = {};
  if (mutliPart == true) {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    };
  } else {
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    };
  }

  axios
    .patch(Constants.baseurl + endpoint, body, {
      headers,
    })
    .then(response => {
      onResp('success', response);
    })
    .catch((reason: AxiosError) => {
      if (reason.response.data.message) {
        Utils.showToastMessage(reason.response.data.message, 'danger');
        onResp('error', reason.response);
      }
      if (reason.response.status == 401) {
        Utils.showToastMessage('Authentication Error', 'danger');
      } else if (reason.response.status == 422) {
        if ('errors' in reason.response.data) {
          var keys = [];
          for (var k in reason.response.data.errors) {
            console.log('my errors', reason.response.data.errors[k][0]);
            break;
          }
          Utils.showToastMessage(reason.response.data.errors[k][0], 'danger');
        }
      }
      onResp('error', reason.response);
    });
};

export const getRequest = (endpoint, token = '', onResp) => {
  var headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  };

  // console.log('url ' + Constants.baseurl + endpoint);

  axios
    .get(Constants.baseurl + endpoint, {
      headers,
    })
    .then(response => {
      onResp('success ', response);
    })
    .catch((reason: AxiosError) => {
      console.log('reason', reason);

      if (reason.response.status == 401) {
        Utils.showToastMessage('Authentication Error', 'danger');
      } else if (reason.response.status == 422) {
        if ('errors' in reason.response.data) {
          var keys = [];
          for (var k in reason.response.data.errors) {
            console.log('my errors', reason.response.data.errors[k][0]);
            break;
          }
          Utils.showToastMessage(reason.response.data.errors[k][0], 'danger');
        }
      }
      onResp('error', reason.response);
    });
};
