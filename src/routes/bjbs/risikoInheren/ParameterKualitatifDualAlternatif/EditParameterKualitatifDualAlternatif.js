import React, {useState, useRef} from "react";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
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
  fetchAllRatioIndikatorFormula,
  getAllRatioIndikatorForParamterKualitatif
} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {
  PlusCircleFilled,
  MinusCircleFilled
} from '@ant-design/icons';
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;
const Option = Select.Option;

const optionsLevel = [
    {label:"Level Kedua (2)", value:2},
    {label:"Level Ketiga (3)", value:3},
    {label:"Level Keempat (4)", value:4},
    {label:"Level Kelima (5)", value:5}
];

const operatorOption = [
    {label:"Tambah (+)", value:"+"}
];

const variableType = [
    {label:"Independent Variable", value:"independentvariable"},
    {label:"Dependent Variable", value:"dependentvariable"}
];

class EditParameterKualitatifDualAlternatif extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          dataoptionslevel : optionsLevel,
          basic: false,
          ewarning: false,
          dataoptionsrisk : [],
          dataoptionsvariabletype : variableType,
          dataoptionsratioindikatorkualitatif : [],
          dataoptionsingredientsdata : [],
          dataoptionsratioindikator : [],
          ratioindikatorcalculation: [],
          dataoptionsmasterversion: [],
          datavalue: [],
          dataoptionsparameterfaktor: [],
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
          paramrisk_id:'',
          paramjenisnilai:'',
          paramindikatorpembilang:'',
          paramindikatorpenyebut:'',
          numChildren: 0,
      }
  }

  componentDidMount(){
      this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
      this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
      this.props.jenisNilaiParam({token:this.props.token});
      this.props.getAllRatioIndikatorForParamterKualitatif({token:this.props.token, jenis: "PR"});
      this.props.getAllFaktorParameterDataOption({token: this.props.token});
      this.props.fetchAllIngredients({token: this.props.token, searchData: {
        jenis: "PR",
        jenis_nilai_id: 21
      }});
      this.props.getAllRatioIndikator({token:this.props.token});
      this.props.fetchAllMasterVersion({token: this.props.token});
      this.props.fetchAllRatioIndikatorFormula({token: this.props.token, searchData: {
        ingredients_id: this.props.fetchdata[0].id
      }})
  }

  componentWillReceiveProps(nextProps){
      this.setState({
          dataoptionsrisk : nextProps.getallrisks,
          dataoptionsratioindikator : nextProps.getallratioindikator,
          dataoptionsratioindikatorkualitatif: nextProps.getallratioindikatorkualitatif,
          dataoptionsingredientsdata: nextProps.ingredientsdata,
          dataoptionsmasterversion : nextProps.masterversionsdata,
          ratioindikatorcalculation: nextProps.ratioindikatorformuladata,
          numChildren: nextProps.countallratioindikatorformula - 1,
          dataoptionsparameterfaktor: nextProps.getallparameterfaktor,
      });

      switch(nextProps.updateparameterkuantitatifresult.statusCode){
        case 200:
        case 201:
        case 400:
          this.props.clickAddSuccessButton(
            nextProps.updateparameterkuantitatifresult.statusCode,
            nextProps.updateparameterkuantitatifresult.message
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
              xs: {span: 24},
              sm: {span: 4},
          },
          wrapperCol: {
              xs: {span: 24},
              sm: {span: 20},
          },
      };

      const {
          dataoptionsrisk,
          dataoptionslevel,
          basic,
          paramparameter,
          paramlow,
          paramlowtomoderate,
          parammoderate,
          parammoderatetohigh,
          paramhigh,
          parambobot,
          parampenomoran,
          paramlevel,
          paramindukparameter,
          paramrisk_id,
          paramjenisnilai,
          paramindikatorpenyebut,
          paramindikatorpembilang,
          dataoptionsratioindikatorkualitatif,
          dataoptionsingredientsdata,
          dataoptionsratioindikator,
          numChildren,
          datavalue,
          dataoptionsmasterversion,
          ratioindikatorcalculation,
          ewarning,
          dataoptionsparameterfaktor,
          dataoptionsvariabletype
      } = this.state;
      const {token, fetchdata} = this.props;
      const {getFieldDecorator} = this.props.form;

      // handle children of element for counting
      const children = [];

      //looping all children
      for (var i = 1; i < numChildren+1; i++) {
        children.push(
          <ChildComponent
            indikatordata={dataoptionsratioindikator}
            key={i}
            id_operator_arithmetic={"operator_arithmetic_"+i}
            handleChangeRatioIndikator={this.handleChangeRatioIndikator}
            handleChangeOperator={this.handleChangeOperator}
            operationsDefaultValue={typeof fetchdata[0].ratioindikatorformula[i] === "undefined" ? fetchdata[0].ratioindikatorformula[i-1].operations : fetchdata[0].ratioindikatorformula[i].operations}
            ratioIndikatorDefaultValue={typeof fetchdata[0].ratioindikatorformula[i] === "undefined" ? fetchdata[0].ratioindikatorformula[i-1].ratio_indikator_id : fetchdata[0].ratioindikatorformula[i].ratio_indikator_id}
            id_ratio_indikator={"ratio_indikator_"+i}
            />);
      };

      return (

        <Form onSubmit={(e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                values.ratio_indikator_formula = ratioindikatorcalculation;
                console.log(values);
                // if (!err) {
                //   this.setState({
                //       ewarning: true,
                //       datavalue:values
                //   });
                // }
            });
        }}>
                {
                    fetchdata.map((prop, index) => {
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
                                            }}
                                            style={paramrisk_id === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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

                            <FormItem {...formItemLayout} label="Name">
                                {getFieldDecorator('name', {
                                    initialValue: prop.name,
                                    rules: [{
                                        required: true, message: 'Please input name field.',
                                    }],
                                })(
                                    <Input id="name" placeholder="Input Indikator"
                                           onChange={(e,value) =>{
                                               this.setState({
                                                   paramparameter:e.target.value,
                                               });
                                           }}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="Penomoran">
                                {getFieldDecorator('penomoran', {
                                    initialValue: prop.penomoran,
                                    rules: [{
                                        required: true, message: 'Please input penomoran field.'
                                    }],
                                })(
                                    <InputNumber id="penomoran" placeholder="Input Penomoran"
                                                 className="w-100"
                                                 min={0}
                                                 max={99}
                                                 maxLength={2}
                                                 onChange={(value)=>{
                                                     this.setState({
                                                         parampenomoran:value,
                                                     });
                                                 }}
                                    />
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
                                            dataoptionsingredientsdata.map((prop, index) => {
                                                var value = prop.id;
                                                var label = `Level - ${prop.level} - ${prop.name}`;
                                                return (
                                                    <Option key={index} value={value}>{label}</Option>
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
                                {getFieldDecorator('low', {
                                    initialValue: prop.pr_low,
                                    rules: [{type:"number", message: 'Input must be number type.'}],
                                })(
                                    <InputNumber id="low" placeholder="Input Low"
                                                 className="w-100"
                                                 min={0}
                                                 onChange={(value)=>{
                                                     this.setState({
                                                         paramlow:value,
                                                     });
                                                 }}
                                    />
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout} label="Low to Moderate">
                                {getFieldDecorator('lowtomoderate', {
                                    initialValue: prop.pr_lowtomod,
                                    rules: [{type:"number", message: 'Input must be number type.'}],
                                })(
                                    <InputNumber id="low" placeholder="Input Low to Moderate"
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
                                {getFieldDecorator('moderate', {
                                    initialValue: prop.pr_mod,
                                    rules: [{type:"number", message: 'Input must be number type.'}],
                                })(
                                    <InputNumber id="low" placeholder="Input Moderate"
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
                                {getFieldDecorator('moderatetohigh', {
                                    initialValue: prop.pr_modtohigh,
                                    rules: [{type:"number", message: 'Input must be number type.'}],
                                })(
                                    <InputNumber id="low" placeholder="Input Moderate to High"
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
                                {getFieldDecorator('high', {
                                    initialValue: prop.pr_high,
                                    rules: [{type:"number", message: 'Input must be number type.'}],
                                })(
                                    <InputNumber id="high" placeholder="Input High"
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
                            <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Inisiasi Ratio Indikator</label><br/>
                            <Grid container spacing={1}>
                              <Grid item xs={12} md={12} lg={2}>
                                <div>
                                  <Select id="boolean_dependent_variable"
                                          showSearch
                                          placeholder="Type of variable"
                                          optionFilterProp="children"
                                          defaultValue={prop.ratioindikatorformula[0].operations}
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
                                        defaultValue={prop.ratioindikatorformula[0].ratio_indikator_id}
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
                                <Button type="primary" htmlType="submit">Save</Button>
                            </FormItem>
                          </Spin>
                        </div>
                      )
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
);

const WrappedEditParameterKualitatifDualAlternatif = Form.create()(EditParameterKualitatifDualAlternatif);

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
  fetchAllRatioIndikatorFormula,
  getAllRatioIndikatorForParamterKualitatif
})(WrappedEditParameterKualitatifDualAlternatif);
