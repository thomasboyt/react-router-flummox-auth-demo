import React from 'react';
import FluxComponent from 'flummox/component';

class LoadUserInner extends React.Component {
  constructor() {
    super();

    this.handleUnauthorized = (...args) => this._handleUnauthorized(args);
  }

  componentDidMount() {
    this.props.flux.getActions('auth').loadUser();

    this.props.flux.getStore('auth').addListener('unauthorized', this.handleUnauthorized);
  }

  componentWillUnmount() {
    this.props.flux.getStore('auth').removeListener('unauthorized', this.handleUnauthorized);
  }

  _handleUnauthorized() {
    this.context.router.replaceWith('login');
  }

  render() {
    if (this.props.loadUserState === 'success') {
      return this.props.children;

    } else if (this.props.loadUserState === 'failure') {
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
