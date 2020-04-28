import React from "react";
import {Button, Input, Form, Select, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import IntlMessages from "util/IntlMessages";
import {updatePeringkatRisiko, getAllPeringkatRisiko, resetPutPeringkatRisiko, getPeringkatRisiko, jenisNilaiParam} from "../../../../appRedux/actions";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsPenilaian = [
    {text:"Kuantitatif (Naik)", value:"1"},
    {text:"Kuantitatif (Turun)", value:"2"},
    {text:"Kualitatif", value:"3"}
];

class EditPeringkatRisiko extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : optionsPenilaian,
            ewarning: false,
            datavalue:[],
            statusput:'',
            propsvalue : [],
            propsid : props.eid
        }
    }

    componentDidMount(){
        this.props.jenisNilaiParam({token:this.props.token});
    }

    componentWillMount(){
        this.props.getPeringkatRisiko({id:this.props.eid, token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptions : nextProps.jenisnilaiparam,
            statusput : nextProps.statusputperingkatrisiko,
            propsvalue : nextProps.getperingkatrisiko
        });

        if (nextProps.statusputperingkatrisiko === 200 || nextProps.statusputperingkatrisiko === 201){
            this.props.clickEditSuccessButton(nextProps.statusputperingkatrisiko);
            this.props.resetPutPeringkatRisiko();
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

        const {dataoptions, ewarning, datavalue, propsvalue} = this.state;
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

                                    <FormItem {...formItemLayout} label="Jenis Penilaian">
                                        {getFieldDecorator('id_jenis_nilai', {
                                            initialValue:propsvalue.id_jenis_nilai,
                                            rules: [{
                                                required: true, message: 'Please input jenis penilaian field.',
                                            }],
                                        })(
                                            <Select id="id_jenis_nilai"
                                                    showSearch
                                                    placeholder="Select jenis penilaian"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                {
                                                    dataoptions.map((prop, index) => {
                                                        var value = prop.value;
                                                        var label = prop.text;
                                                        return (
                                                            <Option value={value} key={index}>{label}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
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
                                </Spin>
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
                                     this.props.updatePeringkatRisiko(datavalue);
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

const WrapperdEditPeringkatRisiko = Form.create()(EditPeringkatRisiko);

const mapStateToProps = ({auth, peringkatrisiko, masterparameter}) => {
    const {token} = auth;
    const {statusputperingkatrisiko,getperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    return {token,statusputperingkatrisiko,getperingkatrisiko,jenisnilaiparam}

};

export default connect(mapStateToProps, {updatePeringkatRisiko,getAllPeringkatRisiko,resetPutPeringkatRisiko,getPeringkatRisiko,jenisNilaiParam})(WrapperdEditPeringkatRisiko);