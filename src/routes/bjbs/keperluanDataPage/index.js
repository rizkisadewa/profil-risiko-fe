import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const KeperluanDataPage = ({match}) => (
    <Switch>
        <Route path={`${match.url}/debiturinti`} component={asyncComponent(() => import('./DebiturInti15'))}/>
        <Route path={`${match.url}/ayda`} component={asyncComponent(() => import('./Ayda'))}/>
        <Route path={`${match.url}/asetlukuid`} component={asyncComponent(() => import('./AsetLukuid'))}/>
        <Route path={`${match.url}/manajemensdi`} component={asyncComponent(() => import('./ManajemenSDI'))}/>
        <Route path={`${match.url}/frekmaterialitas`} component={asyncComponent(() => import('./FrekuensiMaterialitasEksposurPemberitaanNegatif'))}/>
        {/*Keperluan Data 2*/}
        <Route path={`${match.url}/roa`} component={asyncComponent(() => import('./Roa'))}/>
        <Route path={`${match.url}/k020`} component={asyncComponent(() => import('./K020'))}/>
        <Route path={`${match.url}/datamaturityprofile`} component={asyncComponent(() => import('./DataMaturityProfile'))}/>
        <Route path={`${match.url}/norminatifk241`} component={asyncComponent(() => import('./NominatifK241'))}/>
        {/*Keperluan Data 3*/}
        <Route path={`${match.url}/neracalabarugi`} component={asyncComponent(() => import('./NeracaLabaRugi'))}/>
        <Route path={`${match.url}/rasiocar`} component={asyncComponent(() => import('./RasioCar'))}/>
        <Route path={`${match.url}/lsmk`} component={asyncComponent(() => import('./Lsmk'))}/>
        <Route path={`${match.url}/datafraud`} component={asyncComponent(() => import('./DataFraud'))}/>
        <Route path={`${match.url}/maturitysistem`} component={asyncComponent(() => import('./MaturitySistem'))}/>
        <Route path={`${match.url}/datalitigasi`} component={asyncComponent(() => import('./DataLitigasi'))}/>
        {/*Keperluan Data 4*/}
        <Route path={`${match.url}/rbb`} component={asyncComponent(() => import('./Rbb'))}/>
        <Route path={`${match.url}/datafrekuensipelanggaran`} component={asyncComponent(() => import('./DataFrekuensiPelanggaran'))}/>
    </Switch>
);

export default KeperluanDataPage;