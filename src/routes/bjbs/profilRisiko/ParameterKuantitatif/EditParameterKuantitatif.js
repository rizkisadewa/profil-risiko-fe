import React from "react";
import connect from "react-redux/es/connect/connect";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikator,
  updateParameterKuantitatif,
  resetUpdateParameterKuantitatif,
  fetchAllParameterKuantitatif
} from "../../../../appRedux/actions/index";
import {optionsLevel} from "./SaveParameterKuantitatif";
import SweetAlerts from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;
const Option = Select.Option;

class EditParameterKuantitatif extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            basic: false,
            ewarning: false,
            dataoptionsrisk : [],
            dataoptionspringkatrisiko : [],
            dataoptionsratioindikator : [],
            dataoptions : [],
            datavalue: [],
            //state value
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
            statusput : ''

        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
        this.props.jenisNilaiParam({token:this.props.token});
        this.props.getAllRatioIndikator({token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionspringkatrisiko : nextProps.getallperingkatrisiko,
            dataoptions : nextProps.jenisnilaiparam,
            dataoptionsratioindikator : nextProps.getallratioindikator,
            statusput: nextProps.updateparameterkuantitatifresult
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
          dataoptionspringkatrisiko,
          dataoptionsratioindikator,
          dataoptions,
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
          paramindikatorpembilang,
          paramindikatorpenyebut,
          datavalue
        } = this.state;
        const {fetchdata, token} = this.props;
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

                                  <FormItem {...formItemLayout} label="Induk/Parameter">
                                      {getFieldDecorator('induk_id', {
                                          initialValue: prop.induk_id,
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
                                                  dataoptionspringkatrisiko.map((prop, index) => {
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

                                                      if (label === 'Kuantitatif (Naik)' || label === 'Kuantitatif (Turun)'){
                                                          return (
                                                              <Option value={value} key={index}>{label}</Option>
                                                          )
                                                      } else {
                                                          return '';
                                                      }
                                                  })
                                              }
                                          </Select>
                                      )}
                                  </FormItem>

                                  <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Peringkat Risiko</label><br/>
                                  <FormItem {...formItemLayout} label="Low">
                                      {getFieldDecorator('pr_low', {
                                          initialValue: prop.pr_low,
                                          rules: [{
                                              required: true, message: 'Please input low field.'
                                          },{type:"number", message: 'Input must be number type.'}],
                                      })(
                                          <InputNumber id="pr_low" placeholder="Input Low"
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
                                      {getFieldDecorator('pr_lowtomod', {
                                          initialValue: prop.pr_lowtomod,
                                          rules: [{
                                              required: true, message: 'Please input low to moderate field.'
                                          },{type:"number", message: 'Input must be number type.'}],
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
                                          initialValue: prop.pr_mod,
                                          rules: [{
                                              required: true, message: 'Please input moderate field.'
                                          },{type:"number", message: 'Input must be number type.'}],
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
                                          initialValue: prop.pr_modtohigh,
                                          rules: [{
                                              required: true, message: 'Please input moderate to high field.'
                                          },{type:"number", message: 'Input must be number type.'}],
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
                                          initialValue: prop.pr_high,
                                          rules: [{
                                              required: true, message: 'Please input high field.'
                                          },{type:"number", message: 'Input must be number type.'}],
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

                                  <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Indikator Ratio/Ukuran</label><br/>
                                  <FormItem {...formItemLayout} label="Indikator Pembilang">
                                      {getFieldDecorator('id_indikator_pembilang', {
                                          initialValue: prop.id_indikator_pembilang,
                                          rules: [{
                                              required: true, message: 'Please input indikator pembilang field.',
                                          }],
                                      })(
                                          <Select id="id_indikator_pembilang"
                                                  showSearch
                                                  placeholder="Select indikator pembilang"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      this.setState({
                                                          paramindikatorpembilang:value
                                                      });
                                                  }}
                                                  style={paramindikatorpembilang === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                          >
                                              <Option value="" disabled>Select indikator penyebut</Option>
                                              {
                                                  dataoptionsratioindikator.map((prop, index) => {
                                                      var value = prop.id;
                                                      var label = prop.name;
                                                      return (
                                                          <Option value={value} key={index}>{label}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                      <Link to={{pathname:'/bjbs/masterdata/ratioindikator',
                                          ratioProps:{
                                              rparameter:paramparameter ,
                                              rlow:paramlow,
                                              rlowtomoderate:paramlowtomoderate,
                                              rmoderate:parammoderate,
                                              rmoderatetohigh:parammoderatetohigh,
                                              rhigh:paramhigh,
                                              rbobot:parambobot,
                                              rpenomoran:parampenomoran,
                                              rlevel:paramlevel,
                                              rindukparameter:paramindukparameter,
                                              rrisk_id:paramrisk_id,
                                              rjenisnilai:paramjenisnilai,
                                              rindikatorpenyebut:paramindikatorpenyebut,
                                              rindikatorpembilang:paramindikatorpembilang,
                                              rid:prop.risk_id,
                                              redittrue : true,
                                          }}
                                      }>Tambah Parameter</Link>
                                  </FormItem>

                                  <FormItem {...formItemLayout} label="Indikator Penyebut">
                                      {getFieldDecorator('id_indikator_penyebut', {
                                          initialValue: prop.id_indikator_penyebut,
                                          rules: [{
                                              required: true, message: 'Please input indikator penyebut field.',
                                          }],
                                      })(
                                          <Select id="id_indikator_penyebut"
                                                  showSearch
                                                  placeholder="Select indikator penyebut"
                                                  optionFilterProp="children"
                                                  onChange={(value)=>{
                                                      this.setState({
                                                          paramindikatorpenyebut:value
                                                      });
                                                  }}
                                                  style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                          >
                                              <Option value="" disabled>Select indikator penyebut</Option>
                                              {
                                                  dataoptionsratioindikator.map((prop, index) => {
                                                      var value = prop.id;
                                                      var label = prop.name;
                                                      return (
                                                          <Option value={value} key={index}>{label}</Option>
                                                      )
                                                  })
                                              }
                                          </Select>
                                      )}
                                      <Link to={{pathname:'/bjbs/masterdata/ratioindikator',
                                          ratioProps:{
                                              rparameter:paramparameter ,
                                              rlow:paramlow,
                                              rlowtomoderate:paramlowtomoderate,
                                              rmoderate:parammoderate,
                                              rmoderatetohigh:parammoderatetohigh,
                                              rhigh:paramhigh,
                                              rbobot:parambobot,
                                              rpenomoran:parampenomoran,
                                              rlevel:paramlevel,
                                              rindukparameter:paramindukparameter,
                                              rrisk_id:paramrisk_id,
                                              rjenisnilai:paramjenisnilai,
                                              rindikatorpenyebut:paramindikatorpenyebut,
                                              rindikatorpembilang:paramindikatorpembilang,
                                              rid:prop.risk_id,
                                              redittrue : true,
                                          }}
                                      }>Tambah Parameter</Link>
                                  </FormItem>

                                  <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                                      {/*<Button onClick={this.props.clickCancelEditButton}>Cancel</Button>*/}
                                      <Link className="ant-btn" to={{pathname:'/bjbs/profilrisiko/parameterkuantitatif', cancelProps:{
                                              propscancel:true
                                          }}}>Cancel</Link>
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

const WrappedEditParameterKuantitatif = Form.create()(EditParameterKuantitatif);

const mapStateToProps = ({auth, jenisrisiko, peringkatrisiko, masterparameter, ratioindikator, parameterkuantitatif}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    const {getallratioindikator} = ratioindikator;
    const {updateparameterkuantitatifresult} = parameterkuantitatif;
    return {
      token,
      getallrisks,
      getallperingkatrisiko,
      jenisnilaiparam,
      getallratioindikator,
      updateparameterkuantitatifresult
    }
};

export default connect(mapStateToProps, {
  getAllRisks,
  getAllPeringkatRisiko,
  jenisNilaiParam,
  getAllRatioIndikator,
  updateParameterKuantitatif,
  resetUpdateParameterKuantitatif,
  fetchAllParameterKuantitatif
})(WrappedEditParameterKuantitatif);
