import React from "react";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikatorForParamterKualitatif,
  addParameterKuantitatif,
  resetUpdateParameterKualitatif,
  fetchAllIngredients,
  addParameterKualitatif,
  updateParameterKualitatif,
  fetchAllMasterVersion,
  getAllFaktorParameterDataOption,
  fetchAllRatioIndikatorFormula
} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";
import {optionsLevel} from "./SaveParameterKualitatif";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;
const Option = Select.Option;

class EditParameterKualitatif extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            basic: false,
            ewarning: false,
            dataoptionsrisk : [],
            dataoptionsratioindikatorkualitatif : [],
            dataoptionsingredientsdata : [],
            datavalue: [],
            dataoptionsmasterversion: [],
            dataoptionsparameterfaktor:[],
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
            paramindikatorpenyebut:''
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'PR', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
        this.props.jenisNilaiParam({token:this.props.token});
        this.props.getAllRatioIndikatorForParamterKualitatif({token:this.props.token, jenis: "PR", id_jenis_nilai: 0});
        this.props.fetchAllIngredients({token: this.props.token, searchData: {
          jenis: "PR",
          jenis_nilai_id: 4
        }});
        this.props.fetchAllMasterVersion({token: this.props.token});
        this.props.getAllFaktorParameterDataOption({token: this.props.token});
        this.props.fetchAllRatioIndikatorFormula({token: this.props.token, searchData: {
          ingredients_id: this.props.fetchdata[0].id
        }});

        console.log("===FETCHDATA");
        console.log(this.props.fetchdata);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionsratioindikatorkualitatif: nextProps.getallratioindikatorkualitatif,
            dataoptionsingredientsdata: nextProps.ingredientsdata,
            dataoptionsmasterversion : nextProps.masterversionsdata,
            dataoptionsparameterfaktor: nextProps.getallparameterfaktor,
        });

        switch(nextProps.updateparameterkualitatifresult.statusCode){
          case 200:
          case 201:
          case 400:
            this.props.clickEditSuccessButton(
              nextProps.updateparameterkualitatifresult.statusCode,
              nextProps.updateparameterkualitatifresult.message
            );
            // reset all state
            this.props.resetUpdateParameterKualitatif();
            break;
          default:
            break;
        }
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
            ewarning,
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
            datavalue,
            dataoptionsmasterversion,
            dataoptionsparameterfaktor
        } = this.state;
        const {token, fetchdata} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
          <Form onSubmit={(e)=>{
              e.preventDefault();
              this.props.form.validateFields((err, values) => {
                  if (!err) {
                    this.setState({
                        ewarning: true,
                        datavalue:values
                    });
                  }
              });
          }}>
              {
                fetchdata.map((prop, index) => {
                  return(
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
                                            this.props.getAllRatioIndikatorForParamterKualitatif({token:this.props.token, jenis: "PR", risk_id: value, id_jenis_nilai: 0});
                                            // this.props.getAllFaktorParameterDataOption({token: this.props.token, risk_id: value});
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

                        <FormItem {...formItemLayout} label="Indikator">
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
                                <Input id="penomoran" placeholder="Input Penomoran"
                                             className="w-100"
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
                                initialValue: prop.level,
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
                            {getFieldDecorator('parameter_faktor_id', {
                                initialValue: parseInt(prop.parameter_faktor_id),
                                rules: [{
                                    required: true, message: 'Please input induk/parameter field.',
                                }],
                            })(
                                <Select id="parameter_faktor_id"
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
                            {getFieldDecorator('pr_low', {
                                initialValue: prop.pr_low
                            })(
                                <Select id="pr_low"
                                        showSearch
                                        placeholder={prop.pr_low_name}
                                        optionFilterProp="children"
                                        onChange={(value)=>{
                                            this.setState({
                                                paramindikatorpenyebut:value
                                            });
                                        }}
                                        style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={prop.pr_low} disabled>{prop.pr_low_name}</Option>
                                    {
                                        dataoptionsratioindikatorkualitatif.map((prop, index) => {
                                            var value = prop.id;
                                            var label = prop.name;
                                            return (
                                                <Option value={value} key={index}>{label}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Low to Moderate">
                            {getFieldDecorator('pr_lowtomod', {
                                initialValue: prop.pr_lowtomod
                            })(
                                <Select id="pr_lowtomod"
                                        showSearch
                                        placeholder={prop.pr_lowtomod_name}
                                        optionFilterProp="children"
                                        onChange={(value)=>{
                                            this.setState({
                                                paramindikatorpenyebut:value
                                            });
                                        }}
                                        style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={prop.pr_lowtomod} disabled>{prop.pr_lowtomod_name}</Option>
                                    {
                                        dataoptionsratioindikatorkualitatif.map((prop, index) => {
                                            var value = prop.id;
                                            var label = prop.name;
                                            return (
                                                <Option value={value} key={index}>{label}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Moderate">
                            {getFieldDecorator('pr_mod', {
                                initialValue: prop.pr_mod
                            })(
                                <Select id="pr_mod"
                                        showSearch
                                        placeholder={prop.pr_mod}
                                        optionFilterProp="children"
                                        onChange={(value)=>{
                                            this.setState({
                                                paramindikatorpenyebut:value
                                            });
                                        }}
                                        style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={prop.pr_mod} disabled>{prop.pr_mod_name}</Option>
                                    {
                                        dataoptionsratioindikatorkualitatif.map((prop, index) => {
                                            var value = prop.id;
                                            var label = prop.name;
                                            return (
                                                <Option value={value} key={index}>{label}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="Moderate to High">
                            {getFieldDecorator('pr_modtohigh', {
                                initialValue: prop.pr_modtohigh
                            })(
                                <Select id="pr_modtohigh"
                                        showSearch
                                        placeholder="Select ratio indikator"
                                        optionFilterProp="children"
                                        onChange={(value)=>{
                                            this.setState({
                                                paramindikatorpenyebut:value
                                            });
                                        }}
                                        style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={prop.pr_modtohigh} disabled>{prop.pr_modtohigh_name}</Option>
                                    {
                                        dataoptionsratioindikatorkualitatif.map((prop, index) => {
                                            var value = prop.id;
                                            var label = prop.name;
                                            return (
                                                <Option value={value} key={index}>{label}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout} label="High">
                            {getFieldDecorator('pr_high', {
                                initialValue: prop.pr_high
                            })(
                                <Select id="pr_high"
                                        showSearch
                                        placeholder="Select ratio indikator"
                                        optionFilterProp="children"
                                        onChange={(value)=>{
                                            this.setState({
                                                paramindikatorpenyebut:value
                                            });
                                        }}
                                        style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Option value={prop.pr_high} disabled>{prop.pr_high_name}</Option>
                                    {
                                        dataoptionsratioindikatorkualitatif.map((prop, index) => {
                                            var value = prop.id;
                                            var label = prop.name;
                                            return (
                                                <Option value={value} key={index}>{label}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                            <Link to={{pathname:'/bjbs/risikoinheren/ratioindikator',
                                ratioProps:{
                                    rparameter:fetchdata ? fetchdata.pkparameter ? fetchdata.pkparameter : paramparameter : paramparameter ,
                                    rlow:fetchdata ? fetchdata.pklow ? fetchdata.pklow : paramlow : paramlow,
                                    rlowtomoderate:fetchdata ? fetchdata.pklowtomoderate ? fetchdata.pklowtomoderate : paramlowtomoderate : paramlowtomoderate,
                                    rmoderate:fetchdata ? fetchdata.pkmoderate ? fetchdata.pkmoderate : parammoderate : parammoderate,
                                    rmoderatetohigh:fetchdata ? fetchdata.pkmoderatetohigh ? fetchdata.pkmoderatetohigh : parammoderatetohigh : parammoderatetohigh,
                                    rhigh:fetchdata ? fetchdata.pkhigh ? fetchdata.pkhigh : paramhigh : paramhigh,
                                    rbobot:fetchdata ? fetchdata.pkbobot ? fetchdata.pkbobot : parambobot : parambobot,
                                    rpenomoran:fetchdata ? fetchdata.pkpenomoran ? fetchdata.pkpenomoran : parampenomoran : parampenomoran,
                                    rlevel:fetchdata ? fetchdata.pklevel ? fetchdata.pklevel : paramlevel : paramlevel,
                                    rindukparameter:fetchdata ? fetchdata.pkindukparameter ? fetchdata.pkindukparameter : paramindukparameter : paramindukparameter,
                                    rrisk_id:fetchdata ? fetchdata.pkrisk_id ? fetchdata.pkrisk_id : paramrisk_id : paramrisk_id,
                                    rjenisnilai:fetchdata ? fetchdata.pkjenisnilai ? fetchdata.pkjenisnilai : paramjenisnilai : paramjenisnilai,
                                    rindikatorpenyebut:fetchdata ? fetchdata.pkindikatorpenyebut ? fetchdata.pkindikatorpenyebut : paramindikatorpenyebut : paramindikatorpenyebut,
                                    rindikatorpembilang:fetchdata ? fetchdata.pkindikatorpembilang ? fetchdata.pkindikatorpembilang : paramindikatorpembilang : paramindikatorpembilang,
                                    raddtrue : true,
                                }}
                            }>Tambah Parameter Ratio Indikator</Link>
                        </FormItem>

                        <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                            <Button onClick={this.props.clickCancelEditButton}>Cancel</Button>
                            {/*<Link className="ant-btn" to={{pathname:'/bjbs/profilrisiko/parameterkualitatif', cancelProps:{
                                    propscancel:true
                                }}}>Cancel</Link>*/}
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
                               console.log("Data value : ");
                               console.log(datavalue);
                               this.props.updateParameterKualitatif({
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
              />
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

const WrappedEditParameterKualitatif = Form.create()(EditParameterKualitatif);

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
  parameterfaktor,
}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    const {getallratioindikator, getallratioindikatorkualitatif} = ratioindikator;
    const {parameterkualitatifdata, updateparameterkualitatifresult} = parameterkualitatif;
    const {ingredientsdata} = ingredients;
    const {masterversionsdata} = masterversion;
    const {getallparameterfaktor} = parameterfaktor;
    return {
      token,
      getallrisks,
      getallperingkatrisiko,
      jenisnilaiparam,
      getallratioindikator,
      updateparameterkualitatifresult,
      getallratioindikatorkualitatif,
      parameterkualitatifdata,
      ingredientsdata,
      masterversionsdata,
      getallparameterfaktor
    }
};

export default connect(mapStateToProps, {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikatorForParamterKualitatif,
  addParameterKuantitatif,
  resetUpdateParameterKualitatif,
  fetchAllIngredients,
  addParameterKualitatif,
  updateParameterKualitatif,
  fetchAllMasterVersion,
  getAllFaktorParameterDataOption,
  fetchAllRatioIndikatorFormula
})(WrappedEditParameterKualitatif);
export {optionsLevel};
