import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";

import TablePeringkatRisiko from "./TablePeringkatRisiko";

const JenisPeringkatRisiko = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.profilrisiko.peringkatrisiko"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TablePeringkatRisiko/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default JenisPeringkatRisiko;
