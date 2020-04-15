import React from "react";
import {Button, Form, Input} from "antd";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;

class UbahPassword extends React.PureComponent{
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
                        <h2><IntlMessages id="sidebar.profileuser.ubahpassword"/></h2>
                        <p><IntlMessages id="appModule.enterPasswordReset"/></p>
                    </div>

                    <Form onSubmit={this.handleSubmit} className="gx-login-form gx-form-row0">
                        <FormItem>
                            {getFieldDecorator('old', {
                                rules: [{
                                    required: true, message: 'Please input your old password!',
                                }],
                            })(
                                <Input type="password" placeholder="Old Password"/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }, {
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password" placeholder="New Password"/>
                            )}
                        </FormItem>

                        <FormItem>
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input placeholder="Retype New Password" type="password" onBlur={this.handleConfirmBlur}/>
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

const WrapperdForgotPasswordForm = Form.create()(UbahPassword);

export default (WrapperdForgotPasswordForm);
