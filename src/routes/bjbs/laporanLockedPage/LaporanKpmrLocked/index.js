import React from "react";
import {Col, Row} from "antd";

import IntlMessages from "util/IntlMessages";
import FilterTableLaporanKpmrLocked from './FilterTableLaporanKpmrLocked';

const LaporanKpmrLocked = () => {
    return (
        <div>
            <h2 className="title gx-mb-4"><IntlMessages id="sidebar.laporan.locked.kpmr"/></h2>

            <div className="gx-d-flex justify-content-center">
              <Row className={"w-100"}>
                <Col span={24}>
                  <FilterTableLaporanKpmrLocked />
                </Col>
              </Row>
            </div>

        </div>
    );
};

export default LaporanKpmrLocked;
