import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input, Pagination} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SaveParameter from "./SaveParameter";
import EditParameter from "./EditParameter";

import {connect} from "react-redux";
import {getAllFaktorParameterTable, getFaktorParameter, deleteFaktorParameter, countAllFaktorParameter} from "./../../../../appRedux/actions/Tabledata";
import {Redirect} from 'react-router-dom';

class TableParameter extends React.Component{
    constructor(props) {
        super(props);
        // this.handleProp=this.handleProp.bind(this);
        this.state = {
            paging: 1,
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
            idvalue:'',
            statusallparameterfaktortable:'',
            statusallparameterfaktor:'',
            loading:false,
            lengthdata: 0,
            deletestatus:''
        }
    }

    componentDidMount(){
        this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.props.countAllFaktorParameter({token:this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            datatable : nextProps.getallparameterfaktortable,
            statusallparameterfaktortable : nextProps.statusallparameterfaktortable,
            statusallparameterfaktor : nextProps.statusallparameterfaktor,
        });

        // console.log(nextProps.deleteparameterfaktor);
        if (nextProps.statusallparameterfaktortable === 200 && nextProps.statusallparameterfaktor === 200){
            this.setState({
                loading:false,
                lengthdata:nextProps.countallparameterfaktor,
                deletestatus : '',
            });
        }

        if(nextProps.deleteparameterfaktor === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteparameterfaktor
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onChangePagination(nextState.paging);
            this.setState({
                deletestatus : nextProps.deleteparameterfaktor,
            });
        }
        return true;
    }

    /*handleProp(props) {
        //this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            datatable : props.getallparameterfaktortable
        });
        return props.getallparameterfaktortable;
    }*/

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

    onCancelDelete = () => {
        this.setState({
            warning: false
        })
        this.onChangePagination(this.state.paging);
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
        this.onChangePagination(this.state.paging);
    }

    clickCancelEditButton = () => {
        this.setState({
            editbutton: false
        })
        this.onChangePagination(this.state.paging);
    }

    clickEditSuccessButton = (status) => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            editbutton: false,
            test: true,
        });

        if (status === 201 || status === 200) {
            this.onChangePagination(this.state.paging);
            NotificationManager.success("Data has updated.", "Success !!");
        }
    }

    clickAddSuccessButton = (status) => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            addbutton: false,
            test: true,
        });

        if (status === 201 || status === 200){
            this.onChangePagination(this.state.paging);
            NotificationManager.success("Data has saved.", "Success !!");
        }
    }

    onChangePagination = page => {
        this.setState({
            paging: page,
            loading:true
        });
        this.props.getAllFaktorParameterTable({page:page, token:this.props.token});
        this.props.countAllFaktorParameter({token:this.props.token});
    }

    onRefresh = () => {
        this.setState({
            loading:true
        });
        this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.props.countAllFaktorParameter({token:this.props.token});
    }

    render() {
        let {sortedInfo} = this.state;
        const {warning, addbutton, editbutton, eid, fetchdata, datatable, test, idvalue, paging, loading, lengthdata} = this.state;
        const {getallparameterfaktortable, token} = this.props;
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
                        this.setState({
                            warning: true,
                            idvalue: text.id
                        })
                    }}>Delete</span>
                </span>
            ),
        }];

        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table ParameterFaktor"}>
                {
                    /*test ? <Redirect to={{
                            pathname: '/bjbs/masterdata/parameter'
                        }}/> :*/
                    addbutton ?
                        <SaveParameter clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditParameter clickCancelEditButton={this.clickCancelEditButton} clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata}
                        /> :
                    <>
                        <div className="table-operations">
                            <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                            <Button className="ant-btn" onClick={this.onRefresh}>Refresh</Button>
                        </div>
                        <Table className="gx-table-responsive" columns={columns} dataSource={datatable} onChange={this.handleChange} rowKey="id"
                               pagination={false} loading={loading}
                        />
                        <div className="table-operations" style={{ paddingTop : '1rem', float : 'right' }}>
                            {
                                lengthdata === 0 ? '' :
                                <Pagination current={paging} total={lengthdata} onChange={this.onChangePagination}/>
                            }
                        </div>
                        <SweetAlert show={warning}
                                    warning
                                    showCancel
                                    confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt"/>}
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                                    onConfirm={() => {
                                        this.setState({
                                            warning: false,
                                            deletestatus:''
                                        })
                                        this.props.deleteFaktorParameter({id:idvalue, token:token});
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

const mapStateToProps = ({auth, tabledata}) => {
    const {token} = auth;
    const {getallparameterfaktortable,getparameterfaktor,statusallparameterfaktortable,countallparameterfaktor,statusallparameterfaktor, deleteparameterfaktor} = tabledata;
    return {getallparameterfaktortable,getparameterfaktor,token,statusallparameterfaktortable,countallparameterfaktor,statusallparameterfaktor,deleteparameterfaktor}
};

export default connect(mapStateToProps, {getAllFaktorParameterTable, deleteFaktorParameter, countAllFaktorParameter})(TableParameter);