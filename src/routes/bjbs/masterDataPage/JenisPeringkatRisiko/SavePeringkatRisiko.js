import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
import connect from "react-redux/es/connect/connect";
import {getAllPeringkatRisiko, postPeringkatRisiko, resetPostPeringkatRisiko, jenisNilaiParam} from "../../../../appRedux/actions";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsPenilaian = [
    {text:"Kuantitatif (Naik)", value:"1"},
    {text:"Kuantitatif (Turun)", value:"2"},
    {text:"Kualitatif", value:"3"}
];

class SavePeringkatRisiko extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : optionsPenilaian,
            statuspost: ''
        }
    }

    componentDidMount(){
        this.props.jenisNilaiParam({token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statuspost : nextProps.statuspostperingkatrisiko,
            dataoptions : nextProps.jenisnilaiparam
        });

        if (nextProps.statuspostperingkatrisiko === 201 || nextProps.statuspostperingkatrisiko === 200){
            this.props.clickAddSuccessButton(nextProps.statuspostperingkatrisiko);
            this.props.resetPostPeringkatRisiko();
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
                            this.props.postPeringkatRisiko(values);
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

                    <FormItem {...formItemLayout} label="Jenis Penilaian">
                        {getFieldDecorator('id_jenis_nilai', {
                            rules: [{
                                required: true, message: 'Please input jenis penilaian field.',
                            }],
                        })(
                            <Select id="id_jenis_nilai"
                                    showSearch
                                    placeholder="Select Jenis Penilaian"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {
                                    dataoptions.map((prop, index) => {
                                        var value = prop.value;
                                        var label = prop.text;
                                        return (
                                            <Option value={value}>{label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Description">
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: 'Please input description field.',
                            }],
                        })(
                            <TextArea id="description" placeholder="Input Description"/>
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

const WrapperSavePeringkatRisiko = Form.create()(SavePeringkatRisiko);

const mapStateToProps = ({auth, peringkatrisiko, masterparameter}) => {
    const {token} = auth;
    const {statuspostperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    return {token, statuspostperingkatrisiko, jenisnilaiparam};
};

export default connect(mapStateToProps, {getAllPeringkatRisiko,postPeringkatRisiko,resetPostPeringkatRisiko,jenisNilaiParam})(WrapperSavePeringkatRisiko);