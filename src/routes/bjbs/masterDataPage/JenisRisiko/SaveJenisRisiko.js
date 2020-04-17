import React from "react";
import {Button, Input, Form} from "antd";
import connect from "react-redux/es/connect/connect";
import {addRisk} from "../../../../appRedux/actions";

const FormItem = Form.Item;
const {TextArea} = Input;


class SaveJenisRisiko extends React.PureComponent{
    constructor(props) {
        super(props);
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

        const {token, getallrisks} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            this.props.addRisk(values);
                            this.props.clickAddSuccessButton();
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

                    <FormItem {...formItemLayout} label="Nama">
                        {getFieldDecorator('nama', {
                            rules: [{
                                required: true, message: 'Please input nama field.',
                            }],
                        })(
                            <Input id="nama" placeholder="Input Nama"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Keterangan">
                        {getFieldDecorator('keterangan', {
                            rules: [{
                                required: true, message: 'Please input keterangan field.',
                            }],
                        })(
                            <TextArea id="keterangan" placeholder="Input Keterangan"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Jenis">
                        {getFieldDecorator('jenis', {
                            rules: [{
                                required: true, message: 'Please input jenis field.',
                            }],
                        })(
                            <Input id="jenis" placeholder="Input Jenis"/>
                        )}
                    </FormItem>

                    <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                        <Button onClick={this.props.clickCancelAddButton}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </>
        );
    }
}

const WrappedSaveRisk = Form.create()(SaveJenisRisiko);

const mapStateToProps = ({auth, tabledata}) => {
    const {token} = auth;
    const {getallrisks} = tabledata;
    return {token,getallrisks}
};

export default connect(mapStateToProps, {addRisk})(WrappedSaveRisk);

