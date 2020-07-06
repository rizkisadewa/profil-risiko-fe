import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const LaporanLockedPage = ({match}) => (
  <Switch>
    <Route path={`${match.url}/risikoinheren`} component={asyncComponent(() => import('./LaporanRisikoInherenLocked'))}/>
  </Switch>
);

export default LaporanLockedPage;
