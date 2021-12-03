import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Table from "./Table";
import SinglePage from "./SinglePage";

function ClientRouter() {
  return (
    <Switch>
      <Route exact path="/clients" component={Table} />
      <Route exact path="/clients/:id" component={SinglePage} />
      <Redirect to="/clients" />
    </Switch>
  );
}

export default ClientRouter;
