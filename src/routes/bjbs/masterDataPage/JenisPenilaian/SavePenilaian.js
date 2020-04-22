import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
import connect from "react-redux/es/connect/connect";
import {getAllJenisPenilaian, postJenisPenilaian, resetPostJenisPenilaian} from "../../../../appRedux/actions";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

class SavePenilaian extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            statuspost: ''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statuspost : nextProps.statuspostjenispenilaian,
        });

        if (nextProps.statuspostjenispenilaian === 201 || nextProps.statuspostjenispenilaian === 200){
            this.props.clickAddSuccessButton(nextProps.statuspostjenispenilaian);
            this.props.resetPostJenisPenilaian();
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

        const {dataoptions} = this.state;
        const {token} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            this.props.postJenisPenilaian(values);
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

                    <FormItem {...formItemLayout} label="Name">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input name field.',
                            }],
                        })(
                            <Input id="name" placeholder="Input Name"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Description">
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: 'Please input description field.',
                            }],
                        })(
                            <TextArea id="description" placeholder="Input description"/>
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

const WrapperSaveJenisPenilaian = Form.create()(SavePenilaian);

const mapStateToProps = ({auth, jenispenilaian}) => {
    const {token} = auth;
    const {statuspostjenispenilaian} = jenispenilaian;
    return {token, statuspostjenispenilaian};
};

export default connect(mapStateToProps, {getAllJenisPenilaian,postJenisPenilaian,resetPostJenisPenilaian})(WrapperSaveJenisPenilaian);