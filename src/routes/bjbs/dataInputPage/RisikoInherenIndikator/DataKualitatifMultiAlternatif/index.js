import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";
import FilterTableRisikoInherenKualitatifMulti from './FilterTableRisikoInherenKualitatifMulti';

const DataKualitatifMultiAlternatif = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.datainput.risikoinheren.kualitatif.multialternatif"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <FilterTableRisikoInherenKualitatifMulti />
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default DataKualitatifMultiAlternatif;
