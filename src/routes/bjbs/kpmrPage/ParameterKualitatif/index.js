import React from "react";

import IntlMessages from "util/IntlMessages";
import {Col, Row} from "antd";
import TableKpmrParameterKualitatif from "./TableKpmrParameterKualitatif";

const ParameterKualitatif = (props) => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.kpmr.parameterkualitatif"/></h2>

            <div className="gx-d-flex justify-content-center">
              <Row className={"w-100"}>
                <Col span={24}>
                  <TableKpmrParameterKualitatif />
                </Col>
              </Row>
            </div>

        </div>
    );
};

export default ParameterKualitatif;
