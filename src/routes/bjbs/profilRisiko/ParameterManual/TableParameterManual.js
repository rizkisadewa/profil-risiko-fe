import React from "react";
import {Divider, Button, Card, Table, Spin, Input, Pagination} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import SaveParameterManual from "./SaveParameterManual";
import EditParameterManual from "./EditParameterManual";

import {getAllParameterManualTable, countAllParameterManual} from "../../../../appRedux/actions/Parametermanual";
import {connect} from "react-redux";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

class TableParameterManual extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            datatable: [],
            sortedInfo: null,
            warning:false,
            deletestatus:'',
            loading:false,
            addbutton: false,
            editbutton: false,
            eid: "",
            fetchdata: [],
            statusallparametermanualtable :'',
            statusallparametermanual:'',
            paramname : '',
            edname:'',
            paging:1
        }
    }

    componentDidMount(){
        this.props.getAllParameterManualTable({page:this.state.paging, token:this.props.token, name:this.state.paramname});
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            statusallparametermanualtable : nextProps.statusallparametermanualtable,
            statusallparametermanual : nextProps.statusallparametermanual,
        });

        // console.log(nextProps.deleteparameterfaktor);
        if (nextProps.statusallparametermanualtable === 200 && nextProps.statusallparametermanual === 200){
            if (nextProps.countallparametermanual){
                if (nextProps.statusallparametermanualtable.rows) {
                    this.setState({
                        loading: false,
                        lengthdata: nextProps.countallparametermanual,
                        deletestatus: '',
                        datatable: [],
                    });
                } else {
                    this.setState({
                        loading: false,
                        lengthdata: nextProps.countallparametermanual,
                        deletestatus: '',
                        datatable: nextProps.getallparametermanualtable,
                    });
                }
            } else {
                this.setState({
                    loading:false,
                    lengthdata:0,
                    deletestatus : '',
                    datatable : [],
                });
            }
        }

        /*if(nextProps.deleteparametermanual === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteparametermanual
            });
        }*/
    }

    shouldComponentUpdate(nextProps, nextState) {
        /*if (nextState.deletestatus !== this.state.deletestatus){
            this.onRefresh();
            this.setState({
                deletestatus : nextProps.deleteparametermanual,
            });
        }*/
        return true;
    }

    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(() => {
                this.setState({
                    loading:false
                })
            },300)
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
                    value={
                        (this.state.edname !== '' && dataIndex === 'name') ?
                            this.state.edname :
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
                        filtered ? '#1890ff' :
                            undefined}}/>,
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
            ((this.state.edname !== '' && dataIndex === 'name')) ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[(this.state.edname !== '' && dataIndex === 'name') ? this.state.edname :
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
            searchText: (selectedKeys[0])?selectedKeys[0]:'',
            searchedColumn: dataIndex,
        });

        if (dataIndex === 'name'){
            var paramnames = selectedKeys[0];
            if (!paramnames){
                paramnames = ''
            }

            this.setState({
                paramname : paramnames,
                loading : true,
                edname : paramnames
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:paramnames});
            this.props.countAllParameterManual({token:this.props.token, name:paramnames});
        }
    };

    handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        this.setState({
            searchText: ''
        });

        if (dataIndex === 'name'){
            this.setState({
                paramname : '',
                loading : true,
                edname : ''
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:''});
            this.props.countAllParameterManual({token:this.props.token, name:''});
        }
    };

    onClickCancel = () => {
        this.props.clickCancelFilterButton();
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
    };

    clickCancelAddButton = () => {
        this.setState({
            addbutton: false
        })
        this.onRefresh();
    };

    clickCancelEditButton = () => {
        this.setState({
            editbutton: false,
        })
        this.onRefresh();
    };

    clickAddSuccessButton = (status) => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            addbutton: false
        });

        if (status === 201 || status === 200){
            this.onRefresh();
            NotificationManager.success("Data has saved.", "Success !!");
        }
    };

    onChangePagination = page => {
        this.setState({
            paging: page,
            loading:true
        });
        this.props.getAllParameterManualTable({page:page, token:this.props.token, name:this.state.paramname});
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname});
    };

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1
        });
        this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname});
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname});
    };

    render() {
        const {datatable,warning, loading, addbutton, editbutton, eid, fetchdata, paging, lengthdata} = this.state;
        // const {token} = this.props;
        let {sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [
        {
            title:"#",
            dataIndex:"id",
            key:"id",
            sorter:(a, b) => a.id-b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        }, {
            title:"Risk",
            dataIndex:"risk_name",
            key:"risk_name",
            sorter: (a, b) => a.risk_name.localeCompare(b.risk_name),
            sortOrder: sortedInfo.columnKey === 'risk_name' && sortedInfo.order
        }, {
            title:"Parameter",
            dataIndex:"name",
            key:"name",
            ...this.getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
        }, {
            title: 'Peringkat Risiko',
            children: [
                {
                    title:"Low",
                    dataIndex:"pr_low",
                    key:"pr_low",
                    sorter:(a, b) => a.pr_low.localeCompare(b.pr_low),
                    sortOrder:sortedInfo.columnKey === 'pr_low' && sortedInfo.order
                }, {
                    title:"Low To Moderate",
                    dataIndex:"pr_lowtomod",
                    key:"pr_lowtomod",
                    sorter:(a, b) => a.pr_lowtomod.localeCompare(b.pr_lowtomod),
                    sortOrder:sortedInfo.columnKey === 'pr_lowtomod' && sortedInfo.order
                }, {
                    title:"Moderate",
                    dataIndex:"pr_mod",
                    key:"pr_mod",
                    sorter:(a, b) => a.pr_mod.localeCompare(b.pr_mod),
                    sortOrder:sortedInfo.columnKey === 'pr_mod' && sortedInfo.order
                }, {
                    title:"Moderate To High",
                    dataIndex:"pr_modtohigh",
                    key:"pr_modtohigh",
                    sorter:(a, b) => a.pr_modtohigh.localeCompare(b.pr_modtohigh),
                    sortOrder:sortedInfo.columnKey === 'pr_modtohigh' && sortedInfo.order
                }, {
                    title:"High",
                    dataIndex:"pr_high",
                    key:"pr_high",
                    sorter:(a, b) => a.pr_high.localeCompare(b.pr_high),
                    sortOrder:sortedInfo.columnKey === 'pr_high' && sortedInfo.order
                }
            ]
        }, {
            title:"Bobot",
            dataIndex:"bobot",
            key:"bobot",
            sorter:(a, b) => a.bobot.localeCompare(b.bobot),
            sortOrder:sortedInfo.columnKey === 'bobot' && sortedInfo.order,
            render: (data) => (
                data+'%'
            )
        }, {
            title:"Bulan",
            dataIndex:"bulan",
            key:"bulan",
            sorter:(a, b) => a.bulan.localeCompare(b.bulan),
            sortOrder:sortedInfo.columnKey === 'bulan' && sortedInfo.order,
            render:(data) => {
                var months = ["-","January","February","March","April","May","June","July","August","September","October","November","December"];
                var bulan = '';
                if (data > 12 || data < 0 || data === null){
                    bulan = '-';
                } else {
                    bulan = months[parseInt(data)];
                }

                return bulan;
            }
        }, {
            title:"Tahun",
            dataIndex:"tahun",
            key:"tahun",
            sorter:(a, b) => a.tahun.localeCompare(b.tahun),
            sortOrder:sortedInfo.columnKey === 'tahun' && sortedInfo.order
        }, {
            title:"Action",
            key:"action",
            render:(text, record) => (
                <span>
                    <span className="gx-link" onClick={() => {
                        this.setState({
                            eid : text.id,
                            editbutton: true,
                            fetchdata : [{
                                id:text.id,
                                risk:text.risk,
                                name:text.name,
                                pr_low:text.pr_low,
                                pr_lowtomod:text.pr_lowtomod,
                                pr_mod:text.pr_mod,
                                pr_modtohigh:text.pr_modtohigh,
                                pr_high:text.pr_high,
                                bobot:text.bobot,
                                bulan:text.bulan,
                                tahun:text.tahun,
                                penomoran:text.penomoran,
                                level:text.level,
                                induk_id:text.induk_id,
                                risk_id:text.risk_id
                            }]
                        })
                    }}>Edit</span>
                    <Divider type="vertical"/>
                    <span className="gx-link" onClick={() => {
                        this.setState({
                            warning: true
                        })
                    }}>Delete</span>
                </span>
            )
        }];

        return (
            <Card title={addbutton ? "Tambah Parameter & Indikator" : editbutton ? "Edit Data : ID["+eid+"]"  : "Read Table Parameter Manual"}>
                {
                    addbutton ? <SaveParameterManual clickCancelAddButton={this.clickCancelAddButton}/> :
                    editbutton ? <EditParameterManual clickCancelEditButton={this.clickCancelEditButton} fetchdata={fetchdata} eid={eid} /> :
                        <>
                            <div className="table-operations">
                                <Button className="ant-btn ant-btn-danger" onClick={this.onClickCancel}>Back Filter</Button>
                                <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                                <Button className="ant-btn" onClick={this.onRefresh}>Refresh</Button>
                            </div>
                            <Spin tip="Loading..." spinning={loading}>
                                <Table dataSource={datatable} className="gx-table-responsive" onChange={this.handleChange} rowKey="id" columns={columns}
                                       pagination={false}/>
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

const mapStateToProps = ({auth, parametermanual}) => {
    const {token} = auth;
    const {getallparametermanualtable,postparametermanual,statusallparametermanualtable,countallparametermanual,statusallparametermanual} = parametermanual;
    return {token,getallparametermanualtable,postparametermanual,statusallparametermanualtable,countallparametermanual,statusallparametermanual};
};

export default connect(mapStateToProps, {getAllParameterManualTable, countAllParameterManual})(TableParameterManual);