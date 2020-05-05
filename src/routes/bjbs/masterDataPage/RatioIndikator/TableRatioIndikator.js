import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input, Pagination, Spin} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";

import {connect} from "react-redux";
import {getAllRatioIndikatortable, deleteRatioIndikator, countAllRatioIndikator} from "../../../../appRedux/actions/RatioIndikator";
import SaveRatioIndikator from "./SaveRatioIndikator";
import EditRatioIndikator from "./EditRatioIndikator";
import {Link} from "react-router-dom";

class TableRatioIndikator extends React.Component{
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
            statusallratioindikatortable:'',
            statuscountratioindikator:'',
            loading: false,
            lengthdata:0,
            deletestatus:'',
            paramjenis:'',
            edjenis:''
        }
    }

    componentDidMount(){
        this.props.getAllRatioIndikatortable({page:this.state.paging, token:this.props.token, jenis:this.state.jenis});
        this.props.countAllRatioIndikator({token:this.props.token, jenis:this.state.jenis});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statusallratioindikatortable : nextProps.statusallratioindikatortable,
            statuscountratioindikator : nextProps.statusallratioindikator
        });

        if (nextProps.statusallratioindikatortable === 200 && nextProps.statusallratioindikator === 200){
            if (nextProps.countratioindikator){
                if (nextProps.getallratioindikatortable.rows){
                    this.setState({
                        loading:false,
                        lengthdata:nextProps.countratioindikator,
                        deletestatus:'',
                        datatable : []
                    });
                } else {
                    this.setState({
                        loading:false,
                        lengthdata:nextProps.countratioindikator,
                        deletestatus:'',
                        datatable : nextProps.getallratioindikatortable
                    });
                }
            } else {
                this.setState({
                    loading:false,
                    lengthdata:0,
                    deletestatus:'',
                    datatable : nextProps.getallratioindikatortable
                });
            }
        }

        if (nextProps.deleteratioindikator === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteratioindikator
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onChangePagination(nextState.paging);
            this.setState({
                deletestatus : nextProps.deleteratioindikator
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
                    value={
                        (this.state.edjenis !== '' && dataIndex === 'jenis') ?
                            this.state.edjenis :
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
                (this.state.edjenis !== '' && dataIndex === 'jenis') ?
                    '#1890ff' :
                        filtered ? '#1890ff' :
                            undefined
        }}/>,
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
            ((this.state.edjenis !== '' && dataIndex === 'jenis')) ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[(this.state.edjenis !== '' && dataIndex === 'jenis') ? this.state.edjenis :
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
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });

        if (dataIndex === 'jenis') {
            var paramjenis = selectedKeys[0];
            if (!paramjenis) {
                paramjenis = '';
            }

            this.setState({
                paramjenis: paramjenis,
                loading: true,
                edjenis: paramjenis
            });
            this.props.getAllRatioIndikatortable({page:1, token:this.props.token, jenis:paramjenis});
            this.props.countAllRatioIndikator({token:this.props.token, jenis:paramjenis});
        }
    };

    handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        this.setState({
            searchText: ''
        });

        if (dataIndex === 'jenis') {
            this.setState({
                paramjenis: '',
                loading: true,
                edjenis: ''
            });
            this.props.getAllRatioIndikatortable({page:1, token:this.props.token, jenis:''});
            this.props.countAllRatioIndikator({token:this.props.token, jenis:''});
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
        this.props.getAllRatioIndikatortable({page:page, token:this.props.token, jenis:this.state.paramjenis});
        this.props.countAllRatioIndikator({token:this.props.token, jenis:this.state.paramjenis});
    }

    onRefresh = () => {
        this.setState({
            paging: 1,
            loading:true
        });
        this.props.getAllRatioIndikatortable({page:1, token:this.props.token, jenis:this.state.paramjenis});
        this.props.countAllRatioIndikator({token:this.props.token, jenis:this.state.paramjenis});
    }

    render() {
        let {sortedInfo} = this.state;
        const {datatable, warning, addbutton, editbutton, eid, fetchdata, idvalue, paging, loading, lengthdata} = this.state;
        const {token, propstat} = this.props;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width : '200px',
            // ...this.getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            // ...this.getColumnSearchProps('description'),
            sorter: (a, b) => a.description.localeCompare(b.description),
            sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
        }, {
            title: 'Jenis',
            dataIndex: 'jenis',
            key: 'jenis',
            ...this.getColumnSearchProps('jenis'),
            sorter: (a, b) => a.jenis.localeCompare(b.jenis),
            sortOrder: sortedInfo.columnKey === 'jenis' && sortedInfo.order,
        }, {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            sorter: (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
            sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
            render : (text, record) => {
                var tgl = '';
                if (text === null){
                    tgl = '-';
                } else {
                    if (text.includes('T')){
                        var spTgl = text.split("T");
                        var spTime = spTgl[1].split(".");

                        tgl = spTgl[0]+' '+spTime[0];
                    } else {
                        tgl = text;
                    }
                }

                return(
                    <span>{tgl}</span>
                );
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span className="gx-link" onClick={()=>{
                        this.setState({
                            eid : text.id,
                            editbutton: true,
                            fetchdata : [{
                                id:text.id,
                                name:text.name,
                                description:text.description,
                                jenis:text.jenis,
                                id_jenis_nilai:text.id_jenis_nilai,
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
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : ID["+eid+"]" : "Read Table Ratio Indikator"}>
                {
                    addbutton ?
                        <SaveRatioIndikator clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditRatioIndikator clickCancelEditButton={this.clickCancelEditButton}
                                            clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata} eid={eid}
                        /> :
                    <>
                        <div className="table-operations">
                            {
                                propstat ?
                                    <Link className="ant-btn  ant-btn-danger" to={{pathname:'/bjbs/profilrisiko/parameterkuantitatif',
                                        paramKuantitatifProps:{
                                            pkparameter:propstat.rparameter,
                                            pklow:propstat.rlow,
                                            pklowtomoderate:propstat.rlowtomoderate,
                                            pkmoderate:propstat.rmoderate,
                                            pkmoderatetohigh:propstat.rmoderatetohigh,
                                            pkhigh:propstat.rhigh,
                                            pkbobot:propstat.rbobot,
                                            pkpenomoran:propstat.rpenomoran,
                                            pklevel:propstat.rlevel,
                                            pkindukparameter:propstat.rindukparameter,
                                            pkrisk_id:propstat.rrisk_id,
                                            pkjenisnilai:propstat.rjenisnilai,
                                            pkindikatorpenyebut:propstat.rindikatorpenyebut,
                                            pkindikatorpembilang:propstat.rindikatorpembilang,
                                            addtrue : propstat.raddtrue ? true : false,
                                            edittrue : propstat.redittrue ? true : false,
                                            pkid:propstat.rid ? propstat.rid : ''
                                        }}
                                    }>Back To Add Parameter Kuantitatif</Link> : ''
                            }
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
                                            <Pagination current={paging} total={lengthdata} onChange={this.onChangePagination}/> : ''
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
                                        this.props.deleteRatioIndikator({id:idvalue, token:token});
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

const mapStateToProps = ({auth, ratioindikator}) => {
    const {token} = auth;
    const {getallratioindikatortable,
        getratioindikator,
        statusallratioindikatortable,
        countratioindikator,
        statusallratioindikator,
        deleteratioindikator} = ratioindikator;
    return {token,getallratioindikatortable,getratioindikator,statusallratioindikatortable,countratioindikator,statusallratioindikator,deleteratioindikator};
};

export default connect(mapStateToProps, {getAllRatioIndikatortable, deleteRatioIndikator, countAllRatioIndikator})(TableRatioIndikator);