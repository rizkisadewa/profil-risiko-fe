import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikatorForParamterKualitatif,
  addParameterKuantitatif,
  resetAddParameterKualitatif,
  fetchAllIngredients,
  fetchAllMasterVersion,
  addParameterKualitatif,
  getAllFaktorParameterDataOption
} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;

const optionsLevel = [
    {label:"Level Kedua (2)", value:2},
    {label:"Level Ketiga (3)", value:3}
];

class SaveParameterKualitatif extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            basic: false,
            dataoptionsrisk : [],
            dataoptionsratioindikatorkualitatif : [],
            dataoptionsingredientsdata : [],
            dataoptionsmasterversion: [],
            dataoptionsparameterfaktor: [],
            //state value
            paramparameter:'',
            paramlow:'',
            paramlowtomoderate:'',
            paramjenisnilai:'',
            parammoderate:'',
            parammoderatetohigh:'',
            paramhigh:'',
            parambobot:'',
            parampenomoran:'',
            paramlevel:'',
            paramindukparameter:'',
            paramrisk_id:'',
            paramindikatorpembilang:'',
            paramindikatorpenyebut:'',
            paramparameterfaktor: ''
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
            dataoptionsmasterversion,
            dataoptionsparameterfaktor,
            paramparameterfaktor
        } = this.state;
        const {token, addPropstate} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                          console.log("Values save parameter kualitatif : ");
                          console.log(values);
                          this.props.addParameterKualitatif(values.token, {
                            risk_id: values.risk_id,
                            name: values.name,
                            level: values.level,
                            induk_id: values.peringkatrisiko,
                            penomoran: values.penomoran,
                            pr_low: values.low,
                            pr_lowtomod: values.lowtomoderate,
                            pr_mod: values.moderate,
                            pr_modtohigh: values.moderatetohigh,
                            pr_high: values.high,
                            bobot: values.bobot,
                            parameter_faktor_id: values.parameter_faktor_id,
                            id_indikator_pembilang: 0,
                            id_indikator_penyebut: 0,
                            jenis_nilai_id: 4,
                            jenis: 'PR',
                            master_version_list: values.master_version_list
                          });
                        }
                    });
                }}>
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator('token', {
                            initialValue:token,
                            rules: [{
                                required: true, message: 'Please input token field.',
                            }],
                        })(
                            <Input id="token" type="hidden" placeholder="Input Token"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Risk">
                        {getFieldDecorator('risk_id', {
                            initialValue: addPropstate ? addPropstate.pkrisk_id : '',
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
                                          jenis: "PR",
                                          jenis_nilai_id: 4,
                                          risk_id: value
                                        }});
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
                            initialValue: addPropstate ? addPropstate.pkparameter : '',
                            rules: [{
                                required: true, message: 'Please input name field.',
                            }],
                        })(
                            <Input id="name" placeholder="Input Name"
                                   onChange={(e,value) =>{
                                       this.setState({
                                           paramparameter:e.target.value,
                                       });
                                   }}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Penomoran">
                        {getFieldDecorator('penomoran', {
                            initialValue: addPropstate ? addPropstate.pkpenomoran : '',
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
                            initialValue: addPropstate ? addPropstate.pklevel : '',
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
                            initialValue: addPropstate ? addPropstate.pkparameterfaktorid : '',
                            rules: [{
                                required: true, message: 'Please input parameter faktor',
                            }],
                        })(
                            <Select id="parameter_faktor_id"
                                    showSearch
                                    placeholder="Select parameter faktor"
                                    optionFilterProp="children"
                                    onChange={(value)=>{
                                        this.setState({
                                            paramparameterfaktor:value,
                                        });
                                    }}
                                    style={paramparameterfaktor === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                <Option value="" disabled>Select parameter faktor</Option>
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
                            initialValue: addPropstate ? addPropstate.pkindukparameter : '',
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
                            initialValue: addPropstate ? addPropstate.pkbobot : 0,
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
                            initialValue: addPropstate ? addPropstate.pklow : ''
                        })(
                            <Select id="low"
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
                                <Option value="" disabled>Select ratio indikator</Option>
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
                        {getFieldDecorator('lowtomoderate', {
                            initialValue: addPropstate ? addPropstate.pklowtomoderate : ''
                        })(
                            <Select id="lowtomoderate"
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
                                <Option value="" disabled>Select ratio indikator</Option>
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
                        {getFieldDecorator('moderate', {
                            initialValue: addPropstate ? addPropstate.pklmoderate : ''
                        })(
                            <Select id="moderate"
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
                                <Option value="" disabled>Select ratio indikator</Option>
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
                        {getFieldDecorator('moderatetohigh', {
                            initialValue: addPropstate ? addPropstate.pkmoderatetohigh : ''
                        })(
                            <Select id="moderatetohigh"
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
                                <Option value="" disabled>Select ratio indikator</Option>
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
                        {getFieldDecorator('high', {
                            initialValue: addPropstate ? addPropstate.pkhigh : ''
                        })(
                            <Select id="high"
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
                                <Option value="" disabled>Select ratio indikator</Option>
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
                                rparameter:addPropstate ? addPropstate.pkparameter ? addPropstate.pkparameter : paramparameter : paramparameter ,
                                rlow:addPropstate ? addPropstate.pklow ? addPropstate.pklow : paramlow : paramlow,
                                rlowtomoderate:addPropstate ? addPropstate.pklowtomoderate ? addPropstate.pklowtomoderate : paramlowtomoderate : paramlowtomoderate,
                                rmoderate:addPropstate ? addPropstate.pkmoderate ? addPropstate.pkmoderate : parammoderate : parammoderate,
                                rmoderatetohigh:addPropstate ? addPropstate.pkmoderatetohigh ? addPropstate.pkmoderatetohigh : parammoderatetohigh : parammoderatetohigh,
                                rhigh:addPropstate ? addPropstate.pkhigh ? addPropstate.pkhigh : paramhigh : paramhigh,
                                rbobot:addPropstate ? addPropstate.pkbobot ? addPropstate.pkbobot : parambobot : parambobot,
                                rpenomoran:addPropstate ? addPropstate.pkpenomoran ? addPropstate.pkpenomoran : parampenomoran : parampenomoran,
                                rlevel:addPropstate ? addPropstate.pklevel ? addPropstate.pklevel : paramlevel : paramlevel,
                                rindukparameter:addPropstate ? addPropstate.pkindukparameter ? addPropstate.pkindukparameter : paramindukparameter : paramindukparameter,
                                rrisk_id:addPropstate ? addPropstate.pkrisk_id ? addPropstate.pkrisk_id : paramrisk_id : paramrisk_id,
                                rjenisnilai:addPropstate ? addPropstate.pkjenisnilai ? addPropstate.pkjenisnilai : paramjenisnilai : paramjenisnilai,
                                rindikatorpenyebut:addPropstate ? addPropstate.pkindikatorpenyebut ? addPropstate.pkindikatorpenyebut : paramindikatorpenyebut : paramindikatorpenyebut,
                                rindikatorpembilang:addPropstate ? addPropstate.pkindikatorpembilang ? addPropstate.pkindikatorpembilang : paramindikatorpembilang : paramindikatorpembilang,
                                raddtrue : true,
                            }}
                        }>Tambah Parameter Ratio Indikator</Link>
                    </FormItem>

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
        );
    }

}

const WrappedSaveParameterKualitatif = Form.create()(SaveParameterKualitatif);

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
    const {masterversionsdata} = masterversion;
    const {ingredientsdata} = ingredients;
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
      addparameterkualitatifresult,
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
  resetAddParameterKualitatif,
  fetchAllIngredients,
  fetchAllMasterVersion,
  addParameterKualitatif,
  getAllFaktorParameterDataOption
})(WrappedSaveParameterKualitatif);
export {optionsLevel};
