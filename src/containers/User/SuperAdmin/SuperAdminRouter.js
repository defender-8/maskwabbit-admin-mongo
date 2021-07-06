import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SuperAdminTable from './SuperAdminTable';
import SuperAdminForm from './SuperAdminForm';

function SuperAdminRouter() {
  return (
    <Switch>
      <Route exact path="/super-admins" component={SuperAdminTable} />
      <Route exact path="/super-admins/new" component={SuperAdminForm} />
      <Route
        exact
        path="/super-admins/:id"
        render={(props) => (
          <SuperAdminForm {...props} isExisted={true} />
        )}
      />
      <Redirect to="/super-admins" />
    </Switch>
  );
}

export default SuperAdminRouter;
