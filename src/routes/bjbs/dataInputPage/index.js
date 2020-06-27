import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const DataInputPage = ({match}) => (
  <Switch>
    <Route path={`${match.url}/risikoinheren/datakuantitatif`} component={asyncComponent(() => import('../dataInputPage/RisikoInherenIndikator/DataKuantitatif'))} />
    <Route path={`${match.url}/risikoinheren/datakualitatif/multi-alternatif`} component={asyncComponent(() => import('../dataInputPage/RisikoInherenIndikator/DataKualitatifMultiAlternatif'))} />
    <Route path={`${match.url}/risikoinheren/datakualitatif/dual-alternatif`} component={asyncComponent(() => import('../dataInputPage/RisikoInherenIndikator/DataKualitatifDualAlternatif'))} />
    <Route path={`${match.url}/kpmr/datakualitatif/multi-alternatif`} component={asyncComponent(() => import('../dataInputPage/KpmrIndikator/DataKualitatifMultiAlternatif'))} />
  </Switch>
);

export default DataInputPage;
