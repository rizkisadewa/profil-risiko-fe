import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";

import SaveJenisRisiko from "./SaveJenisRisiko";
import EditJenisRisiko from "./EditJenisRisiko";

const data = [{
    nama: 'Risiko Kredit',
    ket: 'Risiko kredit merupakan risiko yang timbul akibat kegagalan counterparty memenuhi kewajibannya.',
    created: '2020-04-08 12:10.00',
    action: 'BJBS001',
},{
    nama: 'Risiko Pasar',
    ket: 'Risiko pasar merupakan risiko yang timbul karena adanya pergerakan variabel pasar dari portofolio bank yang dapat merugikan bank.',
    created: '2020-04-08 11:22.00',
    action: 'BJBS002',
},{
    nama: 'Risiko Likuiditas',
    ket: 'Risiko likuiditas merupakan risiko di mana pihak perbankan tidak mampu memenuhi kewajiban yang telah jatuh tempo. Risiko ini benar2 berbahaya dan bisa sangat merugikan para nasabahnya.',
    created: '2020-04-08 08:22.00',
    action: 'BJBS003',
},{
    nama: 'Risiko Operasional',
    ket: 'Risiko ini merupakan risiko yang antara lain disebabkan karena adanya ketidakcukupan dan atau tidak berfungsinya proses internal, kesalahan manusia, kegagalan sistem atau adanya problem eksternal yang mempengaruhi operasional bank.',
    created: '2020-04-04 19:22.00',
    action: 'BJBS004',
},{
    nama: 'Risiko Hukum',
    ket: 'Risiko ini disebabkan oleh adanya kelemahan aspek yuridis. Kelemahan yuridis yang dimaksud antara lain disebabkan karena adanya tuntutan hukum, ketiadaan peraturan perundang-udangan yang mendukung atau kelemahan perikatan, seperti tidak dipenuhi syarat sahnya kontrak.',
    created: '2020-04-03 19:22.00',
    action: 'BJBS005',
},{
    nama: 'Risiko Reputasi',
    ket: 'Risiko ini disebabkan antara lain karena adanya publikasi negatif yang terkait dengan kegiatan usaha bank atau persepsi negatif terhadap bank.',
    created: '2020-04-03 19:22.00',
    action: 'BJBS006',
},{
    nama: 'Risiko Strategik',
    ket: 'Risiko ini antara lain disebabkan karena penetapan dan pelaksanaan strategi bank yang tidak tepat, pengambilan keputusan bisnis yang tidak tepat, atau kurang responnya bank terhadap perubahan eksternal.',
    created: '2020-04-01 19:22.00',
    action: 'BJBS007',
},{
    nama: 'Risiko Kepatuhan',
    ket: 'Risiko ini disebabkan karena bank tidak mematuhi atau tidak melaksanakan peraturan perundang-udangan dan ketentuan lain yang berlaku.',
    created: '2020-04-10 19:22.00',
    action: 'BJBS008',
}];

class TableJenisRisiko extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //filteredInfo: null,
            sortedInfo: null,
            warning: false,
            datatable: data,
            searchText: '',
            searchedColumn: '',
            addbutton : false,
            editbutton : false,
            eid : "",
            enama : "",
            eket : ""
        };
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown : ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding : 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width:188, marginBottom:8, display:'block'}}
                />

                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{width:90, marginRight:8}}
                >Search</Button>

                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width:90}}>Reset</Button>
            </div>
        ),
        filterIcon : filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter : (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange : visible => {
            if (visible){
                setTimeout(() => this.searchInput.select());
            }
        },
        render : text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (text),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({
            searchText: ''
        });
    };

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
            ...this.getColumnSearchProps('nama'),
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
            width : '500px',
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