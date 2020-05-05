import React from "react";
import connect from "react-redux/es/connect/connect";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import {getAllRisks,getAllPeringkatRisiko} from "../../../../appRedux/actions/index";
import {optionsLevel} from "./SaveParameterManual";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;

class EditParameterManual extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            basic: false,
            ewarning: false,
            dataoptionsrisk : [],
            dataoptionspringkatrisiko : [],
            propsvalue : [],
            propsid : props.eid
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionspringkatrisiko : nextProps.getallperingkatrisiko
        });
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

        const {dataoptionsrisk,dataoptionspringkatrisiko,dataoptionslevel,basic} = this.state;
        const {fetchdata, token} = this.props;
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
                                                initialValue:prop.parameter,
                                                rules: [{
                                                    required: true, message: 'Please input name field.',
                                                }],
                                            })(
                                                <Input id="name" placeholder="Input Name"/>
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
                                            {getFieldDecorator('peringkatrisiko', {
                                                initialValue:prop.indukparameter,
                                                rules: [{
                                                    required: true, message: 'Please input induk/parameter field.',
                                                }],
                                            })(
                                                <Select id="peringkatrisiko"
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

                                        <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Peringkat Risiko</label><br/>
                                        <FormItem {...formItemLayout} label="Low">
                                            {getFieldDecorator('low', {
                                                initialValue:prop.low,
                                                rules: [{
                                                    required: true, message: 'Please input low field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Low"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Low to Moderate">
                                            {getFieldDecorator('lowtomoderate', {
                                                initialValue:prop.lowtomoderate,
                                                rules: [{
                                                    required: true, message: 'Please input low to moderate field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Low to Moderate"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Moderate">
                                            {getFieldDecorator('moderate', {
                                                initialValue:prop.moderate,
                                                rules: [{
                                                    required: true, message: 'Please input moderate field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Moderate"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Moderate to High">
                                            {getFieldDecorator('moderatetohigh', {
                                                initialValue:prop.moderatetohigh,
                                                rules: [{
                                                    required: true, message: 'Please input moderate to high field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Moderate to High"
                                                             className="w-100"
                                                             min={0}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="High">
                                            {getFieldDecorator('high', {
                                                initialValue:prop.high,
                                                rules: [{
                                                    required: true, message: 'Please input high field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input High"
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

const WrappedEditParameterManual = Form.create()(EditParameterManual);

const mapStateToProps = ({auth, jenisrisiko, peringkatrisiko}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    return {token,getallrisks,getallperingkatrisiko}
};

export default connect(mapStateToProps, {getAllRisks,getAllPeringkatRisiko})(WrappedEditParameterManual);