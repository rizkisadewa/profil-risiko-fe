import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";
import FilterTableRisikoInherenKualifatifDual from './FilterTableRisikoInherenKualifatifDual';

const RisikoInherenKualitatifDualAlternatif = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.datainput.risikoinheren.kualitatif.dualalternatif"/></h2>

            <div className="gx-d-flex justify-content-center">
                <Row className={"w-100"}>
                    <Col span={24}>
                        <FilterTableRisikoInherenKualifatifDual />
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default RisikoInherenKualitatifDualAlternatif;
