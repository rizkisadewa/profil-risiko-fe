import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";
import TableRatioIndikator from "./TableRatioIndikator";

const RatioIndikator = (props) => {

    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.masterdata.ratioindikator"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <TableRatioIndikator propstat={props.location.ratioProps}/>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default RatioIndikator;
