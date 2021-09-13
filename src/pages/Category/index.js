import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Table from './Table';
// import Form from './Form';

function CategoryRouter() {
  return (
    <Switch>
      <Route exact path="/categories" component={Table} />
      {/*<Route exact path="/categories/new" component={Form} />*/}
      {/*<Route exact path="/categories/:id" component={Form} />*/}
      <Redirect to="/categories" />
    </Switch>
  );
}

export default CategoryRouter;
