import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Table from '../Table';
import Form from '../Form';

function SuperAdminRouter() {
  return (
    <Switch>
      <Route exact path="/super-admins" render={(props) => (<Table {...props} role='super admin' />)} />
      <Route exact path="/super-admins/new" component={Form} />
      <Route exact path="/super-admins/:id" component={Form} />
      <Redirect to="/super-admins" />
    </Switch>
  );
}

export default SuperAdminRouter;
