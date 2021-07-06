import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminTable from './AdminTable';
import AdminForm from './AdminForm';

function AdminRouter() {
  return (
    <Switch>
      <Route exact path="/admins" component={AdminTable} />
      <Route exact path="/admins/new" component={AdminForm} />
      <Route
        exact
        path="/admins/:id"
        render={(props) => (
          <AdminForm {...props} isExisted={true} />
        )}
      />
      <Redirect to="/admins" />
    </Switch>
  );
}

export default AdminRouter;
