import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
import {data} from "./../JenisRisiko/TableJenisRisiko";
import connect from "react-redux/es/connect/connect";
import IntlMessages from "util/IntlMessages";
import {updateFaktorParameter} from "../../../../appRedux/actions";
import {Redirect} from "react-router-dom";
import SweetAlerts from "react-bootstrap-sweetalert";
import {NotificationManager} from "react-notifications";

const FormItem = Form.Item;
const Option = Select.Option;

const options = data;
const optionsLevel = [
    {label:"Level Pertama (1)", value:1},
    {label:"Level Kedua (2)", value:2}
];

class EditParameter extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : options,
            dataoptionslevel : optionsLevel,
            ewarning: false,
            datavalue:[]
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

        const {dataoptions, dataoptionslevel, ewarning, datavalue} = this.state;
        const {fetchdata, token, putparameterfaktor} = this.props;
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
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('id', {
                                        initialValue:prop.id,
                                        rules: [{
                                            required: true, message: 'Please input id field.',
                                        }],
                                    })(
                                        <Input id="id" type="hidden" placeholder="Input Penomoran"/>
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
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {
                                                dataoptions.map((prop, index) => {
                                                    var value = prop.action;
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
                                            required: true, message: 'Please input penomoran field.',
                                        }],
                                    })(
                                        <Input id="penomoran" placeholder="Input Penomoran"/>
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} label="Parameter">
                                    {getFieldDecorator('name', {
                                        initialValue:prop.name,
                                        rules: [{
                                            required: true, message: 'Please input parameter field.',
                                        }],
                                    })(
                                        <Input id="name" placeholder="Input Parameter"/>
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
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                required>
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
                                        initialValue:prop.bobot,
                                        rules: [{
                                            required: true, message: 'Please input bobot field.',
                                        }],
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

                            </div>
                        );
                    })
                }

                <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                    <Button onClick={this.props.clickCancelEditButton}>Cancel</Button>
                    <Button type="primary" htmlType="submit">Save</Button>
                </FormItem>
                <SweetAlerts show={ewarning}
                             warning
                             showCancel
                             confirmBtnText={'Yes, updated it!'}
                             confirmBtnBsStyle="danger"
                             cancelBtnBsStyle="default"
                             title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                             onConfirm={()=>{
                                 this.setState({
                                     ewarning: false
                                 });
                                 this.props.updateFaktorParameter(datavalue);
                                 this.props.clickEditSuccessButton();
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
        );
    }

}

const WrapperdEditParameter = Form.create()(EditParameter);

const mapStateToProps = ({auth,tabledata}) => {
    const {token} = auth;
    return {token}
};

export default connect(mapStateToProps, {updateFaktorParameter})(WrapperdEditParameter);