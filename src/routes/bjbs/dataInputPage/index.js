import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const DataInputPage = ({match}) => (
  <Switch>
    <Route path={`${match.url}/risikoinheren/datakuantitatif`} component={asyncComponent(() => import('../dataInputPage/RisikoInherenIndikator/DataKuantitatif'))} />
  </Switch>
);

export default DataInputPage;
