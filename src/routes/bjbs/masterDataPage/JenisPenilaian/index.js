import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";

import TablePenilaian from "./TablePenilaian";

const JenisPenilaian = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.masterdata.penilaian"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TablePenilaian/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default JenisPenilaian;
