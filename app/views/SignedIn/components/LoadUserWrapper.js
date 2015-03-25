import React from 'react';
import FluxComponent from 'flummox/component';

class LoadUserInner extends React.Component {
  componentDidMount() {
    this.props.flux.getActions('auth').loadUser();
  }

  componentDidUpdate() {
    if (this.props.loadUserState === 'failure' &&
        this.props.loadUserError.status === 401) {
       this.context.router.replaceWith('login');
    }
  }

  render() {
    if (this.props.loadUserState === 'success') {
      return this.props.children;

    } else if (this.props.loadUserState === 'failure' &&
               this.props.loadUserError.status !== 401) {
      return (
        <p>
          failed to load current user :(
        </p>
      );

    } else {
      return (
        <p>
          loading...
        </p>
      );

    }
  }
}

LoadUserInner.contextTypes = {
  router: React.PropTypes.func
};

class LoadUserWrapper extends React.Component {
  render() {
    return (
      <FluxComponent flux={this.props.flux} connectToStores={['auth']}>
        <LoadUserInner>
          {this.props.children}
        </LoadUserInner>
      </FluxComponent>
    );
  }
}

export default LoadUserWrapper;
