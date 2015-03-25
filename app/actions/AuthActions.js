import {Actions} from 'flummox';

function fakeSuccess(resp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(resp);
    }, 500);
  });
}

function fakeFailure(resp) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(resp);
    }, 500);
  });
}

function fakeLoadUser({token}) {
  if (token === 'secret_auth_token') {
    return fakeSuccess({
      username: 'fred',
      id: 5
    });
  } else {
    return fakeFailure({
      status: 401
    });
  }
}

function fakeLogIn() {
  return fakeSuccess({
    user: {
      username: 'fred',
      id: 5,
    },
    token: 'secret_auth_token'
  });
}

class AuthActions extends Actions {
  loadUser() {
    return fakeLoadUser({
      token: localStorage.token
    });
  }

  logIn() {
    return fakeLogIn();
  }

  logOut() {
    return fakeSuccess();
  }
}

export default AuthActions;
