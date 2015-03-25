import React from 'react';
import {Link} from 'react-router';

class Index extends React.Component {
  render() {
    const username = this.props.flux.getStore('auth').state.currentUser.username;

    return (
      <div>
        <p>Thank you for authenticating, {username}!</p>
        <p><Link to="logout">Log Out</Link></p>
      </div>
    );
  }
}

export default Index;
