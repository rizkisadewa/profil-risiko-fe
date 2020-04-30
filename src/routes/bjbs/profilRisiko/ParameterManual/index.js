import React from "react";

import IntlMessages from "util/IntlMessages";
import {Col, Row} from "antd";
import FilterTableParameterManual from "./FilterTableParameterManual";

const ParameterManual = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.profilrisiko.parametermanual"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <FilterTableParameterManual/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default ParameterManual;
