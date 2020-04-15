import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SaveParameter from "./SaveParameter";
import EditParameter from "./EditParameter";

const data = [{
    name: 'Risiko Kredit',
    risk_id: 'Risk Probability ( P )',
    bobot: '50',
    level: '1',
    id: 'BJBS001',
},{
    name: 'Risiko Pasar',
    risk_id: 'Likelyhood Justification',
    bobot: '75',
    level: '1',
    id: 'BJBS002',
},{
    name: 'Risiko Likuiditas',
    risk_id: 'Cost ( L )',
    bobot: '90',
    level: '2',
    id: 'BJBS003',
},{
    name: 'Risiko Operasional',
    risk_id: 'Likelyhood Cost Justification',
    bobot: '30',
    level: '1',
    id: 'BJBS004',
},{
    name: 'Risiko Reputasi',
    risk_id: 'Risk Exposure ( R )',
    bobot: '100',
    level: '2',
    id: 'BJBS005',
}];

class TableParameter extends React.PureComponent{
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
            erisk : "",
            eparam : "",
            ebobot : "",
            elevel : ""
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
            title: 'Risk ID',
            dataIndex: 'risk_id',
            key: 'risk_id',
            ...this.getColumnSearchProps('risk_id'),
            sorter: (a, b) => a.risk_id - b.risk_id,
            sortOrder: sortedInfo.columnKey === 'risk_id' && sortedInfo.order,
        }, {
            title: 'Parameter',
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Bobot',
            dataIndex: 'bobot',
            key: 'bobot',
            ...this.getColumnSearchProps('bobot'),
            sorter: (a, b) => a.bobot - b.bobot,
            sortOrder: sortedInfo.columnKey === 'bobot' && sortedInfo.order,
            render: (data) => (
                data+'%'
            )
        }, {
            title: 'Action',
            key: 'id',
            render: (text, record) => (
                <span>
                    <span className="gx-link" onClick={()=>{
                        this.setState({
                            editbutton: true,
                            eid : text.id,
                            erisk : text.risk_id,
                            eparam : text.name,
                            ebobot : text.bobot,
                            elevel : text.level
                        })
                    }}>Edit</span>
                    <Divider type="vertical"/>
                    <span className="gx-link" onClick={() => {
                        this.setState({warning: true})
                    }}>Delete</span>
                </span>
            ),
        }];
        const {datatable, warning, addbutton, editbutton, eid, erisk, eparam, ebobot, elevel} = this.state;
        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table Parameter"}>
                {
                    addbutton ?
                        <SaveParameter clickCancelAddButton={this.clickCancelAddButton}/> :
                    editbutton ?
                        <EditParameter clickCancelEditButton={this.clickCancelEditButton}
                           eid={eid} erisk={erisk} eparam={eparam} ebobot={ebobot} elevel={elevel}
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

export default TableParameter;