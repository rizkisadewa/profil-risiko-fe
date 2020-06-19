import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const KpmrPage = ({match}) => (
  <Switch>
    <Route path={`${match.url}/parameterfaktor`} component={asyncComponent(() => import('../kpmrPage/ParameterFaktor'))} />
    <Route path={`${match.url}/ratioindikator`} component={asyncComponent(() => import('../kpmrPage/RatioIndikator'))} />
    <Route path={`${match.url}/parameterkualitatif`} component={asyncComponent(() => import('../kpmrPage/ParameterKualitatif'))} />
  </Switch>
);

export default KpmrPage;
