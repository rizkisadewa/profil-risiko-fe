import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Button, Card, Table, Input, Pagination, Spin} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined} from "@ant-design/icons";
import SavePenilaian from "./SavePenilaian";
import EditPenilaian from "./EditPenilaian";

import {connect} from "react-redux";
import {getAllJenisPenilaian, deleteJenisPenilaian, countAllJenisPenilaian} from "../../../../appRedux/actions/Jenispenilaian";

class TablePenilaian extends React.Component{
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
            statusalljenispenilaiantable:'',
            statusalljenispenilaian:'',
            loading: false,
            lengthdata:0,
            deletestatus:'',
            paramdesc:'',
            paramname:'',
            eddesc:'',
            edname:'',
        }
    }

    componentDidMount(){
        this.props.getAllJenisPenilaian({page:this.state.paging, token:this.props.token, name:this.state.paramname, description:this.state.paramdesc});
        this.props.countAllJenisPenilaian({token:this.props.token, name:this.state.paramname, description:this.state.paramdesc});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statusalljenispenilaiantable : nextProps.statusalljenispenilaiantable,
            statusalljenispenilaian : nextProps.statusalljenispenilaian
        });

        if (nextProps.statusalljenispenilaiantable === 200 && nextProps.statusalljenispenilaian === 200){
            if (nextProps.countjenispenilaian){
                if (nextProps.getalljenispenilaian.rows){
                    this.setState({
                        loading:false,
                        lengthdata:nextProps.countjenispenilaian,
                        deletestatus:'',
                        datatable : []
                    });
                } else {
                    this.setState({
                        loading:false,
                        lengthdata:nextProps.countjenispenilaian,
                        deletestatus:'',
                        datatable : nextProps.getalljenispenilaian
                    });
                }
            } else {
                this.setState({
                    loading:false,
                    lengthdata:0,
                    deletestatus:'',
                    datatable : nextProps.getalljenispenilaian
                });
            }
        }

        if (nextProps.deletejenispenilaian === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deletejenispenilaian
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onChangePagination(nextState.paging);
            this.setState({
                deletestatus : nextProps.deletejenispenilaian
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
                        (this.state.edname !== '' && dataIndex === 'name') ?
                                this.state.edname :
                        (this.state.eddesc !== '' && dataIndex === 'description') ?
                                this.state.eddesc :
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
            ((this.state.edname !== '' && dataIndex === 'name') || (this.state.eddesc !== '' && dataIndex === 'description')) ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[(this.state.edname !== '' && dataIndex === 'name') ? this.state.edname :
                            (this.state.eddesc !== '' && dataIndex === 'description') ? this.state.eddesc :
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

        if (dataIndex === 'name') {
            var paramname = selectedKeys[0];
            if (!paramname) {
                paramname = '';
            }

            this.setState({
                paramname: paramname,
                loading: true,
                edname: paramname
            });
            this.props.getAllJenisPenilaian({page:1, token:this.props.token, name:paramname, description:this.state.paramdesc});
            this.props.countAllJenisPenilaian({token:this.props.token, name:paramname, description:this.state.paramdesc});
        }

        if (dataIndex === 'description') {
            var paramdesc = selectedKeys[0];
            if (!paramdesc) {
                paramdesc = '';
            }

            this.setState({
                paramdesc: paramdesc,
                loading: true,
                eddesc: paramdesc
            });
            this.props.getAllJenisPenilaian({page:1, token:this.props.token, name:this.state.paramname, description:paramdesc});
            this.props.countAllJenisPenilaian({token:this.props.token, name:this.state.paramname, description:paramdesc});
        }
    };

    handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        this.setState({
            searchText: ''
        });

        if (dataIndex === 'name') {
            this.setState({
                paramname: '',
                loading: true,
                edname: ''
            });
            this.props.getAllJenisPenilaian({page:1, token:this.props.token, name:'', description:this.state.paramdesc});
            this.props.countAllJenisPenilaian({token:this.props.token, name:'', description:this.state.paramdesc});
        }

        if (dataIndex === 'description') {
            this.setState({
                paramdesc: '',
                loading: true,
                eddesc: ''
            });
            this.props.getAllJenisPenilaian({page:1, token:this.props.token, name:this.state.paramname, description:''});
            this.props.countAllJenisPenilaian({token:this.props.token, name:this.state.paramname, description:''});
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
        this.props.getAllJenisPenilaian({page:page, token:this.props.token, name:this.state.paramname, description:this.state.paramdesc});
        this.props.countAllJenisPenilaian({token:this.props.token, name:this.state.paramname, description:this.state.paramdesc});
    }

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1
        });
        this.props.getAllJenisPenilaian({page:1, token:this.props.token, name:this.state.paramname, description:this.state.paramdesc});
        this.props.countAllJenisPenilaian({token:this.props.token, name:this.state.paramname, description:this.state.paramdesc});
    }

    render() {
        let {sortedInfo} = this.state;
        const {datatable, warning, addbutton, editbutton, eid, fetchdata, idvalue, paging, loading, lengthdata} = this.state;
        const {token} = this.props;
        sortedInfo = sortedInfo || {};
        const columns = [/* {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            ...this.getColumnSearchProps('id'),
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        },*/ {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
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
        }];

        return (
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : ID["+eid+"]" : "Read Table Jenis Penilaian"}>
                {
                    addbutton ?
                        <SavePenilaian clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditPenilaian clickCancelEditButton={this.clickCancelEditButton}
                                       clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata} eid={eid}
                        /> :
                    <>
                        <div className="table-operations">
                            {/* <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button> */}
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
                                        this.props.deleteJenisPenilaian({id:idvalue, token:token});
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

const mapStateToProps = ({auth, jenispenilaian}) => {
    const {token} = auth;
    const {getalljenispenilaian,
        getjenispenilaian,
        statusalljenispenilaiantable,
        countjenispenilaian,
        statusalljenispenilaian,
        deletejenispenilaian} = jenispenilaian;
    return {token,getalljenispenilaian,getjenispenilaian,statusalljenispenilaiantable,countjenispenilaian,statusalljenispenilaian,deletejenispenilaian};
};

export default connect(mapStateToProps, {getAllJenisPenilaian, deleteJenisPenilaian, countAllJenisPenilaian})(TablePenilaian);
