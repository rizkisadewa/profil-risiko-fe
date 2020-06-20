import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input, Pagination, Spin} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SaveKpmrRatioIndikator from "./SaveKpmrRatioIndikator";
import EditKpmrRatioIndikator from "./EditKpmrRatioIndikator";

import {connect} from "react-redux";
import {
  getAllRisikoInherenRatioIndikator,
  deleteRisikoInherenRatioIndikator,
  countAllRisikoInherenRatioIndikator
} from "../../../../appRedux/actions/RisikoInherenRatioIndikator";

class TableKpmrRatioIndikator extends React.Component{
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
            statusallrisikoinherenratioindikatortable:'',
            statusallrisikoinherenratioindikator:'',
            loading: false,
            lengthdata:0,
            deletestatus:'',
            description:'',
            paramname:'',
            paramjenisnilai:'',
            eddesc:'',
            edname:'',
            edjenisnilai:'',
        }
    }

    componentDidMount(){
        this.props.getAllRisikoInherenRatioIndikator({page:this.state.paging, token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
        this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statusallrisikoinherenratioindikatortable : nextProps.statusallrisikoinherenratioindikatortable,
            statusallrisikoinherenratioindikator : nextProps.statusallrisikoinherenratioindikator
        });

        if (nextProps.statusallrisikoinherenratioindikatortable === 200 && nextProps.statusallrisikoinherenratioindikator === 200){
            if (nextProps.countrisikoinherenratioindikator){
                if (nextProps.getallrisikoinherenratioindikator.rows){
                    this.setState({
                        loading:false,
                        lengthdata:nextProps.countrisikoinherenratioindikator,
                        deletestatus:'',
                        datatable : [],
                    });
                } else {
                    this.setState({
                        loading:false,
                        lengthdata:nextProps.countrisikoinherenratioindikator,
                        deletestatus:'',
                        datatable : nextProps.getallrisikoinherenratioindikator,
                    });
                }
            } else {
                this.setState({
                    loading:false,
                    lengthdata:0,
                    deletestatus:'',
                    datatable : [],
                });
            }
        }

        if (nextProps.deleterisikoinherenratioindikator === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleterisikoinherenratioindikator
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onRefresh();
            this.setState({
                deletestatus : nextProps.deleterisikoinherenratioindikator
            })
        }
        return true;
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
                    value    ={
                        (this.state.edname !== '' && dataIndex === 'name') ?
                                this.state.edname :
                        (this.state.eddesc !== '' && dataIndex === 'description') ?
                            this.state.eddesc :
                        (this.state.edjenisnilai !== '' && dataIndex === 'jenis_nilai') ?
                            this.state.edjenisnilai :
                        selectedKeys[0]
                    }
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

                <Button onClick={() => this.handleReset(clearFilters, dataIndex)} size="small" style={{width:90}}>Reset</Button>
            </div>
        ),
        filterIcon : filtered => <SearchOutlined style={{color:
                (this.state.edname !== '' && dataIndex === 'name') ?
                    '#1890ff' :
                (this.state.eddesc !== '' && dataIndex === 'description') ?
                    '#1890ff' :
                (this.state.edjenisnilai !== '' && dataIndex === 'jenis_nilai') ?
                    '#1890ff' :
                filtered ? '#1890ff' :
                undefined }}/>,
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
            ((this.state.edname !== '' && dataIndex === 'name') || (this.state.eddesc !== '' && dataIndex === 'description') || (this.state.edjenisnilai !== '' && dataIndex === 'jenis_nilai')) ? (
                <Highlighter
                    highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                    searchWords={[(this.state.edname !== '' && dataIndex === 'name') ? this.state.edname :
                        (this.state.eddesc !== '' && dataIndex === 'description') ? this.state.eddesc :
                            (this.state.edjenisnilai !== '' && dataIndex === 'jenis_nilai') ? this.state.edjenisnilai :
                                this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) :
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
            searchText: (selectedKeys[0]) ? selectedKeys[0] : '',
            searchedColumn: dataIndex,
        });

        if (dataIndex === 'name'){
            var parameters = selectedKeys[0];
            if (!parameters){
                parameters = '';
            }

            this.setState({
                paramname:parameters,
                loading:true,
                edname: parameters
            });
            this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:this.state.description, name:parameters, jenis_nilai:this.state.paramjenisnilai});
            this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:parameters, jenis_nilai:this.state.paramjenisnilai});
        }

        if (dataIndex === 'description'){
            var paramdesc = selectedKeys[0];
            if (!paramdesc){
                paramdesc = '';
            }

            this.setState({
                description:paramdesc,
                loading:true,
                eddesc:paramdesc
            });
            this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:paramdesc, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
            this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:paramdesc, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
        }

        if (dataIndex === 'jenis_nilai'){
            var paramjenisnilai = selectedKeys[0];
            if (!paramjenisnilai){
                paramjenisnilai = '';
            }

            this.setState({
                paramjenisnilai:paramjenisnilai,
                loading:true,
                edjenisnilai:paramjenisnilai
            });
            this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:paramjenisnilai});
            this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:paramjenisnilai});
        }
    };

    handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        this.setState({
            searchText: ''
        });

        if (dataIndex === 'name'){
            this.setState({
                paramname:'',
                loading:true,
                edname:''
            });
            this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:this.state.description, name:'', jenis_nilai:this.state.paramjenisnilai});
            this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:'', jenis_nilai:this.state.paramjenisnilai});
        }

        if (dataIndex === 'description'){
            this.setState({
                description:'',
                loading:true,
                eddesc:''
            });
            this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:'', name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
            this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:'', name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
        }

        if (dataIndex === 'jenis_nilai'){
            this.setState({
                paramjenisnilai:'',
                loading:true,
                edjenisnilai:''
            });
            this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:''});
            this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:''});
        }
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
        this.onRefresh();
    }

    clickCancelEditButton = () => {
        this.setState({
            editbutton: false
        })
        this.onRefresh();
    }

    clickEditSuccessButton = (status) => {
        this.setState({
            editbutton: false,
        });

        if (status === 201 || status === 200) {
            this.onRefresh();
            NotificationManager.success("Data has updated.", "Success !!");
        }
    }

    clickAddSuccessButton = (status) => {
        this.setState({
            addbutton: false,
        });

        if (status === 201 || status === 200){
            this.onRefresh();
            NotificationManager.success("Data has saved.", "Success !!");
        }
    }

    onChangePagination = page => {
        this.setState({
            paging: page,
            loading:true
        });
        this.props.getAllRisikoInherenRatioIndikator({page:page, token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
        this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
    }

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1,
        });
        this.props.getAllRisikoInherenRatioIndikator({page:1, token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
        this.props.countAllRisikoInherenRatioIndikator({token:this.props.token, description:this.state.description, name:this.state.paramname, jenis_nilai:this.state.paramjenisnilai});
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
                var tgl = '';
                if (text.includes('T')){
                    var spTgl = text.split("T");
                    var spTime = spTgl[1].split(".");

                    tgl = spTgl[0]+' '+spTime[0];
                } else {
                    tgl = text;
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
                                id_jenis_nilai:text.id_jenis_nilai
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

        console.log("ini log columns");
        console.log(columns);

        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : ID["+eid+"]" : "Read Table Ratio Indikator"}>
                {
                    addbutton ?
                        <SaveKpmrRatioIndikator clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditKpmrRatioIndikator clickCancelEditButton={this.clickCancelEditButton}
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
                            <div className="table-operations" style={{ paddingTop : '1rem', float : 'right' }}>
                                {
                                    (lengthdata) ?
                                        lengthdata > 0 ?
                                            <Pagination current={paging} total={lengthdata ? lengthdata : 1} onChange={this.onChangePagination}/> : ''
                                        : ''

                                }
                            </div>
                        </Spin>
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
                                        this.props.deleteRisikoInherenRatioIndikator({id:idvalue, token:token});
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

const mapStateToProps = ({auth, risikoinherenratioindikator}) => {
    const {token} = auth;
    const {getallrisikoinherenratioindikator,
        getrisikoinherenratioindikator,
        statusallrisikoinherenratioindikatortable,
        countrisikoinherenratioindikator,
        statusallrisikoinherenratioindikator,
        deleterisikoinherenratioindikator} = risikoinherenratioindikator;
    return {token,getallrisikoinherenratioindikator,getrisikoinherenratioindikator,statusallrisikoinherenratioindikatortable,countrisikoinherenratioindikator,statusallrisikoinherenratioindikator,deleterisikoinherenratioindikator};
};

export default connect(mapStateToProps, {getAllRisikoInherenRatioIndikator, deleteRisikoInherenRatioIndikator, countAllRisikoInherenRatioIndikator})(TableKpmrRatioIndikator);