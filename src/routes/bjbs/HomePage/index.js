import React from "react";

import IntlMessages from "util/IntlMessages";
import TableRisikoKomposit from "./TableRisikoKomposit";
import TableRisikoKompositOnePriorMonth from "./TableRisikoKompositOnePriorMonth";
import moment from 'moment';


const DashboardPage = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.home"/></h2>

            <div className="gx-d-flex justify-content-center">
                <TableRisikoKomposit />
            </div>

            <div className="gx-d-flex justify-content-center">
                <TableRisikoKompositOnePriorMonth />
            </div>

        </div>
    );
};

export default DashboardPage;
