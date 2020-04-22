import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input, Pagination, Spin} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SavePeringkatRisiko from "./SavePeringkatRisiko";
import EditPeringkatRisiko from "./EditPeringkatRisiko";

import {connect} from "react-redux";
import {getAllPeringkatRisiko, deletePeringkatRisiko, countAllPeringkatRisiko} from "../../../../appRedux/actions/Peringkatrisiko";

class TablePeringkatRisiko extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            paging: 1,
            sortedInfo: null,
            warning : false,
            searchText: '',
            searchedColumn: '',
            addbutton : false,
            editbutton : false,
            eid : "",
            fetchdata: [],
            datatable: [],
            idvalue:'',
            statusallperingkatrisikotable:'',
            statusallperingkatrisiko:'',
            loading: false,
            lengthdata:0,
            deletestatus:'',
        }
    }

    componentDidMount(){
        this.props.getAllPeringkatRisiko({page:this.state.paging, token:this.props.token});
        this.props.countAllPeringkatRisiko({token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            datatable : nextProps.getallperingkatrisiko,
            statusallperingkatrisikotable : nextProps.statusallperingkatrisikotable,
            statusallperingkatrisiko : nextProps.statusallperingkatrisiko
        });

        if (nextProps.statusallperingkatrisikotable === 200 && nextProps.statusallperingkatrisiko === 200){
            this.setState({
                loading:false,
                lengthdata:nextProps.countperingkatrisiko,
                deletestatus:''
            });
        }

        if (nextProps.deleteperingkatrisiko === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteperingkatrisiko
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.deletestatus != this.state.deletestatus){
            this.onChangePagination(nextState.paging);
            this.setState({
                deletestatus : nextProps.deleteperingkatrisiko
            })
        }
        return true;
    }

    handleChange = (pagination, filters, sorter) => {
        this.onRefresh();
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
        this.setState({
            editbutton: false,
        });

        if (status === 201 || status === 200) {
            this.onChangePagination(this.state.paging);
            NotificationManager.success("Data has updated.", "Success !!");
        }
    }

    clickAddSuccessButton = (status) => {
        this.setState({
            addbutton: false,
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
        this.props.getAllPeringkatRisiko({page:page, token:this.props.token});
        this.props.countAllPeringkatRisiko({token:this.props.token});
    }

    onRefresh = () => {
        this.setState({
            loading:true
        });
        this.props.getAllPeringkatRisiko({page:this.state.paging, token:this.props.token});
        this.props.countAllPeringkatRisiko({token:this.props.token});
    }

    render() {
        let {sortedInfo} = this.state;
        const {datatable, warning, addbutton, editbutton, eid, fetchdata, idvalue, paging, loading, lengthdata} = this.state;
        const {token} = this.props;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name'),
            width : '200px',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Jenis Penilaian',
            dataIndex: 'jenis_nilai',
            key: 'jenis_nilai',
            ...this.getColumnSearchProps('jenis_nilai'),
            sorter: (a, b) => a.jenis_nilai.localeCompare(b.jenis_nilai),
            sortOrder: sortedInfo.columnKey === 'jenis_nilai' && sortedInfo.order,
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...this.getColumnSearchProps('description'),
            sorter: (a, b) => a.description.localeCompare(b.description),
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        }, {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
            sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
            render : (text, record) => {
                if (text.includes('T')){
                    var spTgl = text.split("T");
                    var spTime = spTgl[1].split(".");

                    var tgl = spTgl[0]+' '+spTime[0];
                } else {
                    var tgl = text;
                }
                return(
                    <span>{tgl}</span>
                );
            }
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
                                id:text.id,
                                description:text.description,
                                name:text.name,
                                id_jenis_nilai:1
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
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : "+eid : "Read Table Jenis Peringkat Risiko"}>
                {
                    addbutton ?
                        <SavePeringkatRisiko clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditPeringkatRisiko clickCancelEditButton={this.clickCancelEditButton}
                                             clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata} eid={eid}
                        /> :
                    <>
                        <div className="table-operations">
                            <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                            <Button className="ant-btn" onClick={this.onRefresh}>Refresh</Button>
                        </div>
                        <Spin tip="Loading..." spinning={loading}>
                            <Table className="gx-table-responsive" columns={columns} dataSource={datatable} onChange={this.handleChange} rowKey="id"
                                   pagination={false}
                            />
                        </Spin>
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
                                        this.props.deletePeringkatRisiko({id:idvalue, token:token});
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

const mapStateToProps = ({auth, peringkatrisiko}) => {
    const {token} = auth;
    const {getallperingkatrisiko,
        getperingkatrisiko,
        statusallperingkatrisikotable,
        countperingkatrisiko,
        statusallperingkatrisiko,
        deleteperingkatrisiko} = peringkatrisiko;
    return {token,getallperingkatrisiko,getperingkatrisiko,statusallperingkatrisikotable,countperingkatrisiko,statusallperingkatrisiko,deleteperingkatrisiko};
};

export default connect(mapStateToProps, {getAllPeringkatRisiko, deletePeringkatRisiko, countAllPeringkatRisiko})(TablePeringkatRisiko);