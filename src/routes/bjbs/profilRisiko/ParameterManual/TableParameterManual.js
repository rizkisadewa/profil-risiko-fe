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
            paging:1,
            paramrisk_id : props.fetchdata ? props.fetchdata[0].risks : 0,
            parambulan : props.fetchdata ? props.fetchdata[0].ismonth : 0,
            paramtahun : props.fetchdata ? props.fetchdata[0].isyear : 0,
            parampr_low : '',
            parampr_lowtomod : '',
            parampr_mod : '',
            parampr_modtohigh : '',
            parampr_high : '',
            edpr_low : '',
            edpr_lowtomod : '',
            edpr_mod : '',
            edpr_modtohigh : '',
            edpr_high : '',
        }
    }

    componentDidMount(){
        this.props.getAllParameterManualTable({page:this.state.paging, token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
        });
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
        });
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
                                (this.state.edpr_low !== '' && dataIndex === 'pr_low') ?
                                    this.state.edpr_low :
                                    (this.state.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ?
                                        this.state.edpr_lowtomod :
                                        (this.state.edpr_mod !== '' && dataIndex === 'pr_mod') ?
                                            this.state.edpr_mod :
                                                (this.state.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ?
                                                    this.state.edpr_modtohigh :
                                                        (this.state.edpr_high !== '' && dataIndex === 'pr_high') ?
                                                            this.state.edpr_high :
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
                        (this.state.edpr_low !== '' && dataIndex === 'pr_low') ?
                            '#1890ff' :
                            (this.state.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ?
                                '#1890ff' :
                                (this.state.edpr_mod !== '' && dataIndex === 'pr_mod') ?
                                    '#1890ff' :
                                    (this.state.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ?
                                        '#1890ff' :
                                        (this.state.edpr_high !== '' && dataIndex === 'pr_high') ?
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
            (
                (this.state.edname !== '' && dataIndex === 'name') || (this.state.edpr_low !== '' && dataIndex === 'pr_low') ||
                (this.state.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') || (this.state.edpr_mod !== '' && dataIndex === 'pr_mod') ||
                (this.state.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') || (this.state.edpr_high !== '' && dataIndex === 'pr_high')) ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[(this.state.edname !== '' && dataIndex === 'name') ? this.state.edname :
                                        (this.state.edpr_low !== '' && dataIndex === 'pr_low') ? this.state.edpr_low :
                                            (this.state.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ? this.state.edpr_lowtomod :
                                                (this.state.edpr_mod !== '' && dataIndex === 'pr_mod') ? this.state.edpr_mod :
                                                    (this.state.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ? this.state.edpr_modtohigh :
                                                        (this.state.edpr_high !== '' && dataIndex === 'pr_high') ? this.state.edpr_high :
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
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:paramnames,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:paramnames,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_low'){
            var parampr_low = selectedKeys[0];
            if (!parampr_low){
                parampr_low = ''
            }

            this.setState({
                parampr_low : parampr_low,
                loading : true,
                edpr_low : parampr_low
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_lowtomod'){
            var parampr_lowtomod = selectedKeys[0];
            if (!parampr_lowtomod){
                parampr_lowtomod = ''
            }

            this.setState({
                parampr_lowtomod : parampr_lowtomod,
                loading : true,
                edpr_lowtomod : parampr_lowtomod
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_mod'){
            var parampr_mod = selectedKeys[0];
            if (!parampr_mod){
                parampr_mod = ''
            }

            this.setState({
                parampr_mod : parampr_mod,
                loading : true,
                edpr_mod : parampr_mod
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_modtohigh'){
            var parampr_modtohigh = selectedKeys[0];
            if (!parampr_modtohigh){
                parampr_modtohigh = ''
            }

            this.setState({
                parampr_modtohigh : parampr_modtohigh,
                loading : true,
                edpr_modtohigh : parampr_modtohigh
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_high'){
            var parampr_high = selectedKeys[0];
            if (!parampr_high){
                parampr_high = ''
            }

            this.setState({
                parampr_high : parampr_high,
                loading : true,
                edpr_high : parampr_high
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:parampr_high
            });
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
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:'',
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:'',
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_low'){
            this.setState({
                parampr_low : '',
                loading : true,
                edpr_low : ''
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:'',
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:'',
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_lowtomod'){
            this.setState({
                parampr_lowtomod : '',
                loading : true,
                edpr_lowtomod : ''
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:'',pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:'',pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_mod'){
            this.setState({
                parampr_mod : '',
                loading : true,
                edpr_mod : ''
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:'',pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:'',pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_modtohigh'){
            this.setState({
                parampr_modtohigh : '',
                loading : true,
                edpr_modtohigh : ''
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:'',pr_high:this.state.parampr_high
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:'',pr_high:this.state.parampr_high
            });
        }

        if (dataIndex === 'pr_high'){
           this.setState({
                parampr_high : '',
                loading : true,
                edpr_high : ''
            })
            this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:''
            });
            this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
                risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
                pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:''
            });
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

    clickAddSuccessButton = (status) => {
        this.setState({
            addbutton: false,
        });

        if (status === 201 || status === 200){
            this.onRefresh();
            NotificationManager.success("Data has saved.", "Success !!");
        }
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
        this.props.getAllParameterManualTable({page:page, token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
        });
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
        });
    };

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1
        });
        this.props.getAllParameterManualTable({page:1, token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
        });
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high
        });
    };

    render() {
        const {datatable,warning, loading, addbutton, editbutton, eid, fetchdata, paging, lengthdata, parambulan} = this.state;
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
                    ...this.getColumnSearchProps('pr_low'),
                    sorter:(a, b) => a.pr_low.localeCompare(b.pr_low),
                    sortOrder:sortedInfo.columnKey === 'pr_low' && sortedInfo.order
                }, {
                    title:"Low To Moderate",
                    dataIndex:"pr_lowtomod",
                    key:"pr_lowtomod",
                    ...this.getColumnSearchProps('pr_lowtomod'),
                    sorter:(a, b) => a.pr_lowtomod.localeCompare(b.pr_lowtomod),
                    sortOrder:sortedInfo.columnKey === 'pr_lowtomod' && sortedInfo.order
                }, {
                    title:"Moderate",
                    dataIndex:"pr_mod",
                    key:"pr_mod",
                    ...this.getColumnSearchProps('pr_mod'),
                    sorter:(a, b) => a.pr_mod.localeCompare(b.pr_mod),
                    sortOrder:sortedInfo.columnKey === 'pr_mod' && sortedInfo.order
                }, {
                    title:"Moderate To High",
                    dataIndex:"pr_modtohigh",
                    key:"pr_modtohigh",
                    ...this.getColumnSearchProps('pr_modtohigh'),
                    sorter:(a, b) => a.pr_modtohigh.localeCompare(b.pr_modtohigh),
                    sortOrder:sortedInfo.columnKey === 'pr_modtohigh' && sortedInfo.order
                }, {
                    title:"High",
                    dataIndex:"pr_high",
                    key:"pr_high",
                    ...this.getColumnSearchProps('pr_high'),
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
                        console.log('statusss');
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
                                risk_id:text.risk_id,
                                ismonth:parambulan
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
                    addbutton ? <SaveParameterManual clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
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