import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectErrorMessage,
} from '../../redux/auth/auth-selectors';
import { logOut } from '../../redux/auth/auth-actions';

import Router from './Router';

class App extends Component {

  /*componentDidMount() {
    const { currentUser, logOut } = this.props;

    if (currentUser && (Date.now() > currentUser.expiryDate)) {
      logOut();
    }
  }*/

  render() {
    return (
      <Router />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
