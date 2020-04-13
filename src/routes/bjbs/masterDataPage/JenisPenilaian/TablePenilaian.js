import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SavePenilaian from "./SavePenilaian";
import EditPenilaian from "./EditPenilaian";

const data = [{
    nama: 'Risiko Reputasi',
    jenispenilaian: 'Kualitatif',
    keterangan: 'Keterangan',
    created: '2020-04-08 15:10.00',
    action: 'BJBS003',
},{
    nama: 'Risiko Strategik',
    jenispenilaian: 'Kuantitatif (Naik)',
    keterangan: 'Keterangan',
    created: '2020-04-08 19:27.00',
    action: 'BJBS001',
},{
    nama: 'Risiko Kepatuhan',
    jenispenilaian: 'Kuantitaif (Turun)',
    keterangan: 'Keterangan',
    created: '2020-04-08 23:00.00',
    action: 'BJBS002',
},{
    nama: 'Risiko Hukum',
    jenispenilaian: 'Kuantitatif (Naik)',
    keterangan: 'Keterangan',
    created: '2020-04-08 12:10.00',
    action: 'BJBS004',
},{
    nama: 'Risiko Operasional',
    jenispenilaian: 'Kuantitaif (Turun)',
    keterangan: 'Keterangan',
    created: '2020-04-08 11:10.00',
    action: 'BJBS005',
}];

class TablePenilaian extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            sortedInfo: null,
            datatable: data,
            warning : false,
            searchText: '',
            searchedColumn: '',
            addbutton : false,
            editbutton : false,
            eid : "",
            epenilaian : "",
            eket : "",
            enama : "",
        }
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            // filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

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
        let {sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            ...this.getColumnSearchProps('nama'),
            sorter: (a, b) => a.nama.localeCompare(b.nama),
            sortOrder: sortedInfo.columnKey === 'nama' && sortedInfo.order,
        }, {
            title: 'Jenis Penilaian',
            dataIndex: 'jenispenilaian',
            key: 'jenispenilaian',
            ...this.getColumnSearchProps('jenispenilaian'),
            sorter: (a, b) => a.jenispenilaian.localeCompare(b.jenispenilaian),
            sortOrder: sortedInfo.columnKey === 'jenispenilaian' && sortedInfo.order,
        }, {
            title: 'Keterangan',
            dataIndex: 'keterangan',
            key: 'keterangan',
            ...this.getColumnSearchProps('keterangan'),
            sorter: (a, b) => a.keterangan.localeCompare(b.keterangan),
            sortOrder: sortedInfo.columnKey === 'keterangan' && sortedInfo.order,
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
                            eket : text.keterangan,
                            epenilaian : text.jenispenilaian
                        })
                    }}>Edit</span>
                    <Divider type="vertical"/>
                    <span className="gx-link" onClick={() => {
                        this.setState({warning: true})
                    }}>Delete</span>
                </span>
            ),
        }];
        const {datatable, warning, addbutton, editbutton, eid, enama, eket, epenilaian} = this.state;
        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table Jenis Penilaian"}>
                {
                    addbutton ?
                        <SavePenilaian clickCancelAddButton={this.clickCancelAddButton}/> :
                    editbutton ?
                        <EditPenilaian clickCancelEditButton={this.clickCancelEditButton}
                                             eid={eid} enama={enama} eket={eket} epenilaian={epenilaian}
                        /> :
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

export default TablePenilaian;