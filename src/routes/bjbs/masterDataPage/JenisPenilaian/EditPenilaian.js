import React from "react";
import {Button, Input, Form, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import IntlMessages from "util/IntlMessages";
import {updateJenisPenilaian, getAllJenisPenilaian, resetPutJenisPenilaian, getJenisPenilaian} from "../../../../appRedux/actions";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const {TextArea} = Input;

class EditPenilaian extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ewarning: false,
            datavalue:[],
            statusput:'',
            propsvalue : [],
            propsid : props.eid
        }
    }

    componentWillMount(){
        this.props.getJenisPenilaian({id:this.props.eid, token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statusput : nextProps.statusputjenispenilaian,
            propsvalue : nextProps.getjenispenilaian
        });

        if (nextProps.statusputjenispenilaian === 200 || nextProps.statusputjenispenilaian === 201){
            this.props.clickEditSuccessButton(nextProps.statusputjenispenilaian);
            this.props.resetPutJenisPenilaian();
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

        const {ewarning, datavalue, propsvalue} = this.state;
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
                            return (
                                <div key={index}>
                                    <Spin spinning={propsvalue.id ? false : true} tip="Loading...">
                                        <FormItem {...formItemLayout}>
                                            {getFieldDecorator('id', {
                                                initialValue:propsvalue.id,
                                                rules: [{
                                                    required: true, message: 'Please input id field.',
                                                }],
                                            })(
                                                <Input id="id" type="hidden" placeholder="Input Id"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Name">
                                            {getFieldDecorator('name', {
                                                initialValue:propsvalue.name,
                                                rules: [{
                                                    required: true, message: 'Please input name field.',
                                                }],
                                            })(
                                                <Input id="name" placeholder="Input Name"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Description">
                                            {getFieldDecorator('description', {
                                                initialValue:propsvalue.description,
                                                rules: [{
                                                    required: true, message: 'Please input jenis description field.',
                                                }],
                                            })(
                                                <TextArea id="description" placeholder="Input description"/>
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
                                 confirmBtnText={'Yes, updated it!'}
                                 confirmBtnBsStyle="danger"
                                 cancelBtnBsStyle="default"
                                 title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                                 onConfirm={()=>{
                                     this.setState({
                                         ewarning: false
                                     });
                                     this.props.updateJenisPenilaian(datavalue);
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

const WrapperdEditPenilaian = Form.create()(EditPenilaian);

const mapStateToProps = ({auth, jenispenilaian}) => {
    const {token} = auth;
    const {statusputjenispenilaian,getjenispenilaian} = jenispenilaian;
    return {token,statusputjenispenilaian,getjenispenilaian}

};

export default connect(mapStateToProps, {updateJenisPenilaian, getAllJenisPenilaian, resetPutJenisPenilaian, getJenisPenilaian})(WrapperdEditPenilaian);