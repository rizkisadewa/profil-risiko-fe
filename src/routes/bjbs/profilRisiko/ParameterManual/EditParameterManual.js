import React from "react";
import connect from "react-redux/es/connect/connect";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import {updateParameterManual, getAllRisks,getAllPeringkatRisiko , resetPutParameterManual, getParameterManual} from "../../../../appRedux/actions/index";
import {optionsLevel} from "./SaveParameterManual";
import SweetAlerts from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;
const Option = Select.Option;

class EditParameterManual extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            ewarning: false,
            dataoptionsrisk : [],
            dataoptionspringkatrisiko : [],
            datavalue: [],
            propsid : props.eid,
            statusput:'',
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
    }

    componentWillMount(){
      this.props.getParameterManual({
        name: this.props.name,
        induk_id: this.props.induk_id,
        tahun: this.props.tahun,
        token: this.props.token
      })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            statusput: nextProps.statusputparametermanual,
            dataoptionspringkatrisiko : nextProps.getallperingkatrisiko,
        });

        if (nextProps.statusputparametermanual === 200 || nextProps.statusputparametermanual === 201) {
          this.props.clickEditSuccessButton(nextProps.statusputparametermanual);
          this.props.resetPutParameterManual();
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

        const {dataoptionsrisk,dataoptionspringkatrisiko,dataoptionslevel, datavalue, ewarning} = this.state;
        const {fetchdata, token} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
          <>
            <Form onSubmit={(e)=>{
                e.preventDefault();
                console.log(fetchdata);
                this.props.form.validateFields((err, values) => {
                    if (!err) {
                        this.setState({
                            ewarning: true,
                            datavalue: {
                              risk_id: values.risk_id,
                              penomoran: values.penomoran,
                              name: values.name,
                              level: values.level,
                              induk_id: values.induk_id,
                              bobot: values.bobot,
                              pr_low: values.pr_low,
                              pr_lowtomod: values.pr_lowtomod,
                              pr_mod: values.pr_mod,
                              pr_modtohigh: values.pr_modtohigh,
                              pr_high: values.pr_high
                            }
                        });
                    }
                });
            }}>
                    {
                        fetchdata.map((prop, index) =>{
                            return (
                                <div key={index}>
                                    <Spin spinning={prop.id ? false : true} tip="Loading...">

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
                                                initialValue:prop.risk_id,
                                                rules: [{
                                                    required: true, message: 'Please input risk field.',
                                                }],
                                            })(
                                                <Select id="risk_id"
                                                        showSearch
                                                        placeholder="Select risk"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                                                initialValue:prop.penomoran,
                                                rules: [{
                                                    required: true, message: 'Please input penomoran field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="penomoran" placeholder="Input Penomoran"
                                                             className="w-100"
                                                             min={0}
                                                             max={99}
                                                             maxLength={2}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Name">
                                            {getFieldDecorator('name', {
                                                initialValue:prop.name,
                                                rules: [{
                                                    required: true, message: 'Please input name field.',
                                                }],
                                            })(
                                                <Input id="name" placeholder="Input name"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Level">
                                            {getFieldDecorator('level', {
                                                initialValue:prop.level,
                                                rules: [{
                                                    required: true, message: 'Please input level field.',
                                                }],
                                            })(
                                                <Select id="level"
                                                        showSearch
                                                        placeholder="Select level"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                                                initialValue:prop.induk_id,
                                                rules: [{
                                                    required: true, message: 'Please input induk/parameter field.',
                                                }],
                                            })(
                                                <Select id="induk_id"
                                                        showSearch
                                                        placeholder="Select induk/parameter"
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                                                initialValue:prop.bobot,
                                                rules: [{
                                                    required: true, message: 'Please input bobot field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="bobot" placeholder="Input Bobot"
                                                             className="w-100"
                                                             min={0}
                                                             max={100}
                                                             formatter={value => `${value}%`}
                                                             parser={value => value.replace('%', '')}
                                                />
                                            )}
                                        </FormItem>

                                        <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Peringkat Risiko</label><br/>
                                        <FormItem {...formItemLayout} label="Low">
                                            {getFieldDecorator('pr_low', {
                                                initialValue:prop.pr_low,
                                                rules: [{
                                                    required: true, message: 'Please input low field.'
                                                }]
                                            })(
                                                <InputNumber id="pr_low" placeholder="Input Low"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Low to Moderate">
                                            {getFieldDecorator('pr_lowtomod', {
                                                initialValue:prop.pr_lowtomod,
                                                rules: [{
                                                    required: true, message: 'Please input low to moderate field.'
                                                }]
                                            })(
                                                <InputNumber id="pr_lowtomod" placeholder="Input Low to Moderate"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Moderate">
                                            {getFieldDecorator('pr_mod', {
                                                initialValue:prop.pr_mod,
                                                rules: [{
                                                    required: true, message: 'Please input moderate field.'
                                                }]
                                            })(
                                                <InputNumber id="pr_mod" placeholder="Input Moderate"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Moderate to High">
                                            {getFieldDecorator('pr_modtohigh', {
                                                initialValue:prop.pr_modtohigh,
                                                rules: [{
                                                    required: true, message: 'Please input moderate to high field.'
                                                }]
                                            })(
                                                <InputNumber id="pr_modtohigh" placeholder="Input Moderate to High"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="High">
                                            {getFieldDecorator('pr_high', {
                                                initialValue:prop.pr_high,
                                                rules: [{
                                                    required: true, message: 'Please input high field.'
                                                }]
                                            })(
                                                <InputNumber id="pr_high" placeholder="Input High"
                                                             className="w-100"
                                                             min={0}
                                                />
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
                                         ewarning: false,
                                     });
                                     this.props.updateParameterManual({
                                       name: fetchdata[0].name,
                                       induk_id: fetchdata[0].induk_id,
                                       tahun: fetchdata[0].tahun,
                                       token: token
                                     }, datavalue)
                                 }}
                                 onCancel={() => {
                                   this.setState({
                                     ewarning: false
                                   })
                                 }}
                    >
                         <IntlMessages id="sweetAlerts.youWillNotAble"/>
                     </SweetAlerts>
                </Form>
          </>

        );
    }
}

const WrappedEditParameterManual = Form.create()(EditParameterManual);

const mapStateToProps = ({auth, jenisrisiko, peringkatrisiko, parametermanual}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {statusputparametermanual, getparametermanual} = parametermanual;
    return {token,getallrisks,getallperingkatrisiko, statusputparametermanual, getparametermanual}
};

export default connect(mapStateToProps, {updateParameterManual, resetPutParameterManual, getAllRisks,getAllPeringkatRisiko, getParameterManual})(WrappedEditParameterManual);
