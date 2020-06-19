import React from "react";

import IntlMessages from "util/IntlMessages";
import {Col, Row} from "antd";
import TableParameterKualitatifDualAlternatif from "./TableParameterKualitatifDualAlternatif";

const ParameterKuantitatifDualAlternatif = (props) => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.risikoinheren.parameterkualitatif.dualalternatif"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TableParameterKualitatifDualAlternatif />
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default ParameterKuantitatifDualAlternatif;
