import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import OrderTable from "./OrderTable";
import OrderForm from "./OrderForm";

function OrderRouter() {
  return (
    <Switch>
      <Route exact path="/orders" component={OrderTable} />
      <Route exact path="/orders/:id" component={OrderForm} />
      <Redirect to="/orders" />
    </Switch>
  );
}

export default OrderRouter;
