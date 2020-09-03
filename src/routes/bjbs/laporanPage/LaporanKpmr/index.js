import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";
import FilterTableLaporanKpmr from './FilterTableLaporanKpmr';

const LaporanKpmr = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.laporan.kpmr"/></h2>

            <div className="gx-d-flex justify-content-center">
              <Row className={"w-100"}>
                <Col span={24}>
                  <FilterTableLaporanKpmr />
                </Col>
              </Row>
            </div>

        </div>
    );
};

export default LaporanKpmr;
