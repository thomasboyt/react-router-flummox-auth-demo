import React from 'react';
import {Link} from 'react-router';
import FluxComponent from 'flummox/component';

class LogOutInner extends React.Component {
  componentDidMount() {
    this.props.flux.getActions('auth').logOut();
  }

  render() {
    if (this.props.logOutState === 'success') {
      return (
        <p>You have been logged out. <Link to="login">Return to login</Link></p>
      );

    } else if (this.props.logOutState === 'failure') {
      return (
        <p>Error logging out.</p>
      );

    } else {
      return (
        <p>Logging out...</p>
      );
    }
  }
}

LogOutInner.contextTypes = {
  router: React.PropTypes.func
};

class LogOut extends React.Component {
  render() {
    return (
      <FluxComponent flux={this.props.flux} connectToStores={['auth']}>
        <LogOutInner />
      </FluxComponent>
    );
  }
}

export default LogOut;
