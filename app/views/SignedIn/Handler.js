import React from 'react';
import {RouteHandler} from 'react-router';
import LoadUserWrapper from './components/LoadUserWrapper';

class SignedInWrapper extends React.Component {
  render() {
    return (
      <LoadUserWrapper flux={this.props.flux} >
        <RouteHandler {...this.props} />
      </LoadUserWrapper>
    );
  }
}

export default SignedInWrapper;
