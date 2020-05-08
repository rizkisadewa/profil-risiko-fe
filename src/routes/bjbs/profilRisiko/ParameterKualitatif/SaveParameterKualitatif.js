import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import {getAllRisks,getAllPeringkatRisiko,jenisNilaiParam,getAllRatioIndikator} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;

const optionsLevel = [
    {label:"Level Kedua (2)", value:2},
    {label:"Level Ketiga (3)", value:3},
    {label:"Level Keempat (4)", value:4},
    {label:"Level Kelima (5)", value:5}
];

class SaveParameterKualitatif extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          dataoptionslevel : optionsLevel,
          basic: false,
          dataoptionsrisk : [],
          dataoptionspringkatrisiko : [],
          dataoptions : [],
          dataoptionsratioindikator : [],
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
          dataoptionsratioindikator : nextProps.getallratioindikator
      });
  }

  ender() {
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

      const {dataoptionsrisk,dataoptionspringkatrisiko,dataoptionslevel,basic,dataoptions,dataoptionsratioindikator,
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
      } = this.state;
      const {token, addPropstate} = this.props;
      const {getFieldDecorator} = this.props.form;

      return (
          <>
              <Form onSubmit={(e)=>{
                  e.preventDefault();
                  this.props.form.validateFields((err, values) => {
                      if (!err) {
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

                  <FormItem {...formItemLayout} label="Penomoran">
                      {getFieldDecorator('penomoran', {
                          initialValue: addPropstate ? addPropstate.pkpenomoran : '',
                          rules: [{
                              required: true, message: 'Please input penomoran field.'
                          },{type:"number", message: 'Input must be number type.'}],
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

                  <FormItem {...formItemLayout} label="Induk/Parameter">
                      {getFieldDecorator('peringkatrisiko', {
                          initialValue: addPropstate ? addPropstate.pkindukparameter : '',
                          rules: [{
                              required: true, message: 'Please input induk/parameter field.',
                          }],
                      })(
                          <Select id="peringkatrisiko"
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

                  <FormItem {...formItemLayout} label="Jenis Penilaian">
                      {getFieldDecorator('id_jenis_nilai', {
                          initialValue: addPropstate ? addPropstate.pkjenisnilai : '',
                          rules: [{
                              required: true, message: 'Please input jenis penilaian field.',
                          }],
                      })(
                          <Select id="id_jenis_nilai"
                                  showSearch
                                  placeholder="Select Jenis Penilaian"
                                  optionFilterProp="children"
                                  onChange={(value)=>{
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
                      {getFieldDecorator('low', {
                          initialValue: addPropstate ? addPropstate.pklow : '',
                          rules: [{
                              required: true, message: 'Please input low field.'
                          },{type:"number", message: 'Input must be number type.'}],
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
                          initialValue: addPropstate ? addPropstate.pklowtomoderate : '',
                          rules: [{
                              required: true, message: 'Please input low to moderate field.'
                          },{type:"number", message: 'Input must be number type.'}],
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
                          initialValue: addPropstate ? addPropstate.pkmoderate : '',
                          rules: [{
                              required: true, message: 'Please input moderate field.'
                          },{type:"number", message: 'Input must be number type.'}],
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
                          initialValue: addPropstate ? addPropstate.pkmoderatetohigh : '',
                          rules: [{
                              required: true, message: 'Please input moderate to high field.'
                          },{type:"number", message: 'Input must be number type.'}],
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
                          initialValue: addPropstate ? addPropstate.pkhigh : '',
                          rules: [{
                              required: true, message: 'Please input high field.'
                          },{type:"number", message: 'Input must be number type.'}],
                      })(
                          <InputNumber id="low" placeholder="Input High"
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
                      {getFieldDecorator('indikatorpembilang', {
                          initialValue: addPropstate ? addPropstate.pkindikatorpembilang : '',
                          rules: [{
                              required: true, message: 'Please input indikator pembilang field.',
                          }],
                      })(
                          <Select id="indikatorpembilang"
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
                              <Option value="" disabled>Select indikator pembilang</Option>
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
                      }>Tambah Parameter</Link>
                  </FormItem>

                  <FormItem {...formItemLayout} label="Indikator Penyebut">
                      {getFieldDecorator('indikatorpenyebut', {
                          initialValue: addPropstate ? addPropstate.pkindikatorpenyebut : '',
                          rules: [{
                              required: true, message: 'Please input indikator penyebut field.',
                          }],
                      })(
                          <Select id="indikatorpenyebut"
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
                      }>Tambah Parameter</Link>
                  </FormItem>

                  <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                      <Link className="ant-btn" to={{pathname:'/bjbs/profilrisiko/parameterkuantitatif', cancelProps:{
                              propscancel:true
                          }}}>Cancel</Link>
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

const mapStateToProps = ({auth, jenisrisiko, peringkatrisiko, masterparameter, ratioindikator}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    const {getallratioindikator} = ratioindikator;
    return {token,getallrisks,getallperingkatrisiko,jenisnilaiparam,getallratioindikator}
};

export default connect(mapStateToProps, {getAllRisks,getAllPeringkatRisiko,jenisNilaiParam,getAllRatioIndikator})(WrappedSaveParameterKualitatif);
export {optionsLevel};
