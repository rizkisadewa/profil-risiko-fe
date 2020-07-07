import React from "react";
import {Button, Card, Table, Spin, Pagination, Input} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";
// import SaveRisikoInherenKuantitatif from "./SaveRisikoInherenKuantitatif";
// import EditParameterManual from "./EditParameterManual";
import HistoryCalculation from "./HistoryCalculation";

import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import {
  getAllParameterManualTable,
} from "../../../../appRedux/actions/Parametermanual";
import {
  fetchAllRisikoInherenInputKualitatif,
  addRisikoInherenInputKualitatif,
  fetchAllRisikoInherenReport
} from "../../../../appRedux/actions/index";

import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

// data dummy
// import {dataDummy} from './dataDummy';
import {
  renderColumn
} from './ColumnProperties';

// import local css
import './mystyle.css';


class TableKpmr extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sortedInfo: null,
            warning:false,
            deletestatus:'',
            addbutton: false,
            masterversionsdata: [],
            datatable: [],
            statusallparametermanualtable :'',
            statusallparametermanual:'',
            paramname : '',
            edname:'',
            paging:1,
            paramrisk_id : props.fetchdata ? props.fetchdata[0].risks : 0,
            parambulan : props.fetchdata ? props.fetchdata[0].ismonth : 0,
            paramtahun : props.fetchdata ? props.fetchdata[0].isyear : 0,
            version_id : props.fetchdata ? props.fetchdata[0].version_id : 0,
            version_name: props.fetchdata ? props.fetchdata[0].version_name : '',
            risk_name : props.fetchdata ? props.fetchdata[0].risk_name : '',
            loading: false,
            visible: false,
            inputdataoptions: [],
            answervalue: 0
        }
    }

    componentDidMount(){
      this.props.fetchAllRisikoInherenReport({token: this.props.token, searchData : {
        version_id : this.state.version_id,
        jenis : "KPMR",
        bulan : this.state.parambulan,
        tahun : this.state.paramtahun,
        risk_id : this.state.paramrisk_id,
      }})
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        datatable: nextProps.risikoinherenreportdata
      })
    }

    /* componentDidUpdate(){
        if(this.state.loading){
            setTimeout(() => {
                this.setState({
                    loading:false
                })
            },300)
        }
    } */

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            // filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    onClickCancel = () => {
        this.props.clickCancelFilterButton();
    };

    onCancelDelete = () => {
        this.setState({
            warning: false
        });
        this.onChangePagination(this.state.paging);
    };

    clickAddSuccessButton = (status, message) => {
        this.setState({
            visible: false,
            inputdataoptions: []
        });
        if (status === 201 || status === 200){
            this.onRefresh();
            NotificationManager.success("Data has saved.", `${message}`);
        } else {
            this.onRefresh();
            NotificationManager.error("Data has saved.", `${message}`);
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

    onChangePagination = page => {
        this.setState({
            paging: page,
            loading:true
        });
        this.props.getAllParameterManualTable({page:page, token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high,
            bobot:this.state.parambobot
        });
        this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
            risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
            pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high,
            bobot:this.state.parambobot
        });
    };

    onRefresh = () => {
      this.setState({
          loading:true,
          paging:1
      });
      this.props.fetchAllRisikoInherenInputKualitatif({token: this.props.token, searchData: {
        jenis: 'KPMR',
        version_id: this.state.version_id,
        jenis_nilai_id: 4,
        bulan: this.state.parambulan,
        tahun: this.state.paramtahun,
        risk_id: this.state.paramrisk_id
      }});
      this.setState({
          loading:false,
          paging:1
      });
    };

    // modal handling for answer
    showModal = () => {
      this.setState({
        visible: true,
      });
    };

    handleOk = () => {
      console.log("===== DATA INPUT TO BE SUBMIT : ");

      this.props.addRisikoInherenInputKualitatif(this.props.token, {
        ingredients_id: this.state.ingredients_id,
        ratio_indikators_id: parseInt(this.state.answervalue),
        parameter_version_id: this.state.version_id,
        value: parseInt(this.state.answervalue),
        bulan: this.state.parambulan,
        tahun: parseInt(this.state.paramtahun)
      });
    };


    handleCancel = () => {
      this.setState({
        visible: false,
        inputdataoptions: []
      });
    };

    // handle radio button
    onChangeAnswer = (selectedRowKeys, selectedRows) => {
      // console.log('radio1 checked', e.target.value);
      // console.log(this.state.lastanswervalue);
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      this.setState({
        answervalue: selectedRows[0].value,
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
                                                                (this.state.edbobot !== '' && dataIndex === 'bobot') ?
                                                                    this.state.edbobot :
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
                                            (this.state.edbobot !== '' && dataIndex === 'bobot') ?
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
                (this.state.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') || (this.state.edpr_high !== '' && dataIndex === 'pr_high')||
                (this.state.edbobot !== '' && dataIndex === 'bobot')) ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[(this.state.edname !== '' && dataIndex === 'name') ? this.state.edname :
                                        (this.state.edpr_low !== '' && dataIndex === 'pr_low') ? this.state.edpr_low :
                                            (this.state.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ? this.state.edpr_lowtomod :
                                                (this.state.edpr_mod !== '' && dataIndex === 'pr_mod') ? this.state.edpr_mod :
                                                    (this.state.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ? this.state.edpr_modtohigh :
                                                        (this.state.edpr_high !== '' && dataIndex === 'pr_high') ? this.state.edpr_high :
                                                            (this.state.edbobot !== '' && dataIndex === 'bobot') ? this.state.edbobot :
                                                                this.state.searchText
                        ]}
                        autoEscape
                        textToHighlight={typeof text === 'undefined' ? '' : text.toString()}
                    />
            ) :
                this.state.searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={typeof text === 'undefined' ? '' : text.toString()}
                    />
                ) : (text),
    });

    render() {
        const {token} = this.props;
        const {datatable} = this.state;
        let {
          sortedInfo,
          name,
          tahun,
          induk_id,
          warning,
          loading,
          addbutton,
          paging,
          lengthdata
        } = this.state;
        sortedInfo = sortedInfo || {};

        var monthText = '';
        switch(this.state.parambulan){
          case 1:
            monthText = "Januari";
            break;
          case 2:
            monthText = "Pebruari";
            break;
          case 3:
            monthText = "Maret";
            break;
          case 4:
            monthText = "April";
            break;
          case 5:
            monthText = "Mei";
            break;
          case 6:
            monthText = "Juni";
            break;
          case 7:
            monthText = "July";
            break;
          case 8:
            monthText = "Agustus";
            break;
          case 9:
            monthText = "September";
            break;
          case 10:
            monthText = "Oktober";
            break;
          case 11:
            monthText = "November";
            break;
          case 12:
            monthText = "Desember";
            break;
          default:
            break;
        }

        // // render column name
        // const renderNameColumn = (value, row, index) => {
        //   const obj = {
        //     children: row.penomoran+". "+value,
        //     props: {},
        //     className: 'no-class-edit'
        //   };
        //
        //   switch (row.id_jenis_nilai) {
        //     case 1:
        //     case 21:
        //       if(typeof row.pr_low === "undefined"){
        //         if(row.level === 1){
        //           obj.props.colSpan = 11;
        //         } else if (row.level === 2){
        //           obj.props.colSpan = 11;
        //           obj.props.className = 'level2-row';
        //         } else if (row.level === "Per Faktor"){
        //           obj.props.colSpan = 9;
        //           obj.children = value;
        //         }
        //
        //       } else {
        //         obj.props.className = 'editable-row';
        //       }
        //       break;
        //     default:
        //       break;
        //   }
        //
        //   // Tingkat Risiko Inheren
        //   if (row.level === "inheren") {
        //     obj.props.colSpan = 8;
        //     obj.children = value;
        //   }
        //
        //   return obj;
        // }
        //
        // // render parameter faktor : valid only for bobot, risk
        // const renderParameterFaktorColumn = (value, row, index) => {
        //   const obj = {
        //     children: value,
        //     props: {}
        //   };
        //
        //   switch (row.id_jenis_nilai) {
        //     case 1:
        //       if(typeof row.pr_low === "undefined"){
        //         if(row.level === 1 || row.level === 2){
        //           obj.props.colSpan = 0;
        //         }
        //       }
        //       break;
        //     case 21:
        //       if(typeof row.pr_low === "undefined"){
        //         if(row.level === 1 || row.level === 2){
        //           obj.props.colSpan = 0;
        //         }
        //       }
        //       break;
        //     default:
        //       break;
        //
        //   }
        //
        //   return obj;
        // }
        //
        // // render parameter faktor : valid only for risk rate
        // const renderTingkatRisikoInherenColumn = (value, row, index) => {
        //   const obj = {
        //     children: (
        //       <>
        //         {
        //           <Tag
        //             color={value === 'H' ? 'red' : value === "MTH" ? 'orange' : value === "M" ? "yellow" : value === "LTM" ? 'green' : value === "L" ? "blue" : "white" }
        //             key={value}
        //           > {value} </Tag>
        //         }
        //       </>
        //     ),
        //     props: {}
        //   };
        //
        //   switch (row.id_jenis_nilai) {
        //     case 1:
        //       if(typeof row.pr_low === "undefined"){
        //         if(row.level === 1 || row.level === 2){
        //           obj.props.colSpan = 0;
        //         }
        //       }
        //       break;
        //     case 21:
        //       if(row.level === 1){
        //         obj.props.colSpan = 0;
        //       }
        //       break;
        //     default:
        //       break;
        //
        //   }
        //
        //   // Tingkat Risiko Inheren
        //   if (row.level === "inheren") {
        //     obj.props.colSpan = 2;
        //   }
        //
        //   return obj;
        // }
        //
        // // render other column
        // const renderParameterRight = (value, row, index) => {
        //   const obj = {
        //     children: value,
        //     props: {}
        //   };
        //
        //   console.log("*****BINTANG BINTANG");
        //   console.log(value);
        //   console.log(row);
        //   console.log(index);
        //
        //   switch (row.id_jenis_nilai) {
        //     case 1:
        //       if(typeof row.pr_low === "undefined"){
        //         obj.props.colSpan = 0;
        //       }
        //       break;
        //     case 21:
        //       if(row.level === 1){
        //         obj.props.colSpan = 0;
        //       }
        //       break;
        //     default:
        //       break;
        //
        //   }
        //
        //   // Tingkat Risiko Inheren
        //   if (row.level === "inheren") {
        //     obj.props.colSpan = 0;
        //   }
        //
        //   return obj;
        // }
        //
        // const renderColumn = (name) => {
        //   switch (name) {
        //     case "name":
        //     case "pr_low":
        //     case "pr_lowtomod":
        //     case "pr_mod":
        //     case "pr_modtohigh":
        //     case "pr_high":
        //     case "bobot":
        //     case "ratio":
        //     case "risk_rate":
        //     case "score":
        //     case "bobot_score":
        //       return renderNameColumn
        //       break;
        //     default:
        //   }
        // }

        const columns = [
          {
              title:"Parameter",
              dataIndex:"name",
              key:"name",
              width: '31%',
              sorter: (a, b) => a.name.localeCompare(b.name),
              sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
              render: (value, row, index) => renderColumn("name", value, row, index)
          }, {
              title: 'Peringkat Risiko',
              children: [
                  {
                      title:"L",
                      dataIndex:"pr_low",
                      key:"pr_low",
                      width: '5%',
                      className: "editable-row",
                      ...this.getColumnSearchProps('pr_low'),
                      sorter:(a, b) => a.pr_low.localeCompare(b.pr_low),
                      sortOrder:sortedInfo.columnKey === 'pr_low' && sortedInfo.order,
                      render: (value, row, index) => renderColumn("pr_low", value, row, index)
                  }, {
                      title:"LTM",
                      dataIndex:"pr_lowtomod",
                      key:"pr_lowtomod",
                      width: '5%',
                      className: "editable-row",
                      ...this.getColumnSearchProps('pr_lowtomod'),
                      sorter:(a, b) => a.pr_lowtomod.localeCompare(b.pr_lowtomod),
                      sortOrder:sortedInfo.columnKey === 'pr_lowtomod' && sortedInfo.order,
                      render: (value, row, index) => renderColumn("pr_lowtomod", value, row, index)
                  }, {
                      title:"M",
                      dataIndex:"pr_mod",
                      key:"pr_mod",
                      width: '5%',
                      className: "editable-row",
                      ...this.getColumnSearchProps('pr_mod'),
                      sorter:(a, b) => a.pr_mod.localeCompare(b.pr_mod),
                      sortOrder:sortedInfo.columnKey === 'pr_mod' && sortedInfo.order,
                      render: (value, row, index) => renderColumn("pr_mod", value, row, index)
                  }, {
                      title:"MTH",
                      dataIndex:"pr_modtohigh",
                      key:"pr_modtohigh",
                      width: '5%',
                      className: "editable-row",
                      ...this.getColumnSearchProps('pr_modtohigh'),
                      sorter:(a, b) => a.pr_modtohigh.localeCompare(b.pr_modtohigh),
                      sortOrder:sortedInfo.columnKey === 'pr_modtohigh' && sortedInfo.order,
                      render: (value, row, index) => renderColumn("pr_modtohigh", value, row, index)
                  }, {
                      title:"H",
                      dataIndex:"pr_high",
                      width: '5%',
                      className: "editable-row",
                      key:"pr_high",
                      ...this.getColumnSearchProps('pr_high'),
                      sorter:(a, b) => a.pr_high.localeCompare(b.pr_high),
                      sortOrder:sortedInfo.columnKey === 'pr_high' && sortedInfo.order,
                      render: (value, row, index) => renderColumn("pr_high", value, row, index)
                  }
              ]
          }, {
              title:"BOBOT eksisting",
              dataIndex:"bobot",
              key:"bobot",
              width: '11%',
              className: "editable-row",
              ...this.getColumnSearchProps('bobot'),
              sorter:(a, b) => a.bobot.localeCompare(b.bobot),
              sortOrder:sortedInfo.columnKey === 'bobot' && sortedInfo.order,
              render: (value, row, index) => renderColumn("bobot", value, row, index)
          }, {
              title:`${monthText} ${this.state.paramtahun}`,
              children: [
                {
                  title: "Ratio",
                  dataIndex: "ratio",
                  key:"ratio",
                  width: '11%',
                  className: "editable-row",
                  sorter:(a, b) => a.ratio.localeCompare(b.ratio),
                  sortOrder:sortedInfo.columnKey === 'ratio' && sortedInfo.order,
                  render: (value, row, index) => renderColumn("ratio", value, row, index)
                },
                {
                    title:"Risk",
                    dataIndex:"risk_rate",
                    key:"risk_rate",
                    width: '11%',
                    className: "editable-row",
                    sorter:(a, b) => a.risk_rate.localeCompare(b.risk_rate),
                    sortOrder:sortedInfo.columnKey === 'risk_rate' && sortedInfo.order,
                    render: (value, row, index) => renderColumn("risk_rate", value, row, index)
                },
                {
                    title:"Score",
                    dataIndex:"score",
                    key:"score",
                    width: '11%',
                    className: "editable-row",
                    sorter:(a, b) => a.score.localeCompare(b.score),
                    sortOrder:sortedInfo.columnKey === 'score' && sortedInfo.order,
                    render: (value, row, index) => renderColumn("score", value, row, index)
                },
                {
                    title:"Bobot Score",
                    dataIndex:"bobot_score",
                    key:"bobot_score",
                    width: '11%',
                    className: "editable-row",
                    render: (value, row, index) => renderColumn("bobot_score", value, row, index)
                }
              ]
          }
        ];

        return (
            <Card title={`Data Laporan Risiko Inheren - ${this.state.risk_name} : ${monthText} ${this.state.paramtahun} (${this.state.version_name})`}>
                {
                  addbutton ? <h1>...To be advised</h1> :
                    <>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={12} lg={12}>
                                <Button className="ant-btn ant-btn-danger" onClick={this.onClickCancel}>Back Filter</Button>
                                <Button className="ant-btn ant-btn-primary" >Generate Report</Button>
                              </Grid>
                            </Grid>
                            <Spin tip="Loading..." spinning={loading}>
                                <Table dataSource={datatable} className="gx-table-responsive" onChange={this.handleChange} rowKey="id" columns={columns}
                                       pagination={false}
                                       size="small"
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
                                            this.props.deleteParameterManual({
                                              name: name,
                                              induk_id: induk_id,
                                              tahun: tahun,
                                              token: token})
                                            NotificationManager.success("Data has deleted.", "Success !!");
                                        }}
                                        onCancel={this.onCancelDelete}
                            >
                                <IntlMessages id="sweetAlerts.youWillNotAble"/>
                            </SweetAlert>
                        </>
                }
                <HistoryCalculation
                  visible={this.state.visible}
                  handleOk={this.handleOk}
                  handleCancel={this.handleCancel}
                  loading={this.state.loading}
                  dataoptions={this.state.inputdataoptions}
                  onChange={this.onChangeAnswer}
                  value={this.state.answervalue}
                />
                <NotificationContainer/>
            </Card>
        );
    }
}

const mapStateToProps = ({
  auth,
  risikoinherenreport
}) => {
    const {token} = auth;
    const {risikoinherenreportdata} = risikoinherenreport;
    return {
      token,
      risikoinherenreportdata
    };
};

export default connect(mapStateToProps, {
  getAllParameterManualTable,
  fetchAllRisikoInherenReport,
  fetchAllRisikoInherenInputKualitatif,
  addRisikoInherenInputKualitatif
})(TableKpmr);
