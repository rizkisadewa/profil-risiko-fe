import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table} from "antd";
import IntlMessages from "util/IntlMessages";

import SaveJenisRisiko from "./SaveJenisRisiko";
import EditJenisRisiko from "./EditJenisRisiko";

const data = [{
    nama: 'John Brown',
    ket: 'Active',
    created: '2020-04-08 12:10.00',
    action: 'BJBS001',
},{
    nama: 'Radja Nainggolan',
    ket: 'Suspend',
    created: '2020-04-08 11:22.00',
    action: 'BJBS002',
},{
    nama: 'Edin Dzeko',
    ket: 'Active',
    created: '2020-04-08 08:22.00',
    action: 'BJBS003',
},{
    nama: 'Francesco Totti',
    ket: 'Inactive',
    created: '2020-04-04 19:22.00',
    action: 'BJBS004',
},{
    nama: 'Alisson Becker',
    ket: 'Inactive',
    created: '2020-04-03 19:22.00',
    action: 'BJBS005',
},{
    nama: 'Miralem Pjanic',
    ket: 'Suspend',
    created: '2020-04-03 19:22.00',
    action: 'BJBS006',
},{
    nama: 'Kevin Strootman',
    ket: 'Suspend',
    created: '2020-04-01 19:22.00',
    action: 'BJBS007',
},{
    nama: 'Diego Perotti',
    ket: 'Inactive',
    created: '2020-04-10 19:22.00',
    action: 'BJBS008',
},{
    nama: 'Charles Peres',
    ket: 'Active',
    created: '2020-04-11 03:22.00',
    action: 'BJBS009',
},{
    nama: 'Nicolo Zaniolo',
    ket: 'Active',
    created: '2020-04-06 10:22.00',
    action: 'BJBS010',
},{
    nama: 'Cengiz Under',
    ket: 'Inactive',
    created: '2020-04-05 19:22.00',
    action: 'BJBS011',
},{
    nama: 'Bryan Cristante',
    ket: 'Suspend',
    created: '2020-04-10 19:22.00',
    action: 'BJBS012',
},{
    nama: 'Pau Lopez',
    ket: 'Active',
    created: '2020-04-09 00:22.00',
    action: 'BJBS013',
},{
    nama: 'Kostas Manolas',
    ket: 'Inactive',
    created: '2020-04-09 14:22.00',
    action: 'BJBS014',
},{
    nama: 'Alexander Kolarov',
    ket: 'Active',
    created: '2020-04-09 09:22.00',
    action: 'BJBS015',
}];

class TableJenisRisiko extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //filteredInfo: null,
            sortedInfo: null,
            warning: false,
            datatable: data,
            addbutton : false,
            editbutton : false,
            eid : "",
            enama : "",
            eket : ""
        };
    }

    deleteFile = () => {
        this.setState({
            warning: false
        });
        NotificationManager.success("Data has deleted.", "Success !!");
    };
    onCancelDelete = () => {
        this.setState({
            warning: false
        })
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            // filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clickAddButton = () => {
        this.setState({
            addbutton: true
        })
    }

    clickCancelAddButton = () => {
        this.setState({
            addbutton: false
        })
    }

    clickCancelEditButton = () => {
        this.setState({
            editbutton: false
        })
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        const columns = [{
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            /*filters: [
                {text: 'Joe', value: 'Joe'},
                {text: 'Jim', value: 'Jim'},
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),*/
            sorter: (a, b) => a.nama.localeCompare(b.nama),
            sortOrder: sortedInfo.columnKey === 'nama' && sortedInfo.order,
        }, {
            title: 'Keterangan',
            dataIndex: 'ket',
            key: 'ket',
            sorter: (a, b) => a.ket.localeCompare(b.ket),
            sortOrder: sortedInfo.columnKey === 'ket' && sortedInfo.order,
        }, {
            title: 'Created at',
            dataIndex: 'created',
            key: 'created',
            sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created),
            sortOrder: sortedInfo.columnKey === 'created' && sortedInfo.order,
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span className="gx-link" onClick={()=>{
                        this.setState({
                            editbutton: true,
                            eid : text.action,
                            enama : text.nama,
                            eket : text.ket,
                        })
                    }}>Edit</span>
                    <Divider type="vertical"/>
                    <span className="gx-link" onClick={() => {
                        this.setState({warning: true})
                    }}>Delete</span>
                </span>
            ),
        }];
        const {warning, datatable, addbutton, editbutton, eid, enama, eket} = this.state;
        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table Jenis Risiko"}>
                {
                    addbutton ?
                        <SaveJenisRisiko clickCancelAddButton={this.clickCancelAddButton}/> :
                    editbutton ?
                        <EditJenisRisiko clickCancelEditButton={this.clickCancelEditButton} eid={eid} enama={enama} eket={eket}/> :
                    <>
                        <div className="table-operations">
                            <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                        </div>
                        <Table className="gx-table-responsive" columns={columns} dataSource={datatable} onChange={this.handleChange}/>
                        <SweetAlert show={warning}
                                    warning
                                    showCancel
                                    confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt"/>}
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                                    onConfirm={this.deleteFile}
                                    onCancel={this.onCancelDelete}
                        >
                            <IntlMessages id="sweetAlerts.youWillNotAble"/>
                        </SweetAlert>
                    </>
                }
                <NotificationContainer/>
            </Card>
        );
    }
}

export default TableJenisRisiko;