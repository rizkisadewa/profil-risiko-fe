import React from "react";
import {Button, Modal, Input, Form} from "antd";

import connect from "react-redux/es/connect/connect";
import {updateRisk} from "../../../../appRedux/actions";
import IntlMessages from "util/IntlMessages";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const {TextArea} = Input;


class EditJenisRisiko extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            ewarning: false,
            datavalue:[]
        };
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

        const {ewarning, datavalue} = this.state;
        const {fetchdata, token} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <>
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
                            return(
                                <div key={index}>
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

                                    <FormItem {...formItemLayout} label="Nama">
                                        {getFieldDecorator('nama', {
                                            initialValue:prop.nama,
                                            rules: [{
                                                required: true, message: 'Please input nama field.',
                                            }],
                                        })(
                                            <Input id="nama" placeholder="Input Nama"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout} label="Keterangan">
                                        {getFieldDecorator('keterangan', {
                                            initialValue:prop.keterangan,
                                            rules: [{
                                                required: true, message: 'Please input keterangan field.',
                                            }],
                                        })(
                                            <TextArea id="keterangan" placeholder="Input Keterangan"/>
                                        )}
                                    </FormItem>

                                    <FormItem {...formItemLayout} label="Jenis">
                                        {getFieldDecorator('jenis', {
                                            initialValue:prop.jenis,
                                            rules: [{
                                                required: true, message: 'Please input jenis field.',
                                            }],
                                        })(
                                            <Input id="jenis" placeholder="Input Jenis"/>
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
                        <Button type="primary" htmlType="submit">Edit</Button>
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
                                     this.props.updateRisk(datavalue);
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
            </>
        );
    }
}

const WrapperdEditJenisRisiko = Form.create()(EditJenisRisiko);

const mapStateToProps = ({auth,tabledata}) => {
    const {token} = auth;
    const {getallrisks} = tabledata;
    return {token, getallrisks}
};

export default connect(mapStateToProps, {updateRisk})(WrapperdEditJenisRisiko);

