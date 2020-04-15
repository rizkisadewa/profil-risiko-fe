import React from "react";
// import {Route, Switch} from "react-router-dom";

// import asyncComponent from "util/asyncComponent";
import IntlMessages from "util/IntlMessages";

const LainLainPage = ({match}) => (
    <div>
        {/*<switch>
            <Route path={`${match.url}/logout`} component={asyncComponent(() => import('./Logout'))}/>
        </switch>*/}
        <h2 className="title gx-mb-4"><IntlMessages id="sidebar.lainlain"/></h2>

        <div className="gx-d-flex justify-content-center">
            <h4>This is <IntlMessages id="sidebar.lainlain"/> Page.</h4>
        </div>
    </div>
);

export default LainLainPage;