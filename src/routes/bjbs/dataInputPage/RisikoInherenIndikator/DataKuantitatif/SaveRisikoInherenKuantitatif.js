import React from "react";
import {Button, Input, Form, Card , InputNumber} from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  fetchAllRisikoInherenInputKuantitatif,
  addRisikoInherenInputKuantitatif,
  resetAddRisikoInherenInputKuantitatif
} from "../../../../../appRedux/actions/index";
import {NotificationContainer, NotificationManager} from "react-notifications";
import SweetAlerts from "react-bootstrap-sweetalert";
// import local css
import './mystyle.css';

const FormItem = Form.Item;

class SaveRisikoInherenKuantitatif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: false,
            datarisikoinhereninputkuantitatif : [],
            paramrisk_id : props.fetchdata ? props.fetchdata[0].risks : 0,
            parambulan : props.fetchdata ? props.fetchdata[0].ismonth : 0,
            paramtahun : props.fetchdata ? props.fetchdata[0].isyear : 0,
            version_id : props.fetchdata ? props.fetchdata[0].version_id : 0,
            version_name: props.fetchdata ? props.fetchdata[0].version_name : '',
            risk_name : props.fetchdata ? props.fetchdata[0].risk_name : '',

        }
    }

    componentDidMount(){
      this.props.fetchAllRisikoInherenInputKuantitatif({token: this.props.token, searchData: {
        bulan: this.state.parambulan,
        tahun: this.state.paramtahun,
        jenis: 'PR',
        version_id: this.state.version_id,
        id_jenis_nilai: 1
      }})
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          datarisikoinhereninputkuantitatif: nextProps.risikoinhereninputkuantitatifdata
        });

        switch(nextProps.addrisikoinhereninputkuantitatifresult.statusCode){
          case 200:
          case 201:
            NotificationManager.success(nextProps.addrisikoinhereninputkuantitatifresult.message, "Success !!");
            // reset all state
            this.props.resetAddRisikoInherenInputKuantitatif();
            break;
          case 400:
            NotificationManager.error(nextProps.addrisikoinhereninputkuantitatifresult.message, "Success !!");
            // reset all state
            this.props.resetAddRisikoInherenInputKuantitatif();
            break;
          default:
            break;
        }
    }


    onClickCancel = () => {
        this.props.clickCancelFilterButton();
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 20,
            },
            wrapperCol: {
                xs: 24,
                sm: 4,
            },
        };

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

        const {
            basic,
            datarisikoinhereninputkuantitatif
        } = this.state;
        const {getFieldDecorator} = this.props.form;

        // const dataDummy = [
        //   {
        //     id: 1321,
        //     risk_id: 45,
        //     name: "Agunan yang diambil alih",
        //     bulan: 6,
        //     tahun: 2020,
        //     parameter_faktor: "K 20 - Sandi LBUSB kode 218 atau cross check ke P3 -- AYDA",
        //     value: "13,847"
        //   },
        //   {
        //     id: 1322,
        //     risk_id: 45,
        //     name: "Total Pembiayaan Non Bank",
        //     bulan: 6,
        //     tahun: 2020,
        //     parameter_faktor: "Hasil Penjumlahan dari Kolektibilitas",
        //     value: "20,628,243,896"
        //   }
        // ]

        return (
          <Card title={`Data Risiko Inheren Kuantitatif : ${monthText} ${this.state.paramtahun} (${this.state.version_name})`}>
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();

                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                          let listOfRatioIndikatorId = Object.getOwnPropertyNames(values);
                          let listOfValues = Object.values(values);

                          // make the object to submit
                          let toSubmitBody = {};
                          let toSubmitData = {};
                          let ratio_indikator_data = [];

                          // looping to parsing ratio_indikator_data
                          for(let i=0;i<listOfValues.length;i++){
                            toSubmitBody.id_indikator = parseInt(listOfRatioIndikatorId[i]);
                            toSubmitBody.value = parseInt(listOfValues[i]);
                            ratio_indikator_data.push(toSubmitBody);
                            toSubmitBody = {};
                          }

                          // compile all the data
                          toSubmitData.id_jenis_nilai = 1;
                          toSubmitData.bulan = parseInt(this.state.parambulan);
                          toSubmitData.tahun = parseInt(this.state.paramtahun);
                          toSubmitData.parameter_version_id = this.state.version_id;
                          toSubmitData.data_ratio_indikator = ratio_indikator_data;

                          this.props.addRisikoInherenInputKuantitatif(this.props.token, toSubmitData)
                        }
                    });
                }}>

                    {
                      datarisikoinhereninputkuantitatif.map((prop, index) => {
                        return (
                          <FormItem {...formItemLayout} label={prop.ratio_indikator.name}>
                              {getFieldDecorator(`${prop.ratio_indikator.id}`, {
                                  initialValue: prop.value
                              })(
                                <InputNumber
                                  id={index}
                                  className="w-100"
                                  formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                              )}
                          </FormItem>
                        )
                      })

                    }

                    <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                        <Button onClick={this.onClickCancel}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>

                    <SweetAlerts show={basic}
                                 customClass="gx-sweet-alert-top-space"
                                 title={"Input must be 0-100 %"}
                                 onConfirm={()=>{
                                     this.setState({
                                         basic: false,
                                     })
                    }}/>

                </Form>
            </>
            <NotificationContainer/>
          </Card>
        );
    }

}

const WrappedSaveRisikoInherenKuantitatif = Form.create()(SaveRisikoInherenKuantitatif);

const mapStateToProps = ({
  auth,
  risikoinhereninputkuantitatif
}) => {
    const {token} = auth;
    const {
      risikoinhereninputkuantitatifdata,
      addrisikoinhereninputkuantitatifresult
    } = risikoinhereninputkuantitatif;
    return {
      token,
      risikoinhereninputkuantitatifdata,
      addrisikoinhereninputkuantitatifresult
    }
};

export default connect(mapStateToProps, {
  fetchAllRisikoInherenInputKuantitatif,
  addRisikoInherenInputKuantitatif,
  resetAddRisikoInherenInputKuantitatif
})(WrappedSaveRisikoInherenKuantitatif);
