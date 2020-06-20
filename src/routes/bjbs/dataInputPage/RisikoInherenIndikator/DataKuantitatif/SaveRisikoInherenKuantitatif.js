import React from "react";
import {Button, Input, Form, Select, Card } from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  getAllRisks,
  getAllRatioIndikator,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikatorForParamterKualitatif,
  addParameterKuantitatif,
  resetAddParameterKualitatif,
  fetchAllIngredients,
  addParameterKualitatif,
  fetchAllMasterVersion,
  getAllFaktorParameterDataOption
} from "../../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";
import Grid from "@material-ui/core/Grid";

const FormItem = Form.Item;
const Option = Select.Option;

const operatorOption = [
    {label:"Tambah (+)", value:"+"}
];


class SaveRisikoInherenKuantitatif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            basic: false,
            dataoptionsratioindikator : [],
            ratioindikatorcalculation: [],
            dataoptionsparameterfaktor: [],
            paramrisk_id : props.fetchdata ? props.fetchdata[0].risks : 0,
            parambulan : props.fetchdata ? props.fetchdata[0].ismonth : 0,
            paramtahun : props.fetchdata ? props.fetchdata[0].isyear : 0,
            //state value
            numChildren: 0,
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
        this.props.jenisNilaiParam({token:this.props.token});
        this.props.getAllRatioIndikatorForParamterKualitatif({token:this.props.token, jenis: "PR"});
        this.props.fetchAllIngredients({token: this.props.token, searchData: {
          jenis: "PR",
          jenis_nilai_id: 21
        }});
        this.props.getAllRatioIndikator({token:this.props.token});
        this.props.fetchAllMasterVersion({token: this.props.token});
        this.props.getAllFaktorParameterDataOption({token: this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionsratioindikator : nextProps.getallratioindikator,
            dataoptionsratioindikatorkualitatif: nextProps.getallratioindikatorkualitatif,
            dataoptionsingredientsdata: nextProps.ingredientsdata,
            dataoptionsmasterversion : nextProps.masterversionsdata,
            dataoptionsparameterfaktor : nextProps.getallparameterfaktor
        });

        switch(nextProps.addparameterkualitatifresult.statusCode){
          case 200:
          case 201:
          case 400:
            this.props.clickAddSuccessButton(
              nextProps.addparameterkualitatifresult.statusCode,
              nextProps.addparameterkualitatifresult.message
            );
            // reset all state
            this.props.resetAddParameterKualitatif();
            break;
          default:
            break;
        }
    }

    onAddChild = () => {

      this.setState(prevState => ({
        ...prevState,
        numChildren: this.state.numChildren+1
      }));

      // data for calculation
      let dataBody = {};
      dataBody.ratio_indikator_id = "";
      dataBody.seq = this.state.numChildren;
      dataBody.operations = "+";
      this.state.ratioindikatorcalculation.push(dataBody);
      dataBody = {};
      console.log(this.state.ratioindikatorcalculation)
    }

    onRemoveChild = () => {
      if(this.state.numChildren > 0){
        this.setState(prevState => ({
          ...prevState,
          numChildren: this.state.numChildren - 1
        }));

        // data for calculation
        this.state.ratioindikatorcalculation.pop();
      }
    }

    // ==== ON CHANGE INIT RATIO INDIKATOR ====
    onAddInitRIVariableType = (value) => {
      this.setState(prevState => ({
        initialratioindikator: {
          ...prevState.initialratioindikator,
          operations: value
        }
      }));
    }

    onAddInitRIIdIndikator = (value) => {
      this.setState(prevState => ({
        initialratioindikator: {
          ...prevState.initialratioindikator,
          ratio_indikator_id: value
        }
      }));
    }

    // ==== /ON CHANGE INIT RATIO INDIKATOR ====

    handleChangeOperator = (value, i) => {

        let index = parseInt(i._owner.index);
        // update value in object
        // this.state.ratioindikatorcalculation[index].operations = value;

        const newArray = Array.from(this.state.ratioindikatorcalculation);
        newArray[index].operations = "+";

        this.setState(prevState => ({
          ...prevState,
          ratioindikatorcalculations: newArray
        }));
        console.log(this.state.ratioindikatorcalculations);

    }

    handleChangeRatioIndikator = (value, i) => {
        let index = parseInt(i._owner.index);
        // update value in object
        // this.state.ratioindikatorcalculation[index].ratio_indikator_id = value;

        const newArray = Array.from(this.state.ratioindikatorcalculation);
        newArray[index].ratio_indikator_id = value;

        this.setState(prevState => ({
          ...prevState,
          ratioindikatorcalculations: newArray
        }));

        console.log(this.state.ratioindikatorcalculations);

    }

    // function array master list
    handleChangeMultipleSelect = (value, label) => {
      let masterversionelement = {};
      let masterlistarray = [];

      for(let i=0;i<value.length;i++){
        masterversionelement.id = label[i].props.value;
        masterversionelement.version_name = label[i].props.children;
        masterlistarray.push(masterversionelement);
        masterversionelement = {};
      }

      this.setState(prevState => ({
        ...prevState,
        masterversionlist: masterlistarray
      }));

      console.log("Master version list array")
      console.log(this.state.masterversionlist);
    }

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
            dataoptionsratioindikator,
            numChildren
        } = this.state;
        const {getFieldDecorator} = this.props.form;

        // handle children of element for counting
        const children = [];

        const dataDummy = [
          {
            id: 1321,
            risk_id: 45,
            name: "Agunan yang diambil alih",
            bulan: 6,
            tahun: 2020,
            parameter_faktor: "K 20 - Sandi LBUSB kode 218 atau cross check ke P3 -- AYDA",
            value: "13,847"
          },
          {
            id: 1322,
            risk_id: 45,
            name: "Total Pembiayaan Non Bank",
            bulan: 6,
            tahun: 2020,
            parameter_faktor: "Hasil Penjumlahan dari Kolektibilitas",
            value: "20,628,243,896"
          }
        ]

        //looping all children
        for (var i = 0; i < numChildren; i++) {
          children.push(
            <ChildComponent
              indikatordata={dataoptionsratioindikator}
              key={i}
              id_operator_arithmetic={"operator_arithmetic_"+i}
              handleChangeRatioIndikator={this.handleChangeRatioIndikator}
              handleChangeOperator={this.handleChangeOperator}
              id_ratio_indikator={"ratio_indikator_"+i} />);
        };

        return (
          <Card title={"Data Risiko Inheren Kuantitatif "+monthText+" "+this.state.paramtahun}>
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();

                    // if any ratio indikator formula for level 2 or more
                    let ratioIndikatorFormula = [];
                    // check if any ratio indikator calculation
                    if(this.state.ratioindikatorcalculation.length > 0){
                      // loop al ratio indikator calculation
                      for(let i=0;i<this.state.ratioindikatorcalculation.length;i++){
                        ratioIndikatorFormula.push(this.state.ratioindikatorcalculation[i]);
                      }
                    }

                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                          console.log("Values save parameter kualitatif : ");
                          values.masterversiondata = this.state.masterversionlist;
                          values.ratio_indikator_formula = ratioIndikatorFormula;
                          console.log(values);
                          // this.props.addParameterKualitatif(values.token, {
                          //   risk_id: values.risk_id,
                          //   name: values.name,
                          //   level: values.level,
                          //   induk_id: values.peringkatrisiko,
                          //   penomoran: values.penomoran,
                          //   pr_low: values.low,
                          //   pr_lowtomod: values.lowtomoderate,
                          //   pr_mod: values.moderate,
                          //   pr_modtohigh: values.moderatetohigh,
                          //   pr_high: values.high,
                          //   bobot: values.bobot,
                          //   id_indikator_pembilang: 0,
                          //   id_indikator_penyebut: 0,
                          //   jenis_nilai_id: 4
                          // });
                        }
                    });
                }}>

                    {
                      dataDummy.map((prop, index) => {
                        return (
                          <FormItem {...formItemLayout} label={prop.name}>
                              {getFieldDecorator(prop.name, {
                                  initialValue: prop.value,
                                  rules: [{
                                      required: true, message: 'Please input name field.',
                                  }],
                              })(
                                  <Input id={prop.name} placeholder="Input Indikator"
                                         />
                              )}
                          </FormItem>
                        )
                      })

                    }

                    <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                        <Button onClick={this.props.clickCancelAddButton}>Cancel</Button>
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
          </Card>
        );
    }

}

