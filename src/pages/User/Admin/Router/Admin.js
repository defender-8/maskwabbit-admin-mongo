import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Table from '../Table';
import Form from '../Form';

function AdminRouter() {
  return (
    <Switch>
      <Route exact path="/admins" render={(props) => (<Table {...props} role='admin' />)} />
      <Route exact path="/admins/new" component={Form} />
      <Route exact path="/admins/:id" component={Form} />
      <Redirect to="/admins" />
    </Switch>
  );
}

export default AdminRouter;
