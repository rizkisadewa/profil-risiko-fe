import React from "react";
import {Button, Form, Input} from "antd";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;

class UbahPin extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                console.log('Received values of form: ',value);
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty : this.state.confirmDirty || !!value
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty){
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="gx-login-container">
                <div className="gx-login-content">
                    <div className="gx-login-header">
                        <img src={require("assets/images/logobjbs-old.png")} className="gx-logo-size" alt="bjbs" title="bjbs"/>
                    </div>
                    <div className="gx-mb-4">
                        <h2><IntlMessages id="sidebar.profileuser.ubahpin"/></h2>
                        <p><IntlMessages id="appModule.enterPinReset"/></p>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
                        <FormItem>
                            {getFieldDecorator('old', {
                                rules: [{
                                    required: true, message: 'Please input your old pin!',
                                }],
                            })(
                                <Input type="password" placeholder="Old PIN" maxLength={6}/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your pin!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" placeholder="New PIN" maxLength={6}/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your pin!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input placeholder="Retype New Pin" type="password" onBlur={this.handleConfirmBlur} maxLength={6}/>
                            )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                Ubah
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const WrapperdForgotPasswordForm = Form.create()(UbahPin);

export default (WrapperdForgotPasswordForm);
