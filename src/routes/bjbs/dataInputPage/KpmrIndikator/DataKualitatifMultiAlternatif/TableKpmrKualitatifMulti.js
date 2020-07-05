import React from "react";
import {Button, Card, Table, Spin, Pagination, Tag, } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";
// import SaveRisikoInherenKuantitatif from "./SaveRisikoInherenKuantitatif";
// import EditParameterManual from "./EditParameterManual";
import AnswerOptions from "./AnswerOptions";

import {
  getAllParameterManualTable,
  countAllParameterManual,
  deleteParameterManual
} from "../../../../../appRedux/actions/Parametermanual";
import {
  fetchAllMasterVersion,
  fetchAllRisikoInherenInputKualitatif,
  addRisikoInherenInputKualitatif,
  resetAddRisikoInherenInputKualitatif
} from "../../../../../appRedux/actions/index";

import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";

class TableKpmrKualitatifMulti extends  React.Component{
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
            risk_name : props.fetchdata ? props.fetchdata[0].risk_name : '',
            loading: false,
            visible: false,
            inputdataoptions: [],
            answervalue: 0,
            risikoinhereninputkualitatifdata: []
        }
    }

    componentDidMount(){
        this.props.fetchAllMasterVersion({token: this.props.token});
        this.props.fetchAllRisikoInherenInputKualitatif({token: this.props.token, searchData: {
          jenis: 'KPMR',
          version_id: this.state.version_id,
          jenis_nilai_id: 4,
          bulan: this.state.parambulan,
          tahun: this.state.paramtahun,
          risk_id: this.state.paramrisk_id
        }});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            statusallparametermanualtable : nextProps.statusallparametermanualtable,
            statusallparametermanual : nextProps.statusallparametermanual,
            masterversionsdata: nextProps.masterversionsdata,
            risikoinhereninputkualitatifdata: nextProps.risikoinhereninputkualitatifdata
        });

        // notif
        switch (nextProps.addrisikoinhereninputkualitatifresult.statusCode) {
          case 200:
          case 201:
          case 400:
            this.clickAddSuccessButton(
              nextProps.addrisikoinhereninputkualitatifresult.statusCode,
              nextProps.addrisikoinhereninputkualitatifresult.message
            );
            // reset all state
            this.props.resetAddRisikoInherenInputKualitatif();
            break;
          default:

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
          risikoinhereninputkualitatifdata
        } = this.state;
        sortedInfo = sortedInfo || {};

        // const dataDummy = [
        //   {
        //     id: 1321,
        //     risk_id: 45,
        //     name: "Karakteristik aktivitas bisnis yang berdampak pada risiko benchmark suku bunga dalam banking book dan karakteristik nasabah utama Bank",
        //     bulan: 6,
        //     tahun: 2020,
        //     value: "M",
        //     risk_name : "Risiko Kredit",
        //     pr_low_name : "Deposito spesial nisbah ≤ 20% dari total deposito non bank",
        //     pr_lowtomod_name : "Deposito spesial nisbah > 20% sd 40% dari total deposito non bank",
        //     pr_mod_name : "Deposito spesial nisbah > 40% sd 60% dari total deposito non bank",
        //     pr_modtohigh_name : "Deposito spesial nisbah > 60% sd 80% dari total deposito non bank",
        //     pr_high_name : "Deposito spesial nisbah > 80% dari total deposito non bank",
        //     pr_low : 248,
        //     pr_lowtomod : 249,
        //     pr_mod : 250,
        //     pr_modtohigh : 251,
        //     pr_high : 255,
        //   },
        //   {
        //     id: 1322,
        //     risk_id: 45,
        //     name: "Posisi pasar Bank dalam industri",
        //     bulan: 6,
        //     tahun: 2020,
        //     value: "LTM",
        //     risk_name : "Risiko Kredit",
        //     pr_low_name : "Pertumbuhan Dana Murah > Pertumbuhan Perbankan kompetitor",
        //     pr_lowtomod_name : "Pertumbuhan Dana Murah = Pertumbuhan Perbankan Kompetitor",
        //     pr_mod_name : "Pertumbuhan Dana Murah < Pertumbuhan Perbankan Kompetitor",
        //     pr_modtohigh_name : "Dana Murah Bank mengalami penurunan namun masih lebih baik dibandingkan penurunan perbankan kompetitor",
        //     pr_high_name : "Dana Murah Bank mengalami penurunan dan berada di bawah penurunan perbankan nasional",
        //     pr_low : 248,
        //     pr_lowtomod : 249,
        //     pr_mod : 250,
        //     pr_modtohigh : 251,
        //     pr_high : 255,
        //   },
        //   {
        //     id: 1323,
        //     risk_id: 45,
        //     name: "Karakteristik Nasabah yang sensitif terhadap risiko suku bunga",
        //     bulan: 6,
        //     tahun: 2020,
        //     value: "TBA",
        //     risk_name : "Risiko Kredit",
        //     pr_low_name : "Pertumbuhan Dana Murah > Pertumbuhan Perbankan kompetitor",
        //     pr_lowtomod_name : "Pertumbuhan Dana Murah = Pertumbuhan Perbankan Kompetitor",
        //     pr_mod_name : "Pertumbuhan Dana Murah < Pertumbuhan Perbankan Kompetitor",
        //     pr_modtohigh_name : "Dana Murah Bank mengalami penurunan namun masih lebih baik dibandingkan penurunan perbankan kompetitor",
        //     pr_high_name : "Dana Murah Bank mengalami penurunan dan berada di bawah penurunan perbankan nasional",
        //     pr_low : 248,
        //     pr_lowtomod : 249,
        //     pr_mod : 250,
        //     pr_modtohigh : 251,
        //     pr_high : 255,
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
            title:"Nama Parameter",
            dataIndex:"name",
            key:"name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
        }, {
            title:"Nilai",
            dataIndex:"risk_rate",
            key:"risk_rate",
            sorter:(a, b) => a.risk_rate.localeCompare(b.risk_rate),
            sortOrder:sortedInfo.columnKey === 'risk_rate' && sortedInfo.order,
            render: value => (
              <>
                {
                  <Tag
                    color={value === 'H' ? 'red' : value === "MTH" ? 'orange' : value === "M" ? "yellow" : value === "LTM" ? 'green' : value === "L" ? "blue" : "black" }
                    key={value}
                  >
                    {
                       value === 'H' ? 'Unsatisfactory' :
                       value === "MTH" ? 'Marginal' :
                       value === "M" ? "Fair" :
                       value === "LTM" ? 'Satisfactory' :
                       value === "L" ? "Strong" : "TBA"
                     }
                  </Tag>
                }
              </>
            )
        }, {
            title:"Action",
            key:"action",
            render:(text, record) => (
                <span>
                    <span className="gx-link" onClick={() => {
                      this.showModal();
                      console.log("***ON CLICK IN TABLE : ");
                      console.log(text);
                      this.setState({
                        inputdataoptions: []
                      })

                      this.setState({
                        answervalue: text.value.toString(),
                        ingredients_id: text.ingredients_id,
                        inputdataoptions: [
                          {label: text.pr_low_name, value: text.pr_low},
                          {label: text.pr_lowtomod_name, value: text.pr_lowtomod},
                          {label: text.pr_mod_name, value: text.pr_mod},
                          {label: text.pr_modtohigh_name, value: text.pr_modtohigh},
                          {label: text.pr_high_name, value: text.pr_high}
                        ]
                      });
                      console.log(this.state.inputdataoptions);
                    }}>Input Nilai</span>
                </span>
            )
        }];

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

        return (
            <Card title={`Data KPMR Kualitatif Multil Alternatif - ${this.state.risk_name} : ${monthText} ${this.state.paramtahun} (${this.state.version_name})`}>
                {
                  addbutton ? <h1>...To be advised</h1> :
                    <>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={12} lg={12}>
                                <Button className="ant-btn ant-btn-danger" onClick={this.onClickCancel}>Back Filter</Button>
                              </Grid>
                            </Grid>
                            <Spin tip="Loading..." spinning={loading}>
                                <Table dataSource={risikoinhereninputkualitatifdata} className="gx-table-responsive" onChange={this.handleChange} rowKey="id" columns={columns}
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
                <AnswerOptions
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
  parametermanual,
  masterversion,
  risikoinhereninputkualitatif
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
    const {masterversionsdata} = masterversion;
    const {
      risikoinhereninputkualitatifdata,
      addrisikoinhereninputkualitatifresult
    } = risikoinhereninputkualitatif;
    return {
      token,
      getallparametermanualtable,
      postparametermanual,
      statusallparametermanualtable,
      countallparametermanual,
      statusallparametermanual,
      deleteparametermanual,
      masterversionsdata,
      risikoinhereninputkualitatifdata,
      addrisikoinhereninputkualitatifresult
    };
};

export default connect(mapStateToProps, {
  getAllParameterManualTable,
  countAllParameterManual,
  deleteParameterManual,
  fetchAllMasterVersion,
  fetchAllRisikoInherenInputKualitatif,
  addRisikoInherenInputKualitatif,
  resetAddRisikoInherenInputKualitatif
})(TableKpmrKualitatifMulti);
