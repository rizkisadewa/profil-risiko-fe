import React from "react";
import {Col, Row} from "antd";
import TableParameterFaktor from './TableParameterFaktor';

import IntlMessages from "util/IntlMessages";

const KPMRParameterFaktor = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.profilrisiko.parameterfaktor"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TableParameterFaktor />
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default KPMRParameterFaktor;
