import {Constants, Utils} from '../utils';

// import NetInfo from "@react-native-community/netinfo";

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error('timeout'));
    }, ms);
    promise.then(resolve, reject);
  });
}

class Services {
  async get(endpoint, headers = {}) {
    var postData = {
      method: 'GET',
      headers,
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
    };

    if (!Utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if (response.status == 'SUCCESS') {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        error.errorCode = 999;
        return Promise.reject(error);
      });
  }

  //

  /*  async post(endpoint, headers = {}, body = {}, isFormData = false) {
     var postData = {
       method: 'POST',
       headers
     };
 
     if (!Utils.isEmpty(body)) {
       postData.body = isFormData ? body : JSON.stringify(body)
     }
 
     NetInfo.fetch().then(state => {
 
       if (!state.isConnected) {
 
         Utils.showToastMessage('Please check internet connection', 'danger');
         return Promise.reject(new Error('No Internet Connection'))
         return true;
 
       }
 
     });
 
     const FETCH_TIMEOUT = 3000;
     let didTimeOut = false;
 
     return new Promise(function (resolve, reject) {
       const timeout = setTimeout(function () {
         didTimeOut = true;
         reject(new Error('Request timed out'));
       }, FETCH_TIMEOUT);
 
       return fetch(Constants.baseurl + endpoint, postData)
         .then((response) => response.json())
         .then(function (response) {
           // console.log(response)
 
           clearTimeout(timeout);
           if (!didTimeOut) {
             console.log('fetch good! ', response);
             return resolve(response);
           }
 
         })
         .catch(function (err) {
           console.log('fetch failed! ', err);
 
           // Rejection already happened with setTimeout
           if (didTimeOut) return;
           // Reject with error
           reject(err);
         });
     })
       .then(function (response) {
         // Request success and no timeout
         // console.log('good promise, no timeout! ', response);
         return Promise.resolve(response);
 
       })
       .catch(function (err) {
         // Error: response error, request timeout or runtime error
         Utils.showToastMessage('Server Time taking long', 'warn');
         console.log('promise error! ', err);
         return Promise.reject(err);
       });
   } */

  async post(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: 'POST',
      headers,
    };

    if (!Utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    let res = [];
    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  async delete(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: 'DELETE',
      headers,
    };

    if (!Utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if (response.status == 'SUCCESS') {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        error.errorCode = 999;
        return Promise.reject(error);
      });
  }

  async patch(endpoint, headers = {}, body = {}, isFormData = false) {
    var postData = {
      method: 'PATCH',
      headers,
    };

    if (!Utils.isEmpty(body)) {
      postData.body = isFormData ? body : JSON.stringify(body);
    }

    return fetch(Constants.baseurl + endpoint, postData)
      .then(response => response.json())
      .then(response => {
        if (response.status == 'SUCCESS') {
          return Promise.resolve(response);
        }
        return Promise.reject(response);
      })
      .catch(error => {
        error.errorCode = 999;
        return Promise.reject(error);
      });
  }
}
export default new Services();
