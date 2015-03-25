import React from 'react';
import FluxComponent from 'flummox/component';

class LogInInner extends React.Component {
  handleLogIn() {
    this.props.flux.getActions('auth').logIn();
  }

  componentDidUpdate() {
    if (this.props.logInState === 'success') {
       this.context.router.replaceWith('index');
    }
  }

  render() {
    const isLoading = this.props.logInState === 'loading';

    return (
      <div>
        <button onClick={() => this.handleLogIn()} disabled={isLoading}>
          Click me to log in
        </button>
      </div>
    );
  }
}

LogInInner.contextTypes = {
  router: React.PropTypes.func
};

class LogIn extends React.Component {
  render() {
    return (
      <FluxComponent flux={this.props.flux} connectToStores={['auth']}>
        <LogInInner />
      </FluxComponent>
    );
  }
}

export default LogIn;
