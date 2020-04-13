import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";

import TableFaktor from "./TableFaktor";

const Faktor = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.masterdata.faktor"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TableFaktor/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default Faktor;
