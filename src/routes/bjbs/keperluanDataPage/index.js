import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const KeperluanDataPage = ({match}) => (
    <switch>
        <Route path={`${match.url}/debiturinti`} component={asyncComponent(() => import('./DebiturInti15'))}/>
        <Route path={`${match.url}/ayda`} component={asyncComponent(() => import('./Ayda'))}/>
        <Route path={`${match.url}/asetlukuid`} component={asyncComponent(() => import('./AsetLukuid'))}/>
        <Route path={`${match.url}/manajemensdi`} component={asyncComponent(() => import('./ManajemenSDI'))}/>
        <Route path={`${match.url}/frekmaterialitas`} component={asyncComponent(() => import('./FrekuensiMaterialitasEksposurPemberitaanNegatif'))}/>
        {/*Keperluan 2*/}
        <Route path={`${match.url}/roa`} component={asyncComponent(() => import('./Roa'))}/>
        <Route path={`${match.url}/k020`} component={asyncComponent(() => import('./K020'))}/>
        <Route path={`${match.url}/datamaturityprofile`} component={asyncComponent(() => import('./DataMaturityProfile'))}/>
        <Route path={`${match.url}/nominatifk241`} component={asyncComponent(() => import('./NominatifK241'))}/>
    </switch>
);

export default KeperluanDataPage;