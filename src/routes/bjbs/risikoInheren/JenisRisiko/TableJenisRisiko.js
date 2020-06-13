import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input, Spin, Pagination} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import {getAllRisks, deleteRisk, getCountRisks} from "../../../../appRedux/actions/index";
import connect from "react-redux/es/connect/connect";

import SaveJenisRisiko from "./SaveJenisRisiko";
import EditJenisRisiko from "./EditJenisRisiko";

class TableJenisRisiko extends React.Component {
    constructor(props) {
        super(props);
        // this.handleProp=this.handleProp.bind(this);
        this.state = {
            //filteredInfo: null,
            paging: 1,
            sortedInfo: null,
            warning: false,
            searchText: '',
            searchedColumn: '',
            addbutton : false,
            editbutton : false,
            eid : "",
            fetchdata: [],
            datatable: [],
            idvalue : '',
            statusjenisrisikotable: '',
            statusjenisrisiko: '',
            loading : false,
            lengthdata : 0,
            deletestatus:'',
            paramname : '',
            paramket : '',
            paramjenis : '',
            edname:'',
            edket:'',
            edjenis:'',
            jenis: 'PR'

        };
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:this.state.jenis, nama:this.state.paramname, keterangan:this.state.paramket});
        this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
    }

    componentWillReceiveProps(nextProps) {
        // this.props.getAllRisks({token:this.props.token});
        this.setState({
            statusjenisrisikotable : nextProps.statusallrisks,
            statusjenisrisiko : nextProps.statusallrisk
        });

        // return nextProps.getallrisks;
        if (nextProps.statusallrisks === 200 && nextProps.statusallrisk === 200){
            if (nextProps.countallrisks){
                if (nextProps.getallrisks){
                    this.setState({
                        loading:false,
                        lengthdata: nextProps.countallrisks,
                        deletestatus:'',
                        datatable : nextProps.getallrisks,
                    });
                } else {
                    this.setState({
                        loading:false,
                        lengthdata: nextProps.countallrisks,
                        deletestatus:'',
                        datatable : [],
                    });
                }
            } else {
                this.setState({
                    loading:false,
                    lengthdata: 0,
                    deletestatus:'',
                    datatable : [],
                });
            }
        }

        if (nextProps.deleteallrisks === 200) {
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteallrisks
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onRefresh();
            this.setState({
                deletestatus : nextProps.deleteallrisks
            });
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
                        (this.state.edname !== '' && dataIndex === 'nama') ?
                            this.state.edname :
                        (this.state.edket !== '' && dataIndex === 'keterangan') ?
                            this.state.edket :
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
                (this.state.edname !== '' && dataIndex === 'nama') ?
                    '#1890ff' :
                (this.state.edket !== '' && dataIndex === 'keterangan') ?
                    '#1890ff' :
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
            ((this.state.edname !== '' && dataIndex === 'nama') || (this.state.edket !== '' && dataIndex === 'keterangan') || (this.state.edjenis !== '' && dataIndex === 'jenis')) ? (
                <Highlighter
                    highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                    searchWords={[(this.state.edname !== '' && dataIndex === 'nama') ? this.state.edname :
                        (this.state.edket !== '' && dataIndex === 'keterangan') ? this.state.edket :
                            (this.state.edjenis !== '' && dataIndex === 'jenis') ? this.state.edjenis :
                                this.state.searchText
                    ]}
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

        if (dataIndex === 'nama'){
            var paramname = selectedKeys[0];
            if (!paramname){
                paramname = '';
            }

            this.setState({
                paramname:paramname,
                loading:true,
                edname: paramname
            });
            this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:this.state.paramjenis, nama:paramname, keterangan:this.state.paramket});
            this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:paramname, keterangan:this.state.paramket});
        }

        if (dataIndex === 'keterangan'){
            var paramket = selectedKeys[0];
            if (!paramket){
                paramket = '';
            }

            this.setState({
                paramket:paramket,
                loading:true,
                edket: paramket
            });
            this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:paramket});
            this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:paramket});
        }

        if (dataIndex === 'jenis'){
            var paramjenis = selectedKeys[0];
            if (!paramjenis){
                paramjenis = '';
            }

            this.setState({
                paramjenis:paramjenis,
                loading:true,
                edjenis: paramjenis
            });
            this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
            this.props.getCountRisks({token:this.props.token, jenis:paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
        }
    };

    handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        this.setState({
            searchText: ''
        });

        if (dataIndex === 'nama'){
            this.setState({
                paramname:'',
                loading:true,
                edname: ''
            });
            this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:this.state.paramjenis, nama:'', keterangan:this.state.paramket});
            this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:'', keterangan:this.state.paramket});
        }

        if (dataIndex === 'keterangan'){
            this.setState({
                paramket:'',
                loading:true,
                edket: ''
            });
            this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:''});
            this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:''});
        }

        if (dataIndex === 'jenis'){
            this.setState({
                paramjenis:'',
                loading:true,
                edjenis: ''
            });
            this.props.getAllRisks({token:this.props.token, page:this.state.paging, jenis:'', nama:this.state.paramname, keterangan:this.state.paramket});
            this.props.getCountRisks({token:this.props.token, jenis:'', nama:this.state.paramname, keterangan:this.state.paramket});
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

        if (status === 201 || status === 200) {
            this.onRefresh();
            NotificationManager.success("Data has saved.", "Success !! ");
        }
    }

    onChangePagination = page => {
        this.setState({
            loading:true,
            paging:page
        });
        this.props.getAllRisks({token:this.props.token, page:page, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
        this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
    }

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1
        });
        this.props.getAllRisks({token:this.props.token, page:1, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
        this.props.getCountRisks({token:this.props.token, jenis:this.state.paramjenis, nama:this.state.paramname, keterangan:this.state.paramket});
    }

    render() {
        // let {sortedInfo, filteredInfo} = this.state;
        let {sortedInfo} = this.state;
        const {warning, datatable, addbutton, editbutton, eid, fetchdata, idvalue, loading, paging, lengthdata} = this.state;
        const {token} = this.props;
        sortedInfo = sortedInfo || {};
        // filteredInfo = filteredInfo || {};
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
            ...this.getColumnSearchProps('keterangan'),
            width : '300px',
            sorter: (a, b) => a.keterangan.localeCompare(b.keterangan),
            sortOrder: sortedInfo.columnKey === 'keterangan' && sortedInfo.order,
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
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : ID["+eid+"]" : "Read Table Jenis Risiko"}>
                {
                    addbutton ?
                        <SaveJenisRisiko clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditJenisRisiko clickCancelEditButton={this.clickCancelEditButton} clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata} eid={eid}/> :
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
                                            deletestatus: ''
                                        })
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


const mapStateToProps = ({auth,jenisrisiko}) => {
    const {token} = auth;
    const {getallrisks,statusallrisks,deleteallrisks, statusallrisk, countallrisks} = jenisrisiko;
    return {token, getallrisks,statusallrisks,deleteallrisks, statusallrisk, countallrisks}
};

export default connect(mapStateToProps, {getAllRisks,deleteRisk, getCountRisks})(TableJenisRisiko);