const ChildComponent = props => (
  <>
    <Grid container spacing={1}>
      <Grid item xs={12} md={12} lg={2}>
        <Select id={props.id_operator_arithmetic}
                showSearch
                placeholder="Select Operator Arithmetic"
                optionFilterProp="children"
                style={{marginBottom: 10}}
                onChange={props.handleChangeOperator}
                defaultValue="+"
        >
            {
                operatorOption.map((prop, index) => {
                    var value = prop.value;
                    var label = prop.label;
                    return (
                        <Option key={props.key} value={value} disabled>{label}</Option>
                    )
                })
            }
        </Select>
      </Grid>
      <Grid item xs={12} md={12} lg={10}>
        <Select id={props.id_ratio_indikator}
                showSearch
                placeholder="Select Ratio Indikator"
                optionFilterProp="children"
                style={{marginBottom: 10}}
                onChange={props.handleChangeRatioIndikator}
        >
            <Option value="" disabled>Select Ratio Indikator</Option>
            {
                props.indikatordata.map((prop, index) => {
                    var value = prop.id;
                    var label = prop.name;
                    return (
                        <Option key={props.key} value={value}>{label}</Option>
                    )
                })
            }
        </Select>
      </Grid>
    </Grid>
  </>

)

const WrappedSaveRisikoInherenKuantitatif = Form.create()(SaveRisikoInherenKuantitatif);

const mapStateToProps = ({
  auth,
  jenisrisiko,
  peringkatrisiko,
  masterparameter,
  ratioindikator,
  parameterkuantitatif,
  parameterkualitatif,
  ingredients,
  masterversion,
  parameterfaktor
}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    const {getallratioindikator, getallratioindikatorkualitatif} = ratioindikator;
    const {addparameterkuantitatifresult} = parameterkuantitatif;
    const {parameterkualitatifdata, addparameterkualitatifresult} = parameterkualitatif;
    const {ingredientsdata} = ingredients;
    const {masterversionsdata} = masterversion;
    const {getallparameterfaktor} = parameterfaktor;
    return {
      token,
      getallrisks,
      getallperingkatrisiko,
      jenisnilaiparam,
      getallratioindikator,
      addparameterkuantitatifresult,
      getallratioindikatorkualitatif,
      parameterkualitatifdata,
      ingredientsdata,
      masterversionsdata,
      addparameterkualitatifresult,
      getallparameterfaktor
    }
};

export default connect(mapStateToProps, {
  getAllRisks,
  getAllRatioIndikator,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikatorForParamterKualitatif,
  addParameterKuantitatif,
  resetAddParameterKualitatif,
  fetchAllIngredients,
  addParameterKualitatif,
  fetchAllMasterVersion,
  getAllFaktorParameterDataOption
})(WrappedSaveRisikoInherenKuantitatif);
