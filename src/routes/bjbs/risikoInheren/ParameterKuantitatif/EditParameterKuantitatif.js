import React from "react";
import connect from "react-redux/es/connect/connect";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import {
  PlusCircleFilled,
  MinusCircleFilled
} from '@ant-design/icons';
import {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikator,
  updateParameterKuantitatif,
  resetUpdateParameterKuantitatif,
  fetchAllParameterKuantitatif,
  fetchAllIngredients,
  fetchAllMasterVersion,
  getAllFaktorParameterDataOption,
  fetchAllRatioIndikatorFormula
} from "../../../../appRedux/actions/index";
import {optionsLevel} from "./SaveParameterKuantitatif";
import SweetAlerts from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";
import Grid from "@material-ui/core/Grid";

const variableType = [
    {label:"Independent Variable", value:"independentvariable"},
    {label:"Dependent Variable", value:"dependentvariable"}
];

const operatorOption = [
    {label:"Tambah (+)", value:"+"},
    {label:"Bagi (:)", value:"/"},
    {label:"Kurang (-)", value:"-"},
    {label:"Kali (x)", value:"*"}
];

const FormItem = Form.Item;
const Option = Select.Option;

class EditParameterKuantitatif extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            dataoptionsvariabletype : variableType,
            basic: false,
            ewarning: false,
            dataoptionsrisk : [],
            dataoptionspringkatrisiko : [],
            dataoptionsratioindikator : [],
            dataoptions : [],
            datavalue: [],
            dataoptionsparameterfaktor: [],
            dataoptionsmasterversion: [],
            masterversionlist: [],
            dataoptionsindukparameter: [],
            ratioindikatorcalculation: [],
            ratioindikatorcalculationtobeedit: [],
            fetchdataratioindikatorformula: [],
            fetchcountallratioindikatorformula: [],
            //state value
            paramparameter:'',
            paramlow:'',
            paramlowtomoderate:'',
            parammoderate:'',
            parammoderatetohigh:'',
            paramhigh:'',
            parambobot:'',
            parampenomoran:'',
            paramlevel:'',
            paramindukparameter:'',
            paramjenisnilai:'',
            paramindikatorpembilang:'',
            paramindikatorpenyebut:'',
            statusput : '',
            numChildren : 0

        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'PR', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
        this.props.jenisNilaiParam({token:this.props.token});
        this.props.getAllRatioIndikator({token:this.props.token});
        this.props.fetchAllMasterVersion({token: this.props.token});
        this.props.getAllFaktorParameterDataOption({token: this.props.token});
        this.props.fetchAllIngredients({token: this.props.token, searchData: {
          jenis: 'PR',
          jenis_nilai_id: 1
        }});
        this.props.fetchAllRatioIndikatorFormula({token: this.props.token, searchData: {
          ingredients_id: this.props.fetchdata[0].id
        }})
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionspringkatrisiko : nextProps.getallperingkatrisiko,
            dataoptions : nextProps.jenisnilaiparam,
            dataoptionsratioindikator : nextProps.getallratioindikator,
            statusput: nextProps.updateparameterkuantitatifresult,
            dataoptionsparameterfaktor: nextProps.getallparameterfaktor,
            dataoptionsmasterversion : nextProps.masterversionsdata,
            dataoptionsindukparameter: nextProps.ingredientsdata,
            ratioindikatorcalculation: nextProps.ratioindikatorformuladata,
            numChildren: nextProps.countallratioindikatorformula - 1
        });

        switch(nextProps.updateparameterkuantitatifresult.statusCode){
          case 200:
          case 201:
          case 400:
            // reset all state
            this.props.resetUpdateParameterKuantitatif();
            this.props.clickEditSuccessButton(
              nextProps.updateparameterkuantitatifresult.statusCode,
              nextProps.updateparameterkuantitatifresult.message
            );
            break;
          default:
            break;
        }
    }

    onAddChild = () => {

      this.setState(prevState => ({
        ...prevState,
        numChildren: this.state.numChildren + 1
      }));

      // data for calculation
      let dataBody = {};
      dataBody.ingredients_id = this.props.fetchdata[0].id;
      dataBody.ratio_indikator_id = "";
      dataBody.seq = this.state.numChildren+1;
      dataBody.operations = "";
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
        console.log(this.state.numChildren);

        // data for calculation
        this.state.ratioindikatorcalculation.pop();
      }
    }

    // ==== ON CHANGE INIT RATIO INDIKATOR ====
    onAddInitRIVariableType = (value) => {

      // clonning and update
      const newArray = Array.from(this.state.ratioindikatorcalculation);
      newArray[0].operations = value;

      this.setState(prevState => ({
        ...prevState,
        ratioindikatorcalculations: newArray
      }));

    }

    onAddInitRIIdIndikator = (value) => {

      // clonning and update
      const newArray = Array.from(this.state.ratioindikatorcalculation);
      newArray[0].ratio_indikator_id = value;

      this.setState(prevState => ({
        ...prevState,
        ratioindikatorcalculations: newArray
      }));
    }

    // ==== /ON CHANGE INIT RATIO INDIKATOR ====

    handleChangeOperator = (value, i) => {

        let index = parseInt(i._owner.index) + 1;
        // update value in object
        const newArray = Array.from(this.state.ratioindikatorcalculation);
        newArray[index].operations = value;

        this.setState(prevState => ({
          ...prevState,
          ratioindikatorcalculations: newArray
        }));
    }

    handleChangeRatioIndikator = (value, i) => {
        let index = parseInt(i._owner.index) + 1;
        // update value in object
        const newArray = Array.from(this.state.ratioindikatorcalculation);
        newArray[index].ratio_indikator_id = value;

        this.setState(prevState => ({
          ...prevState,
          ratioindikatorcalculations: newArray
        }));
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
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };

        const {
          dataoptionslevel,
          basic,
          ewarning,
          dataoptionsrisk,
          dataoptionsratioindikator,
          dataoptions,
          paramlevel,
          paramindukparameter,
          paramjenisnilai,
          datavalue,
          dataoptionsparameterfaktor,
          dataoptionsmasterversion,
          dataoptionsvariabletype,
          dataoptionsindukparameter,
          numChildren,
          ratioindikatorcalculation
        } = this.state;
        const {fetchdata, token} = this.props;
        const {getFieldDecorator} = this.props.form;


        // handle children of element for counting
        const children = [];

        //looping all children
        for (var i = 1; i < numChildren+1; i++) {
          // console.log("NOMOR KE - "+i);
          // console.log(fetchdataratioindikatorformula);
          children.push(
            <ChildComponent
              indikatordata={dataoptionsratioindikator}
              key={i}
              id_operator_arithmetic={"operator_arithmetic_"+i}
              handleChangeRatioIndikator={this.handleChangeRatioIndikator}
              handleChangeOperator={this.handleChangeOperator}
              operationsDefaultValue={typeof ratioindikatorcalculation[i] === "undefined" ? ratioindikatorcalculation[i-1].operations : ratioindikatorcalculation[i].operations}
              ratioIndikatorDefaultValue={typeof ratioindikatorcalculation[i] === "undefined" ? ratioindikatorcalculation[i-1].ratio_indikator_id : ratioindikatorcalculation[i].ratio_indikator_id}
              id_ratio_indikator={"ratio_indikator_"+i} />);
        };

        return (

          <Form onSubmit={(e)=>{
              e.preventDefault();
              this.props.form.validateFields((err, values) => {
                  values.ratio_indikator_formula = ratioindikatorcalculation;
                  // console.log(values);
                  if (!err) {
                    this.setState({
                        ewarning: true,
                        datavalue:values
                    });
                  }
              });
          }}>
              {
                  fetchdata.map((prop, index) =>{
                      return (

                          <div key={index}>
                              <Spin spinning={false} tip="Loading...">

                                  <FormItem {...formItemLayout} label="Risk">
                                      {getFieldDecorator('risk_id', {
                                          initialValue: prop.risk_id,
                                          rules: [{
                                              required: true, message: 'Please input risk field.',
                                          }],
                                      })(
                                          <Select id="risk_id"
                                                  showSearch
                                                  placeholder="Select risk"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      this.setState({
                                                          paramrisk_id:value,
                                                      });
                                                      this.props.getAllFaktorParameterDataOption({token: this.props.token, risk_id: value});
                                                      this.props.fetchAllIngredients({token: this.props.token, searchData: {
                                                        jenis: 'PR',
                                                        jenis_nilai_id: 1,
                                                        risk_id: value
                                                      }});
                                                  }}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                  >
                                              <Option value="" disabled>Select risk</Option>
                                              {
                                                  dataoptionsrisk.map((prop, index) => {
                                                      var value = prop.id;
                                                      var label = prop.nama;
                                                      return (
                                                          <Option key={index} value={value}>{label}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Penomoran">
                                      {getFieldDecorator('penomoran', {
                                          initialValue: prop.penomoran,
                                          rules: [{
                                              required: true, message: 'Please input penomoran field.'
                                          }],
                                      })(
                                          <Input id="penomoran" placeholder="Input Penomoran" maxLength={2}/>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Name">
                                      {getFieldDecorator('name', {
                                          initialValue: prop.name,
                                          rules: [{
                                              required: true, message: 'Please input name field.',
                                          }],
                                      })(
                                          <Input id="name" placeholder="Input Name"/>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Level">
                                      {getFieldDecorator('level', {
                                          initialValue: parseInt(prop.level),
                                          rules: [{
                                              required: true, message: 'Please input level field.',
                                          }],
                                      })(
                                          <Select id="level"
                                                  showSearch
                                                  placeholder="Select level"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      this.setState({
                                                          paramlevel:value,
                                                      });
                                                  }}
                                                  style={paramlevel === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                              <Option value="" disabled>Select level</Option>
                                              {
                                                  dataoptionslevel.map((prop, index) => {
                                                      var value = prop.value;
                                                      var label = prop.label;
                                                      return (
                                                          <Option value={value} key={index}>{label}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Parameter Faktor">
                                      {getFieldDecorator('parameterfaktor', {
                                          initialValue: parseInt(prop.parameter_faktor_id),
                                          rules: [{
                                              required: true, message: 'Please input induk/parameter field.',
                                          }],
                                      })(
                                          <Select id="parameterfaktor"
                                                  showSearch
                                                  placeholder="Select parameter faktor"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      this.setState({
                                                          paramindukparameter:value,
                                                      });
                                                  }}
                                                  style={paramindukparameter === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                              <Option value="" disabled>Select induk/parameter</Option>
                                              {
                                                  dataoptionsparameterfaktor.map((prop, index) => {
                                                      var value = prop.id;
                                                      var label = prop.name;
                                                      return (
                                                          <Option key={index} value={value}>{label}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Induk/Parameter">
                                      {getFieldDecorator('induk_id', {
                                          initialValue: parseInt(prop.induk_id),
                                          rules: [{
                                              required: true, message: 'Please input induk/parameter field.',
                                          }],
                                      })(
                                          <Select id="induk_id"
                                                  showSearch
                                                  placeholder="Select induk/parameter"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      this.setState({
                                                          paramindukparameter:value,
                                                      });
                                                  }}
                                                  style={paramindukparameter === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                              <Option value="" disabled>Select induk/parameter</Option>
                                              {
                                                  dataoptionsindukparameter.map((prop, index) => {
                                                      var value = prop.id;
                                                      var label = prop.name;
                                                      var level = prop.level;
                                                      return (
                                                          <Option key={index} value={value}>{label} (Level {level}{level === 1 ? '/Parameter Faktor' : ''})</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Bobot">
                                      {getFieldDecorator('bobot', {
                                          initialValue: prop.bobot,
                                          rules: [{
                                              required: true, message: 'Please input bobot field.'
                                          },{type:"number", message: 'Input must be number type.'}],
                                      })(
                                          <InputNumber id="bobot" placeholder="Input Bobot"
                                                       className="w-100"
                                                       min={0}
                                                       max={100}
                                                       onChange={(value)=>{
                                                           this.setState({
                                                               parambobot:value,
                                                           });
                                                       }}
                                                       onKeyUp={(e, value)=> {
                                                           var val = parseInt(e.target.value);
                                                           if (val>100 || val<0){
                                                               this.setState({
                                                                   basic: true,
                                                               })
                                                           }
                                                       }}
                                                       formatter={value => `${value}%`}
                                                       parser={value => value.replace('%', '')}
                                          />
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Jenis Penilaian">
                                      {getFieldDecorator('jenis_nilai_id', {
                                          initialValue: parseInt(prop.jenis_nilai_id),
                                          rules: [{
                                              required: true, message: 'Please input jenis penilaian field.',
                                          }],
                                      })(
                                          <Select id="jenis_nilai_id"
                                                  showSearch
                                                  placeholder="Select Jenis Penilaian"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      console.log("Value Jenis Penilaian :");
                                                      console.log(value);
                                                      this.setState({
                                                          paramjenisnilai:value
                                                      });
                                                  }}
                                                  style={paramjenisnilai === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                          >
                                              <Option value="" disabled>Select jenis penilaian</Option>
                                              {
                                                  dataoptions.map((prop, index) => {
                                                      var value = prop.value;
                                                      var label = prop.text;

                                                      return (
                                                          <Option value={value} key={index}>{label}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Master Versi">
                                      {getFieldDecorator('master_version_list', {
                                          initialValue: prop.masterversionlist,
                                          rules: [{
                                              required: true, message: 'Please input master version.',
                                          }],
                                      })(
                                        <Select id="master_version_list"
                                                showSearch
                                                mode="multiple"
                                                placeholder="Select Jenis Penilaian"
                                                optionFilterProp="children"
                                                onChange={this.handleChangeMultipleSelect}
                                                style={paramjenisnilai === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {
                                                dataoptionsmasterversion.map((prop, index) => {
                                                    var value = prop.id;
                                                    var label = prop.version_name;
                                                    return (
                                                        <Option value={value} key={index}>{label}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                      )}
                                  </FormItem>

                                  <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Peringkat Risiko</label><br/>
                                  <FormItem {...formItemLayout} label="Low">
                                      {getFieldDecorator('pr_low', {
                                          initialValue: Number(prop.pr_low.toFixed(2))
                                      })(
                                          <Input id="pr_low" placeholder="Input Low"
                                                       className="w-100"
                                                       onChange={(value)=>{
                                                           this.setState({
                                                               paramlow:value,
                                                           });
                                                       }}
                                          />
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Low to Moderate">
                                      {getFieldDecorator('pr_lowtomod', {
                                          initialValue: Number(prop.pr_lowtomod.toFixed(2))
                                      })(
                                          <InputNumber id="pr_lowtomod" placeholder="Input Low to Moderate"
                                                       className="w-100"
                                                       min={0}
                                                       onChange={(value)=>{
                                                           this.setState({
                                                               paramlowtomoderate:value,
                                                           });
                                                       }}
                                          />
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Moderate">
                                      {getFieldDecorator('pr_mod', {
                                          initialValue: Number(prop.pr_mod.toFixed())
                                      })(
                                          <InputNumber id="pr_mod" placeholder="Input Moderate"
                                                       className="w-100"
                                                       min={0}
                                                       onChange={(value)=>{
                                                           this.setState({
                                                               parammoderate:value,
                                                           });
                                                       }}
                                          />
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Moderate to High">
                                      {getFieldDecorator('pr_modtohigh', {
                                          initialValue: Number(prop.pr_modtohigh.toFixed(2))
                                      })(
                                          <InputNumber id="pr_modtohigh" placeholder="Input Moderate to High"
                                                       className="w-100"
                                                       min={0}
                                                       onChange={(value)=>{
                                                           this.setState({
                                                               parammoderatetohigh:value,
                                                           });
                                                       }}
                                          />
                                      )}
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="High">
                                      {getFieldDecorator('pr_high', {
                                          initialValue: Number(prop.pr_high.toFixed(2))
                                      })(
                                          <InputNumber id="pr_high" placeholder="Input High"
                                                       className="w-100"
                                                       min={0}
                                                       onChange={(value)=>{
                                                           this.setState({
                                                               paramhigh:value,
                                                           });
                                                       }}
                                          />
                                      )}
                                  </FormItem>

                                  {/* .INITIALS RATIO */}
                                  <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Indikator Ratio/Ukuran</label><br/>
                                  <Grid container spacing={1}>
                                    <Grid item xs={12} md={12} lg={2}>
                                      <div>
                                        <Select id="boolean_dependent_variable"
                                                showSearch
                                                placeholder="Type of variable"
                                                optionFilterProp="children"
                                                defaultValue={typeof prop.ratioindikatorformula[0] === "undefined" ? '' : prop.ratioindikatorformula[0].operations}
                                                style={{marginTop: 10, marginBottom: 10}}
                                                onChange={this.onAddInitRIVariableType}
                                        >
                                            <Option value="" disabled>Select Variable Type</Option>
                                            {
                                                dataoptionsvariabletype.map((prop, index) => {
                                                    var value = prop.value;
                                                    var label = prop.label;
                                                    return (
                                                        <Option key={index} value={value}>{label}</Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                      </div>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={10}>
                                      <Select id="init_ratio_indikator"
                                              showSearch
                                              placeholder="Select Initial Ratio Indikator"
                                              optionFilterProp="children"
                                              defaultValue={typeof prop.ratioindikatorformula[0] === "undefined" ? '' : prop.ratioindikatorformula[0].ratio_indikator_id}
                                              style={{marginTop: 10, marginBottom: 10}}
                                              onChange={this.onAddInitRIIdIndikator}
                                      >
                                          <Option value="" disabled>Select Intial Ratio</Option>
                                          {
                                              dataoptionsratioindikator.map((prop, index) => {
                                                  var value = prop.id;
                                                  var label = prop.name;
                                                  return (
                                                      <Option key={index} value={value}>{label}</Option>
                                                  )
                                              })
                                          }
                                      </Select>
                                    </Grid>
                                  </Grid>

                                  {/* .RATIO INDIKATOR FORMULA  */}
                                  <ParentComponent addChild={this.onAddChild} removeChild={this.onRemoveChild}>
                                    {children}
                                  </ParentComponent>

                                  <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                                      <Button onClick={this.props.clickCancelEditButton}>Cancel</Button>
                                      <Button type="primary" htmlType="submit">Edit</Button>
                                  </FormItem>

                              </Spin>
                          </div>
                      );
                  })
              }

              <SweetAlerts show={ewarning}
                           warning
                           showCancel
                           confirmBtnText={'Yes, update it!'}
                           confirmBtnBsStyle="danger"
                           cancelBtnBsStyle="default"
                           title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                           onConfirm={()=>{
                               this.setState({
                                   ewarning: false,
                               });
                               this.props.updateParameterKuantitatif({
                                 id: fetchdata[0].id,
                                 token: token,
                                 altered: datavalue
                               })
                           }}
                           onCancel={() => {
                             this.setState({
                               ewarning: false
                             })
                           }}
              >
                   <IntlMessages id="sweetAlerts.youWillNotAble"/>
               </SweetAlerts>
               <SweetAlerts show={basic}
                            customClass="gx-sweet-alert-top-space"
                            title={"Input must be 0-100 %"}
                            onConfirm={()=>{
                                this.setState({
                                    basic: false,
                                })
                            }}/>
          </Form>
        );
    }
}

const ParentComponent = props => (
  <>
    <Grid container spacing={1}>
      <Grid item xs={12}  md={12} lg={12}>
        <label style={{
          textDecoration: 'underline',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Ratio Indikator Formula</label>
      </Grid>

      <Grid item xs={12}  md={12} lg={2}>
        <Button onClick={props.addChild}>
          <PlusCircleFilled />
        </Button>
        <Button onClick={props.removeChild}>
          <MinusCircleFilled />
        </Button>
      </Grid>

      <Grid item xs={12}  md={12} lg={10} />

    </Grid>
    <div>
      {props.children}
    </div>
  </>
);

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
                defaultValue={props.operationsDefaultValue}
        >
            <Option value="" disabled>Select Operator</Option>
            {
                operatorOption.map((prop, index) => {
                    var value = prop.value;
                    var label = prop.label;
                    return (
                        <Option key={props.key} value={value}>{label}</Option>
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
                defaultValue={props.ratioIndikatorDefaultValue}
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

const WrappedEditParameterKuantitatif = Form.create()(EditParameterKuantitatif);

const mapStateToProps = ({
  auth,
  jenisrisiko,
  peringkatrisiko,
  masterparameter,
  ratioindikator,
  parameterkuantitatif,
  ingredients,
  parameterfaktor,
  masterversion,
  ratioindikatorformula
}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    const {getallratioindikator} = ratioindikator;
    const {updateparameterkuantitatifresult} = parameterkuantitatif;
    const {ingredientsdata} = ingredients;
    const {getallparameterfaktor} = parameterfaktor;
    const {masterversionsdata} = masterversion;
    const {ratioindikatorformuladata, countallratioindikatorformula} = ratioindikatorformula;
    return {
      token,
      getallrisks,
      getallperingkatrisiko,
      jenisnilaiparam,
      getallratioindikator,
      updateparameterkuantitatifresult,
      ingredientsdata,
      getallparameterfaktor,
      masterversionsdata,
      ratioindikatorformuladata,
      countallratioindikatorformula
    }
};

export default connect(mapStateToProps, {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikator,
  updateParameterKuantitatif,
  resetUpdateParameterKuantitatif,
  fetchAllParameterKuantitatif,
  fetchAllIngredients,
  fetchAllMasterVersion,
  getAllFaktorParameterDataOption,
  fetchAllRatioIndikatorFormula
})(WrappedEditParameterKuantitatif);
