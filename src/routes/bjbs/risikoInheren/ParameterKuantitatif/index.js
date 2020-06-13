import React from "react";

import IntlMessages from "util/IntlMessages";
import {Col, Row} from "antd";
import TableParameterKuantitatif from "./TableParameterKuantitatif";

const ParameterKuantitatif = (props) => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.profilrisiko.parameterkuantitatif"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TableParameterKuantitatif propstate={props.location.paramKuantitatifProps} cancelprop={props.location.cancelProps}/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default ParameterKuantitatif;
