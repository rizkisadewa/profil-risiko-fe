import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";
import FilterTableKpmrKualitatifMulti from './FilterTableKpmrKualitatifMulti';

const KpmrKualitatifDualAlternatif = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.datainput.kpmr.kualitatif"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <FilterTableKpmrKualitatifMulti />
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default KpmrKualitatifDualAlternatif;
