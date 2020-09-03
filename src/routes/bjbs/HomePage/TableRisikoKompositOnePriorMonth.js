import React, {useState, useRef} from "react";
import {Spin, Table, Card} from "antd";
import { dataDummy } from './dummyData'
import moment from 'moment';

import {
  renderColumn
} from '../../../constants/RisikoKompositColumnProperties';

// import local css
import '../../../assets/mystyle.css';

function TableRisikoKompositOnePriorMonth(){

  const [sortedInfo, setSortedInfo] = React.useState({});

  const columns = [
    {
      title: "Jenis Risiko",
      dataIndex: "jenis_risiko",
      key: "jenis_risiko",
      sorter: (a, b) => a.jenis_risiko.localeCompare(a.jenis_risiko),
      sortOrder: sortedInfo.columnKey === "jenis_risiko" && sortedInfo.order,
      render: (value, row, index) => renderColumn("jenis_risiko", value, row, index)
    },
    {
      title: "Bobot",
      dataIndex: "bobot",
      key: "bobot",
      sorter: (a, b) => a.bobot.localeCompare(a.bobot),
      sortOrder: sortedInfo.columnKey === "bobot" && sortedInfo.order,
      render: (value, row, index) => renderColumn("bobot", value, row, index)
    },
    {
      title: "Risiko Inheren",
      children: [
        {
          title: "Inheren Risk Score",
          dataIndex: "inheren_risk_score",
          key: "inheren_risk_score",
          sorter: (a, b) => a.inheren_risk_score.localeCompare(a.inheren_risk_score),
          sortOrder: sortedInfo.columnKey === "inheren_risk_score" && sortedInfo.order,
          render: (value, row, index) => renderColumn("inheren_risk_score", value, row, index)
        },
        {
          title: "Skor",
          dataIndex: "pr_score",
          key: "pr_score",
          sorter: (a, b) => a.pr_score.localeCompare(a.pr_score),
          sortOrder: sortedInfo.columnKey === "pr_score" && sortedInfo.order,
          render: (value, row, index) => renderColumn("pr_score", value, row, index)
        },
        {
          title: "Risk Level",
          dataIndex: "risk_level",
          key: "risk_level",
          sorter: (a, b) => a.risk_level.localeCompare(a.risk_level),
          sortOrder: sortedInfo.columnKey === "risk_level" && sortedInfo.order,
          render: (value, row, index) => renderColumn("risk_level", value, row, index)
        },
      ]
    },
    {
      title: "KPMR",
      children: [
        {
          title: "Skor KPMR",
          dataIndex: "kpmr_risiko_score",
          key: "kpmr_risiko_score",
          sorter: (a, b) => a.kpmr_risiko_score.localeCompare(a.kpmr_risiko_score),
          sortOrder: sortedInfo.columnKey === "kpmr_risiko_score" && sortedInfo.order,
          render: (value, row, index) => renderColumn("kpmr_risiko_score", value, row, index)
        },
        {
          title: "Skor",
          dataIndex: "kpmr_score",
          key: "score",
          sorter: (a, b) => a.kpmr_score.localeCompare(a.kpmr_score),
          sortOrder: sortedInfo.columnKey === "kpmr_score" && sortedInfo.order,
          render: (value, row, index) => renderColumn("kpmr_score", value, row, index)
        },
        {
          title: "Control Level",
          dataIndex: "control_level",
          key: "control_level",
          sorter: (a, b) => a.control_level.localeCompare(a.control_level),
          sortOrder: sortedInfo.columnKey === "control_level" && sortedInfo.order,
          render: (value, row, index) => renderColumn("control_level", value, row, index)
        },
      ]
    },
    {
      title: "Peringkat Komposit",
      dataIndex: "peringkat_komposit",
      key: "peringkat_komposit",
      sorter: (a, b) => a.peringkat_komposit.localeCompare(a.peringkat_komposit),
      sortOrder: sortedInfo.columnKey === "peringkat_komposit" && sortedInfo.order,
      render: (value, row, index) => renderColumn("peringkat_komposit", value, row, index)
    },
  ];

  return(
    <React.Fragment>
      <Card title="Overall Profil Risiko">
        <h4>Periode : {moment().subtract(1, 'month').format('YYYY-MMMM')}</h4>
        <Spin tip="loading.." spinning={false}>
          <div className="table-operations">
            <Table dataSource={dataDummy}
            className="gx-table-responsive"
            columns={columns} rowKey="id" pagination={false}
            />
            <div className="table-operations"
              style={{ paddingTop : '1rem', float : 'right' }}
              >
            </div>
          </div>
        </Spin>
      </Card>
    </React.Fragment>
  )
}

export default TableRisikoKompositOnePriorMonth;
