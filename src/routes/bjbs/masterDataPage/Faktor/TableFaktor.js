import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SaveFaktor from "./SaveFaktor";
import EditFaktor from "./EditFaktor";

import {connect} from "react-redux";
import {getAllFaktorParameterTable, getFaktorParameter, deleteFaktorParameter} from "./../../../../appRedux/actions/Tabledata";
import {Redirect} from 'react-router-dom';

class TableFaktor extends React.PureComponent{
    constructor(props) {
        super(props);
        this.handleProp=this.handleProp.bind(this);
        this.state = {
            paging: null,
            sortedInfo: null,
            warning: false,
            searchText: '',
            searchedColumn: '',
            addbutton: false,
            editbutton: false,
            eid: "",
            fetchdata: [],
            datatable: [],
            test:false,
        }

    }

    componentDidMount(){
        this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        this.handleProp(nextProps);
    }
    handleProp(props) {
        this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            datatable : props.getallparameterfaktortable
        });
        return props.getallparameterfaktortable;
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
                    icon={'<SearchOutlined/>'}
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

    clickEditSuccessButton = () => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            editbutton: false,
            test: true,
        });
        NotificationManager.success("Data has updated.", "Success !!");
    }

    clickAddSuccessButton = () => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            addbutton: false,
            test: true,
        });
        NotificationManager.success("Data has saved.", "Success !! ");
    }

    render() {
        let {sortedInfo} = this.state;
        const {warning, addbutton, editbutton, eid, fetchdata, datatable, test} = this.state;
        const {getallparameterfaktortable} = this.props;
        // console.log('ini parameters :: ', getallparameterfaktortable);
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
            width : '500px',
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
                    <span className="gx-link" onClick={() => {
                        this.setState({
                            eid : text.id,
                            editbutton: true,
                            fetchdata : [{
                                id : text.id,
                                risk_id : parseInt(text.risk_id),
                                name : text.name,
                                bobot : text.bobot,
                                level : text.level,
                                penomoran : text.penomoran
                            }]
                        })
                    }}>Edit</span>
                    <Divider type="vertical"/>
                    <span className="gx-link" onClick={() => {
                        this.setState({warning: true})
                        this.props.deleteFaktorParameter({id:text.id, token:this.props.token});
                    }}>Delete</span>
                </span>
            ),
        }];

        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table Faktor"}>
                {
                    /*test ? <Redirect to={{
                            pathname: '/bjbs/masterdata/parameter'
                        }}/> :*/
                    addbutton ?
                        <SaveFaktor clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                        editbutton ?
                            <EditFaktor clickCancelEditButton={this.clickCancelEditButton} clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata}
                            /> :
                            <>
                                <div className="table-operations">
                                    <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                                </div>
                                <Table className="gx-table-responsive" columns={columns} dataSource={datatable} onChange={this.handleChange} rowKey="id"/>
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

const mapStateToProps = ({auth, tabledata}) => {
    const {token} = auth;
    const {getallparameterfaktortable,getparameterfaktor} = tabledata;
    return {getallparameterfaktortable,getparameterfaktor,token}
};

export default connect(mapStateToProps, {getAllFaktorParameterTable, deleteFaktorParameter})(TableFaktor);