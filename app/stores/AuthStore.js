import {Store} from 'flummox';

class AuthStore extends Store {
  constructor(flux) {
    super();

    let authActionIds = flux.getActions('auth');

    this.registerAsync(authActionIds.loadUser,
      this.loadUserStart,
      this.loadUserSuccess,
      this.loadUserFailed
    );

    this.registerAsync(authActionIds.logIn,
      this.logInStart,
      this.logInSuccess,
      this.logInFailed
    );

    this.registerAsync(authActionIds.logOut,
      this.logOutStart,
      this.logOutSuccess,
      this.logOutFailed
    );

    this.state = {
      currentUser: null,

      loadUserState: null,
      loadUserError: null,
      logInState: null,
      logInError: null,
      logOutState: null,
      logOutError: null
    };
  }

  loadUserStart() {
    this.setState({
      loadUserState: 'loading'
    });
  }

  loadUserSuccess(resp) {
    this.setState({
      loadUserState: 'success',
      currentUser: resp
    });
  }

  loadUserFailed(err) {
    this.setState({
      loadUserState: 'failure',
      loadUserError: err
    });

    if (err.status === 401) {
      this.emit('unauthorized');
    }
  }

  logInStart() {
    this.setState({
      logInState: 'loading'
    });
  }

  logInSuccess(resp) {
    this.setState({
      logInState: 'success',
      currentUser: resp.user
    });

    localStorage.token = resp.token;

    this.emit('loggedIn');
  }

  logInFailed(err) {
    this.setState({
      logInState: 'failure',
      logInError: err
    });
  }

  logOutStart() {
    this.setState({
      logOutState: 'loading'
    });
  }

  logOutSuccess() {
    this.setState({
      logOutState: 'success',
      currentUser: null
    });

    delete localStorage.token;

    this.emit('loggedIn');
  }

  logOutFailed(err) {
    this.setState({
      logOutState: 'failure',
      logOutError: err
    });
  }
}

export default AuthStore;
