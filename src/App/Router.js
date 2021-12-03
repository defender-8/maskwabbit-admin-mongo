import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthRouter from "../pages/Auth/";
import SuperAdminRouter from "../pages/User/Admin/Router/SuperAdmin";
import AdminRouter from "../pages/User/Admin/Router/Admin";
import ClientRouter from "../pages/User/Client";
import ProductRouter from "../pages/Product";
import CategoryRouter from "../pages/Category";
// import OrderRouter from '../pages/Order/OrderRouter';

function Router() {
  const { user } = useSelector((state) => state.auth);

  const protectedRoute = (exact, path, component) => {
    return !user || user.role === "client" ? (
      <Route exact path={path} render={() => <Redirect to="/auth/sign-in" />} />
    ) : (
      <Route exact={exact || false} path={path} component={component} />
    );
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() =>
          !user ? <Redirect to="/auth/sign-in" /> : <Redirect to="/products" />
        }
      />
      <Route
        path="/auth"
        render={(props) => <AuthRouter {...props} user={user} />}
      />
      {protectedRoute(false, "/super-admins", SuperAdminRouter)}
      {protectedRoute(false, "/admins", AdminRouter)}
      {protectedRoute(false, "/clients", ClientRouter)}
      {protectedRoute(false, "/products", ProductRouter)}
      {protectedRoute(false, "/categories", CategoryRouter)}
      {/*{protectedRoute(false, '/orders', OrderRouter)}*/}
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;
