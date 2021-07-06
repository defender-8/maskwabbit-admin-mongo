import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

function ProductRouter() {
  return (
    <Switch>
      <Route exact path="/products" component={ProductTable} />
      <Route exact path="/products/new" component={ProductForm} />
      <Route
        exact
        path="/products/:id"
        render={(props) => (
          <ProductForm {...props} isExisted={true} />
        )}
      />
      <Redirect to="/products" />
    </Switch>
  );
}

export default ProductRouter;
