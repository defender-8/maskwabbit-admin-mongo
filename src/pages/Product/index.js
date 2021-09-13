import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Table from './Table';
import Form from './Form';

function ProductRouter() {
  return (
    <Switch>
      <Route exact path="/products" component={Table} />
      <Route exact path="/products/new" component={Form} />
      <Route exact path="/products/:id" component={Form} />
      <Redirect to="/products" />
    </Switch>
  );
}

export default ProductRouter;
