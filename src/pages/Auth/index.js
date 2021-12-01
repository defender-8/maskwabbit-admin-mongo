import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import SignIn from "./SignIn";
// import PassResetEmailForm from './PassResetEmailForm';
// import PassResetPassForm from './PassResetPassForm';

function AuthRouter({ user }) {
  return (
    <Switch>
      <Route
        exact
        path="/auth"
        render={() => <Redirect to="/auth/sign-in" />}
      />
      <Route exact path="/auth/sign-in" component={SignIn} />
      {user && user.role !== "client" ? (
        <Route
          exact
          path="/auth/sign-in"
          render={() => <Redirect to="/products" />}
        />
      ) : (
        <Route exact path="/auth/sign-in" component={SignIn} />
      )}
      {/*<Route exact path="/auth/password-reset" component={PassResetEmailForm} />*/}
      {/*<Route exact path="/auth/password-reset/:token" component={PassResetPassForm} />*/}
      <Redirect to="/auth/sign-in" />
    </Switch>
  );
}

export default AuthRouter;
