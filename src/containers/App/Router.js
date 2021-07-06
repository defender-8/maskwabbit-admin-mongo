import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
} from '../../redux/auth/auth-selectors';

import AuthRouter from '../Auth/AuthRouter';
import SuperAdminRouter from '../User/SuperAdmin/SuperAdminRouter';
import AdminRouter from '../User/Admin/AdminRouter';
import ClientTable from '../User/Client/ClientTable';
import ProductRouter from '../Product/ProductRouter';
import ProdCatRouter from '../ProductCategory/ProdCatRouter';
import OrderRouter from '../Order/OrderRouter';

function Router({ currentUser }) {
  const protectedRoute = (exact, path, component) => {
    return (
      (!currentUser || currentUser.role === 'client') ?
        <Route
          exact
          path={path}
          render={() => <Redirect to="/auth/sign-in" />}
        /> :
        <Route exact={exact || false} path={path} component={component} />
    );
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={
          () => !currentUser ? <Redirect to="/auth/sign-in" /> : <Redirect to="/products" />
        }
      />
      <Route
        path="/auth"
        render={(props) => (
          <AuthRouter {...props} currentUser={currentUser} />
        )}
      />
      {protectedRoute(false, '/super-admins', SuperAdminRouter)}
      {protectedRoute(false, '/admins', AdminRouter)}
      {protectedRoute(true, '/clients', ClientTable)}
      {protectedRoute(false, '/products', ProductRouter)}
      {protectedRoute(false, '/product-categories', ProdCatRouter)}
      {protectedRoute(false, '/orders', OrderRouter)}
      <Redirect to="/" />
    </Switch>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Router);
