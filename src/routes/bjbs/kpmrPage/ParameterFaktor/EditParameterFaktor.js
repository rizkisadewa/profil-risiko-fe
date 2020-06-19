import React from "react";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import IntlMessages from "util/IntlMessages";
import {
  updateFaktorParameter,
  getAllRisks,
  resetPutFaktorParameter,
  getFaktorParameter,
  fetchAllMasterVersion,
  fetchAllParameterversion
} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsLevel = [
    {label:"Level Pertama (1)", value:1}
];

class EditParameterFaktor extends React.Component{
    constructor(props) {
        super(props);
        // this.handleProp=this.handleProp.bind(this);
        this.state = {
            dataoptions : [],
            dataoptionslevel : optionsLevel,
            ewarning: false,
            basic: false,
            datavalue:[],
            statusput:'',
            propsvalue : [],
            propsid : props.eid,
            paramjenisnilai: '',
            dataoptionsmasterversion: [],
            dataparameterversion: [],
            fetchdataparameterversion: [],
            history_parameter_version: []
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'KPMR', nama:'', keterangan:''});
        this.props.getFaktorParameter({id:this.props.eid, token:this.props.token});
        this.props.fetchAllMasterVersion({token: this.props.token});
        this.props.getFaktorParameter({id:this.props.eid, token:this.props.token});
        this.props.fetchAllParameterversion({token: this.props.token, searchData: {
          ingredients_id : this.props.fetchdata[0].id
        }});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            dataoptions : nextProps.getallrisks,
            statusput : nextProps.statusputparameterfaktor,
            propsvalue : nextProps.getparameterfaktor,
            dataoptionsmasterversion: nextProps.masterversionsdata,
            dataparameterversion: nextProps.parameterversiondata,
            history_parameter_version: nextProps.parameterversiondata,
            fetchdataparameterversion: []
        });

        if (nextProps.statusputparameterfaktor === 200 || nextProps.statusputparameterfaktor === 201){
            this.props.clickEditSuccessButton(nextProps.statusputparameterfaktor);
            this.props.resetPutFaktorParameter();
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 3},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 21},
            },
        };

        //looping all parameter version, push to array
        for(let i=0;i<this.state.dataparameterversion.length;i++){
          this.state.fetchdataparameterversion.push(this.state.dataparameterversion[i].version_id);
        }

        const {
          dataoptions,
          dataoptionslevel,
          ewarning,
          datavalue,
          basic,
          propsvalue,
          paramjenisnilai,
          dataoptionsmasterversion,
          dataparameterversion
        } = this.state;
        const {fetchdata, token} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={(e)=>{
                e.preventDefault();
                this.props.form.validateFields((err, values) => {
                    // CHECKING VALUES
                    console.log("***DATA VALUES");
                    values.history_parameter_version = this.state.history_parameter_version;
                    console.log(values);

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
                                <Spin spinning={propsvalue.risk_id ? false : true} tip="Loading...">

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
                                            initialValue:propsvalue.risk_id,
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
                                                {
                                                    dataoptions.map((prop, index) => {
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
                                            initialValue:propsvalue.penomoran,
                                            rules: [{
                                                required: true, message: 'Please input penomoran field.',
                                            }],
                                        })(
                                            <Input id="penomoran" placeholder="Input Penomoran" maxLength={2}/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout} label="Parameter">
                                        {getFieldDecorator('name', {
                                            initialValue:propsvalue.name,
                                            rules: [{
                                                required: true, message: 'Please input parameter field.',
                                            }],
                                        })(
                                            <TextArea id="name" placeholder="Input Parameter"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout} label="Level">
                                        {getFieldDecorator('level', {
                                            initialValue:propsvalue.level,
                                            rules: [{
                                                required: true, message: 'Please input level field.',
                                            }],
                                        })(
                                            <Select id="level"
                                                    showSearch
                                                    placeholder="Select level"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                {
                                                    dataoptionslevel.map((prop, index) => {
                                                        var value = prop.value;
                                                        var label = prop.label;
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
                                            initialValue: propsvalue.risk_id ? prop.bobot : 0,
                                            rules: [{
                                                required: true, message: 'Please input bobot field.',
                                            },{type:"number", message: 'Input must be number type.'}],
                                        })(
                                            <InputNumber id="bobot" placeholder="Input Bobot"
                                                         className="w-100"
                                                         min={0}
                                                         max={100}
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
                                            initialValue: this.state.fetchdataparameterversion,
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

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator('id', {
                                            initialValue:prop.id,
                                            rules: [{
                                                required: true, message: 'Please input id field.',
                                            }],
                                        })(
                                            <Input id="id" type="hidden" placeholder="Input Id"/>
                                        )}
                                    </FormItem>

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
                                     ewarning: false
                                 });
                                 this.props.updateFaktorParameter(datavalue);
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

const WrapperdEditParameterFaktor = Form.create()(EditParameterFaktor)

const mapStateToProps = ({
  auth,
  parameterfaktor,
  jenisrisiko,
  masterversion,
  parameterversion
}) => {
    const {token} = auth;
    const {statusputparameterfaktor,getparameterfaktor} = parameterfaktor;
    const {getallrisks} = jenisrisiko;
    const {masterversionsdata} = masterversion;
    const {parameterversiondata} = parameterversion;
    return {
      token,
      getallrisks,
      statusputparameterfaktor,
      getparameterfaktor,
      masterversionsdata,
      parameterversiondata
    }
};

export default connect(mapStateToProps, {
  updateFaktorParameter,
  getAllRisks,
  resetPutFaktorParameter,
  getFaktorParameter,
  fetchAllMasterVersion,
  fetchAllParameterversion
})(WrapperdEditParameterFaktor);
