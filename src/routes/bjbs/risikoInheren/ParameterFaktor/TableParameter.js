import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import {Divider, Button, Card, Table, Input, Pagination, Spin, Select, Form} from "antd";
import IntlMessages from "util/IntlMessages";
import Highlighter from "react-highlight-words";
import {SearchOutlined, CloseCircleOutlined} from "@ant-design/icons";
import SaveParameter from "./SaveParameter";
import EditParameter from "./EditParameter";

import {connect} from "react-redux";
import {getAllFaktorParameterTable, deleteFaktorParameter, countAllFaktorParameter} from "../../../../appRedux/actions/Parameterfaktor";
import {getAllRisks} from "../../../../appRedux/actions/Jenisrisiko";
// import {Redirect} from 'react-router-dom';
const Option = Select.Option;

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
            deletestatus:'',
            risk_id : null,
            dataoptions : [],
            valueselect : null,
            paramname : '',
            parambobot : '',
            paramriskname : '',
            edname:'',
            edbobot:'',
            edriskname:''
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllFaktorParameterTable({
          page:1,
          token:this.props.token,
          searchData: {
            name:this.state.paramname,
            bobot:this.state.parambobot,
            risk_nama:this.state.paramriskname,
            jenis: 'PR'
          }
        });
        this.props.countAllFaktorParameter({token:this.props.token, searchData: {
          name:this.state.paramname,
          bobot:this.state.parambobot,
          risk_nama:this.state.paramriskname,
          jenis: "PR"
        }});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            statusallparameterfaktortable : nextProps.statusallparameterfaktortable,
            statusallparameterfaktor : nextProps.statusallparameterfaktor,
            dataoptions : nextProps.getallrisks,
        });

        // console.log(nextProps.deleteparameterfaktor);
        if (nextProps.statusallparameterfaktortable === 200 && nextProps.statusallparameterfaktor === 200){
            if (nextProps.countallparameterfaktor){
                if (nextProps.getallparameterfaktortable.rows) {
                    this.setState({
                        loading: false,
                        lengthdata: nextProps.countallparameterfaktor,
                        deletestatus: '',
                        datatable: [],
                    });
                } else {
                    this.setState({
                        loading: false,
                        lengthdata: nextProps.countallparameterfaktor,
                        deletestatus: '',
                        datatable: nextProps.getallparameterfaktortable,
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

        if(nextProps.deleteparameterfaktor === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteparameterfaktor
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onRefresh();
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
                    value={
                        (this.state.edname !== '' && dataIndex === 'name') ?
                            this.state.edname :
                        (this.state.edbobot !== '' && dataIndex === 'bobot') ?
                            this.state.edbobot :
                        (this.state.edriskname !== '' && dataIndex === 'risk_nama') ?
                            this.state.edriskname :
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
                (this.state.edbobot !== '' && dataIndex === 'bobot') ?
                    '#1890ff' :
                (this.state.edriskname !== '' && dataIndex === 'risk_nama') ?
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
            ((this.state.edname !== '' && dataIndex === 'name') || (this.state.edbobot !== '' && dataIndex === 'bobot') || (this.state.edriskname !== '' && dataIndex === 'risk_nama')) ? (
                <Highlighter
                    highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                    searchWords={[(this.state.edname !== '' && dataIndex === 'name') ? this.state.edname :
                        (this.state.edbobot !== '' && dataIndex === 'bobot') ? this.state.edbobot :
                            (this.state.edriskname !== '' && dataIndex === 'risk_nama') ? this.state.edriskname :
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
            this.props.getAllFaktorParameterTable({page:1, token:this.props.token, saerchData: {
              name:paramnames,
              bobot:this.state.parambobot,
              risk_nama:this.state.paramriskname,
              jenis: "PR"
            }});
            this.props.countAllFaktorParameter({token:this.props.token, searchData: {
              name:paramnames,
              bobot:this.state.parambobot,
              risk_nama:this.state.paramriskname,
              jenis: "PR"
            }});
        }

        if (dataIndex === 'bobot'){
            var parambobot = selectedKeys[0];
            if (!parambobot){
                parambobot = ''
            }

            this.setState({
                parambobot : parambobot,
                loading : true,
                edbobot : parambobot
            })
            this.props.getAllFaktorParameterTable({page:1, token:this.props.token, searchData: {
              name:this.state.paramname,
              bobot:parambobot,
              risk_nama:this.state.paramriskname,
              jenis: "PR"
            }});
            this.props.countAllFaktorParameter({token:this.props.token, searchData:{
              name:this.state.paramname,
              bobot:parambobot,
              risk_nama:this.state.paramriskname,
              jenis: "PR"
            }});
        }

        if (dataIndex === 'risk_nama'){
            var paramriskname = selectedKeys[0];
            if (!paramriskname){
                paramriskname = ''
            }

            this.setState({
                paramriskname : paramriskname,
                loading : true,
                edriskname : paramriskname
            })
            this.props.getAllFaktorParameterTable({page:1, token:this.props.token, searchData : {
              page: this.state.paging,
              name:this.state.paramname,
              bobot:this.state.parambobot,
              risk_nama:paramriskname,
              jenis: "PR"
            }});
            this.props.countAllFaktorParameter({token:this.props.token, searchData: {
              name:this.state.paramname,
              bobot:this.state.parambobot,
              risk_nama:paramriskname,
              jenis: "PR"
            }});
        }
    };

    handleReset = (clearFilters, dataIndex) => {
        clearFilters();
        this.setState({
            searchText: ''
        });

        this.props.getAllFaktorParameterTable({page:1, token:this.props.token, searchData: {
          jenis: "PR"
        }});
        this.props.countAllFaktorParameter({page:1, token:this.props.token, searchData: {
          jenis: "PR"
        }});
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

    clickEditSuccessButton = (status, message) => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            editbutton: false,
            test: true,
        });

        if (status === 201 || status === 200) {
          this.onRefresh();
          NotificationManager.success("Data has updated.", `${message}`);
        } else {
          this.onRefresh();
          NotificationManager.error("error", `${message}`);
        }
    }

    clickAddSuccessButton = (status) => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
            addbutton: false,
            test: true,
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
        this.props.getAllFaktorParameterTable({page:page, token:this.props.token, searchData: {
          name:this.state.paramname,
          bobot:this.state.parambobot,
          risk_nama:this.state.paramriskname,
          jenis: "PR"
        }});
        this.props.countAllFaktorParameter({token:this.props.token, searchData:{
          name:this.state.paramname,
          bobot:this.state.parambobot,
          risk_nama:this.state.paramriskname,
          jenis: "PR"
        }});
    }

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1,
            valueselect:null
        });
        this.props.getAllFaktorParameterTable({page:1, token:this.props.token, searchData : {
          name:this.state.paramname,
          bobot:this.state.parambobot,
          risk_nama:this.state.paramriskname,
          jenis:"PR"
        }});
        this.props.countAllFaktorParameter({token:this.props.token, searchData: {
          name:this.state.paramname,
          bobot:this.state.parambobot,
          risk_nama:this.state.paramriskname,
          jenis: "PR"
        }});
    }

    handleDelete = (idvalue, token) => {
      this.setState({
          warning: false,
          deletestatus:''
      })
      this.props.deleteFaktorParameter({id:idvalue, token:token});
      this.onRefresh();
      NotificationManager.success("Data has deleted.", "Success !!");
    }

    render() {
        let {sortedInfo} = this.state;
        const {warning, addbutton, editbutton, eid, fetchdata, datatable, idvalue, paging, loading, lengthdata, dataoptions, valueselect, parambobot, paramname, paramriskname} = this.state;
        const {token} = this.props;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: 'Risk Name',
            dataIndex: 'risk_nama',
            key: 'risk_nama',
            ...this.getColumnSearchProps('risk_nama'),
            sorter: (a, b) => a.risk_nama.localeCompare(b.risk_nama),
            sortOrder: sortedInfo.columnKey === 'risk_nama' && sortedInfo.order,
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
                        console.log(text);

                        this.setState({
                            eid : text.id,
                            editbutton: true,
                            fetchdata : [{
                                id : text.id,
                                risk_id : parseInt(text.risk_id),
                                name : text.name,
                                bobot : text.bobot,
                                level : text.level,
                                penomoran : text.penomoran,
                                jenis_nilai_id: parseInt(text.jenis_nilai_id)
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
            <Card title={addbutton ? "Add New Data" : editbutton ? "Edit Data : ID["+eid+"]" : "Read Table ParameterFaktor"}>
                {
                    /*test ? <Redirect to={{
                            pathname: '/bjbs/masterdata/parameter'
                        }}/> :*/
                    addbutton ?
                        <SaveParameter clickCancelAddButton={this.clickCancelAddButton} clickAddSuccessButton={this.clickAddSuccessButton}/> :
                    editbutton ?
                        <EditParameter clickCancelEditButton={this.clickCancelEditButton} clickEditSuccessButton={this.clickEditSuccessButton} fetchdata={fetchdata} eid={eid}
                        /> :
                    <>
                        <div className="table-operations">
                            <Form>

                                <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                                <Button className="ant-btn" onClick={this.onRefresh}>Refresh</Button>
                                <Select id="risk_id"
                                        value={valueselect}
                                        onSelect={(value)=>{
                                            this.setState({
                                                loading:true,
                                                risk_id:value,
                                                valueselect:value
                                            });
                                            this.props.getAllFaktorParameterTable({page:1, token:token, searchData: {
                                              risk_id:value,
                                              name:paramname,
                                              bobot:parambobot,
                                              risk_nama:paramriskname,
                                              jenis: "PR"
                                            }});
                                            this.props.countAllFaktorParameter({token:token, searchData: {
                                              risk_id:value,
                                              name:paramname,
                                              bobot:parambobot,
                                              risk_nama:paramriskname,
                                              jenis: "PR"
                                            }});
                                        }}
                                        clearIcon={<CloseCircleOutlined onClick={()=>{
                                            this.setState({
                                                loading:true,
                                                valueselect:null
                                            });
                                            this.props.getAllFaktorParameterTable({page:1, token:token, searchData: {
                                              name:paramname,
                                              bobot:parambobot,
                                              risk_nama:paramriskname,
                                              jenis: "PR"
                                            }});
                                            this.props.countAllFaktorParameter({token:token, searchData:{
                                              name:paramname,
                                              bobot:parambobot,
                                              risk_nama:paramriskname,
                                              jenis:"PR"
                                            }});
                                        }}/>}
                                        suffixIcon={<SearchOutlined style={{color:'#1890ff'}}/>}
                                        allowClear
                                        showSearch
                                        placeholder="Search risk"
                                        optionFilterProp="children"
                                        style={valueselect === null ? { width: 300, float: 'right', color: '#BFBFBF'} : { width: 300, float: 'right'}}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                    <Option value={null} disabled>Search risk</Option>
                                    {
                                        dataoptions.map((prop, index) => {
                                            var value = prop.id;
                                            var label = prop.nama;
                                            return (
                                                <Option key={index} value={value}>{label}</Option>
                                            )
                                        })
                                    }
                                </Select>

                            </Form>
                        </div>
                        <Spin tip="Loading..." spinning={loading}>
                            <Table className="gx-table-responsive" dataSource={datatable} columns={columns} onChange={this.handleChange} rowKey="id"
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
                                        this.handleDelete(idvalue, token)
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

const mapStateToProps = ({auth, parameterfaktor, jenisrisiko}) => {
    const {token} = auth;
    const {getallparameterfaktortable,getparameterfaktor,statusallparameterfaktortable,countallparameterfaktor,statusallparameterfaktor, deleteparameterfaktor} = parameterfaktor;
    const {getallrisks} = jenisrisiko;
    return {getallparameterfaktortable,getparameterfaktor,token,statusallparameterfaktortable,countallparameterfaktor,statusallparameterfaktor,deleteparameterfaktor, getallrisks}
};

export default connect(mapStateToProps, {getAllFaktorParameterTable, deleteFaktorParameter, countAllFaktorParameter, getAllRisks})(TableParameter);
