import React from "react";
import {
  Button,
  Card,
  Table,
  Spin,
  Pagination,
  Tag,
  Popconfirm
} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";
// import SaveRisikoInherenKuantitatif from "./SaveRisikoInherenKuantitatif";
// import EditParameterManual from "./EditParameterManual";
// import AnswerOptions from "./AnswerOptions";

import {
  getAllParameterManualTable,
  countAllParameterManual,
  deleteParameterManual
} from "../../../../../appRedux/actions/Parametermanual";
import {
  fetchAllMasterVersion,
  fetchAllRisikoInherenInputKualitatifDual,
  addRisikoInherenInputKualitatifDual,
  resetAddRisikoInherenInputKualitatifDual
} from "../../../../../appRedux/actions/index";

import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

class TableRisikoInherenKualitatifDual extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sortedInfo: null,
            warning:false,
            deletestatus:'',
            addbutton: false,
            masterversionsdata: [],
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
            loading: false,
            visible: false,
            inputdataoptions: [],
            answervalue: 0,
            datatable: [],
            dataToBeInput: {}
        }
    }

    componentDidMount(){
        this.props.fetchAllRisikoInherenInputKualitatifDual({
          token: this.props.token,
          searchData: {
            jenis: 'PR',
            version_id: this.state.version_id,
            id_jenis_nilai: 21,
            bulan: this.state.parambulan,
            tahun: this.state.paramtahun,
            risk_id: this.state.paramrisk_id
          }
        })
        this.props.fetchAllMasterVersion({token: this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            statusallparametermanualtable : nextProps.statusallparametermanualtable,
            statusallparametermanual : nextProps.statusallparametermanual,
            masterversionsdata: nextProps.masterversionsdata,
            datatable : nextProps.risikoinhereninputkualitatifdualdata
        });


        switch(nextProps.addrisikoinhereninputkualitatifdualresult.statusCode) {
          case 200:
          case 201:
          case 400:
            this.clickAddSuccessButton(
              nextProps.addrisikoinhereninputkualitatifdualresult.statusCode,
              nextProps.addrisikoinhereninputkualitatifdualresult.message
            );
            // reset all state
            this.props.resetAddRisikoInherenInputKualitatifDual();
            break;
          default:
            break;
        }

        if(nextProps.deleteparametermanual === 200){
            this.setState({
                loading:false,
                deletestatus: nextProps.deleteparametermanual
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.deletestatus !== this.state.deletestatus){
            this.onRefresh();
            this.setState({
                deletestatus : nextProps.deleteparametermanual,
            });
        }
        return true;
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
            addbutton: false,
            dataToBeInput: {}
        });

        if (status === 201 || status === 200){
            this.onRefresh();
            NotificationManager.success("Data has saved.", `${message}`);
        } else {
            this.onRefresh();
            NotificationManager.error("Data failed to save.", `${message}`);
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
        // this.props.getAllParameterManualTable({page:page, token:this.props.token, name:this.state.paramname,
        //     risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
        //     pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high,
        //     bobot:this.state.parambobot
        // });
        // this.props.countAllParameterManual({token:this.props.token, name:this.state.paramname,
        //     risk_id:this.state.paramrisk_id,bulan:this.state.parambulan,tahun : this.state.paramtahun,pr_low:this.state.parampr_low,
        //     pr_lowtomod:this.state.parampr_lowtomod,pr_mod:this.state.parampr_mod,pr_modtohigh:this.state.parampr_modtohigh,pr_high:this.state.parampr_high,
        //     bobot:this.state.parambobot
        // });
    };

    onRefresh = () => {
        this.setState({
            loading:true,
            paging:1
        });

        this.props.fetchAllRisikoInherenInputKualitatifDual({
          token: this.props.token,
          searchData: {
            jenis: 'PR',
            version_id: this.state.version_id,
            id_jenis_nilai: 21,
            bulan: this.state.parambulan,
            tahun: this.state.paramtahun,
            risk_id: this.state.paramrisk_id
          }
        });

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
      this.setState({loading: true});
      setTimeout(() => {
        this.setState({loading: false, visible: false});
      }, 3000);
    };
    handleCancel = () => {
      this.setState({visible: false});
    };

    // handle radio button
    onChangeAnswer = (e) => {
      console.log('radio1 checked', e.target.value);
      this.setState({
        answervalue: e.target.value,
      });
    };


    confirm = () => {
      console.log("Click on Yes");
      this.props.addRisikoInherenInputKualitatifDual(this.props.token, {
        id_indikator: this.state.dataToBeInput.id_indikator,
        id_jenis_nilai: this.state.dataToBeInput.id_jenis_nilai,
      	value: 1,
      	bulan: this.state.dataToBeInput.bulan,
      	tahun: this.state.dataToBeInput.tahun,
      	parameter_version_id: this.state.dataToBeInput.parameter_version_id
      });
    }

    cancel = () => {
      console.log("Click No");
      this.props.addRisikoInherenInputKualitatifDual(this.props.token, {
        id_indikator: this.state.dataToBeInput.id_indikator,
        id_jenis_nilai: this.state.dataToBeInput.id_jenis_nilai,
      	value: 0,
      	bulan: this.state.dataToBeInput.bulan,
      	tahun: this.state.dataToBeInput.tahun,
      	parameter_version_id: this.state.dataToBeInput.parameter_version_id
      });
    }

    render() {
        const {token} = this.props;
        let {
          sortedInfo,
          name,
          tahun,
          induk_id,
          warning,
          loading,
          addbutton,
          paging,
          lengthdata,
          parambulan,
          datatable
        } = this.state;
        sortedInfo = sortedInfo || {};

        // const dataDummy = [
        //   {
        //     id: 5,
        //     ratio_indikator_id: 242,
        //     version_id: 1,
        //     ratio_indikator: {
        //       created_at: "2020-06-21 11:14:58",
        //       id: 242,
        //       name: "PR Testing kualitatif",
        //       description: "testing",
        //       updated_at: null,
        //       deleted_at: null,
        //       jenis: "PR",
        //       created_by: "s0581",
        //       id_jenis_nilai: 4
        //     },
        //     bulan: 10,
        //     tahun: 2020,
        //     value: 0
        //   },
        //
        //   {
        //     id: 7,
        //     ratio_indikator_id: 247,
        //     version_id: 1,
        //     ratio_indikator: {
        //       created_at: "2020-06-21 23:42:33",
        //       id: 247,
        //       name: "Test",
        //       description: "-",
        //       updated_at: null,
        //       deleted_at: null,
        //       jenis: "PR",
        //       created_by: "s0581",
        //       id_jenis_nilai: 4
        //     },
        //     bulan: 10,
        //     tahun: 2020,
        //     value: null
        //   },
        //
        //   {
        //     id: 9,
        //     ratio_indikator_id: 248,
        //     version_id: 1,
        //     ratio_indikator: {
        //       created_at: "2020-06-21 23:43:06",
        //       id: 248,
        //       name: "Test",
        //       description: "-",
        //       updated_at: null,
        //       deleted_at: null,
        //       jenis: "PR",
        //       created_by: "s0581",
        //       id_jenis_nilai: 4
        //     },
        //     bulan: 10,
        //     tahun: 2020,
        //     value: 1
        //   }
        // ]

        const columns = [
        {
            title:"#",
            dataIndex:"id",
            key:"id",
            sorter:(a, b) => a.id-b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        }, {
            title:"Nama Indikator",
            dataIndex:"ratio_indikator.name",
            key:"ratio_indikator.name",
            sorter: (a, b) => a.ratio_indikator.name.localeCompare(b.ratio_indikator.name),
            sortOrder: sortedInfo.columnKey === 'ratio_indikator.name' && sortedInfo.order
        }, {
            title:"Nilai",
            dataIndex:"value",
            key:"value",
            sorter:(a, b) => a.value.localeCompare(b.value),
            sortOrder:sortedInfo.columnKey === 'tahun' && sortedInfo.order,
            render: value => (
              <>
                {
                  <Tag
                    color={value === 1 ? 'green' : value === 0 ? "red" : "black"}
                    key={value}
                  >
                    {value === 1 ? 'ya' : value === 0 ? 'tidak' : 'tba'}
                  </Tag>
                }
              </>
            )
        }, {
            title:"Action",
            key:"action",
            render:(text, record) => (
                <>
                  <Popconfirm
                  placement="bottom"
                  title={"Silahkan pilih salah satu dari jawaban di bawah"}
                  onConfirm={this.confirm}
                  okText="Ya"
                  cancelText="Tidak"
                  onCancel={this.cancel}
                  onClick={() => {
                    console.log("***ON CLICK IN TABLE : ");
                    console.log(text);
                    this.setState({
                      dataToBeInput: {
                        id_indikator:text.ratio_indikator.id,
                      	id_jenis_nilai: 21,
                      	value:0,
                      	bulan:this.state.parambulan,
                      	tahun: parseInt(this.state.paramtahun),
                      	parameter_version_id: this.state.version_id
                      }
                    });
                  }}
                >
                    <span>
                      <span className="gx-link"
                      >Input Nilai</span>
                    </span>
                  </Popconfirm>
                </>
            )
        }];

        var monthText = '';
        switch(parambulan){
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

        return (
            <Card title={`Data Risiko Inheren Kualitatif Multil Alternatif : ${monthText} ${this.state.paramtahun} (${this.state.version_name})`}>
                {
                  addbutton ? <h1>...To be advised</h1> :
                    <>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={12} lg={12}>
                                <Button className="ant-btn ant-btn-danger" onClick={this.onClickCancel}>Back Filter</Button>

                              </Grid>
                            </Grid>
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

                <NotificationContainer/>
            </Card>
        );
    }
}

const mapStateToProps = ({
  auth,
  parametermanual,
  masterversion,
  risikoinhereninputkualitatifdual
}) => {
    const {token} = auth;
    const {
      getallparametermanualtable,
      postparametermanual,
      statusallparametermanualtable,
      countallparametermanual,
      statusallparametermanual,
      deleteparametermanual
    } = parametermanual;
    const {
      addrisikoinhereninputkualitatifdualresult
    } = risikoinhereninputkualitatifdual;
    const {masterversionsdata} = masterversion;
    const {
      risikoinhereninputkualitatifdualdata
    } = risikoinhereninputkualitatifdual;
    return {
      token,
      getallparametermanualtable,
      postparametermanual,
      statusallparametermanualtable,
      countallparametermanual,
      statusallparametermanual,
      deleteparametermanual,
      masterversionsdata,
      risikoinhereninputkualitatifdualdata,
      addrisikoinhereninputkualitatifdualresult
    };
};

export default connect(mapStateToProps, {
  getAllParameterManualTable,
  countAllParameterManual,
  deleteParameterManual,
  fetchAllMasterVersion,
  fetchAllRisikoInherenInputKualitatifDual,
  addRisikoInherenInputKualitatifDual,
  resetAddRisikoInherenInputKualitatifDual
})(TableRisikoInherenKualitatifDual);
