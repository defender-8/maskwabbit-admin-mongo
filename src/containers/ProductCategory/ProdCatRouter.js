import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProdCatTable from './ProdCatTable';
import ProdCatForm from './ProdCatForm';

function ProdCatRouter() {
  return (
    <Switch>
      <Route exact path="/product-categories" component={ProdCatTable} />
      <Route exact path="/product-categories/new" component={ProdCatForm} />
      <Route
        exact
        path="/product-categories/:id"
        render={(props) => (
          <ProdCatForm {...props} isExisted={true} />
        )}
      />
      <Redirect to="/product-categories" />
    </Switch>
  );
}

export default ProdCatRouter;
