import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";

import TableRisikoInherenRatioIndikator from "./TableRisikoInherenRatioIndikator";

const RisikoInherenRatioIndikator = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.risikoinheren.ratioindikator"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TableRisikoInherenRatioIndikator/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default RisikoInherenRatioIndikator;
