import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {getAllRisks, deleteRisk} from "../../../../appRedux/actions";
import connect from "react-redux/es/connect/connect";

import SaveJenisRisiko from "./SaveJenisRisiko";
import EditJenisRisiko from "./EditJenisRisiko";
import EditParameter from "../Parameter/EditParameter";

class TableJenisRisiko extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleProp=this.handleProp.bind(this);
        this.state = {
            //filteredInfo: null,
            sortedInfo: null,
            warning: false,
            datatable: [],
            searchText: '',
            searchedColumn: '',
            addbutton : false,
            editbutton : false,
            eid : "",fetchdata: [],
            idvalue : '',
        };
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        this.handleProp(nextProps);
    }
    handleProp(props) {
        this.props.getAllRisks({token:this.props.token});
        this.setState({
            datatable : props.getallrisks
        });
        return props.getallrisks;
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

    clickEditSuccessButton = () => {
        this.setState({
            editbutton: false,
        });
        NotificationManager.success("Data has updated.", "Success !!");
    }

    clickAddSuccessButton = () => {
        this.setState({
            addbutton: false,
        });
        NotificationManager.success("Data has saved.", "Success !! ");
    }

    render() {
        let {sortedInfo, filteredInfo} = this.state;
        const {warning, datatable, addbutton, editbutton, eid, fetchdata, idvalue} = this.state;
        const {token} = this.props;
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
            dataIndex: 'keterangan',
            key: 'keterangan',
            width : '500px',
            sorter: (a, b) => a.keterangan.localeCompare(b.keterangan),
            sortOrder: sortedInfo.columnKey === 'keterangan' && sortedInfo.order,
        }, {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
            sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
        }, {
            title: 'Action',
            key: 'id',
            render: (text, record) => (
                <span>
                    <span className="gx-link" onClick={()=>{
                        this.setState({
                            eid : text.id,
                            editbutton: true,
                            fetchdata : [{
                                id : text.id,
                                nama : text.nama,
                                keterangan : text.keterangan,
                                jenis : text.jenis,
                            }]
                        })
                    }}>Edit</span>
                    <Divider type="vertical"/>
                    <span className="gx-link" onClick={() => {
                        this.setState({
                            warning: true,
                            idvalue: text.id
                        })
                    }}>Delete</span>
                </span>
            ),
        }];

        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table Jenis Risiko"}>
                {
                    addbutton ?
                        <SaveJenisRisiko clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditJenisRisiko clickCancelEditButton={this.clickCancelEditButton} clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata}/> :
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
                                    onConfirm={() => {
                                        this.setState({
                                            warning: false
                                        });
                                        this.props.deleteRisk({id:idvalue, token:token});
                                        NotificationManager.success("Data has deleted.", "Success !!");
                                    }}
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


const mapStateToProps = ({auth,tabledata}) => {
    const {token} = auth;
    const {getallrisks} = tabledata;
    return {token, getallrisks}
};

export default connect(mapStateToProps, {getAllRisks,deleteRisk})(TableJenisRisiko);