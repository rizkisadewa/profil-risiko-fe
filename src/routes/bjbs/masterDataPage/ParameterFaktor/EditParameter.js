import React from "react";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import IntlMessages from "util/IntlMessages";
import {updateFaktorParameter, getAllRisks, jenisNilaiParam, resetPutFaktorParameter, getFaktorParameter} from "../../../../appRedux/actions";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsLevel = [
    {label:"Level Pertama (1)", value:1},
    {label:"Level Kedua (2)", value:2}
];

class EditParameter extends React.PureComponent{
    constructor(props) {
        super(props);
        // this.handleProp=this.handleProp.bind(this);
        this.state = {
            dataoptions : [],
            dataoptionslevel : optionsLevel,
            ewarning: false,
            basic: false,
            datavalue:[],
            statusput:'',
            propsvalue : [],
            propsid : props.eid
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token});
    }

    componentWillMount(){
        this.props.getFaktorParameter({id:this.props.eid, token:this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            dataoptions : nextProps.getallrisks,
            statusput : nextProps.statusputparameterfaktor,
            propsvalue : nextProps.getparameterfaktor
        });

        if (nextProps.statusputparameterfaktor === 200 || nextProps.statusputparameterfaktor === 201){
            this.props.clickEditSuccessButton(nextProps.statusputparameterfaktor);
            this.props.resetPutFaktorParameter();
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

        const {dataoptions, dataoptionslevel, ewarning, datavalue, basic, propsvalue} = this.state;
        const {fetchdata, token} = this.props;
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
                            <Spin spinning={propsvalue.risk_id ? false : true} tip="Loading...">
                                <div key={index}>

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
                                        initialValue:propsvalue.risk_id,
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
                                        initialValue:propsvalue.penomoran,
                                        rules: [{
                                            required: true, message: 'Please input penomoran field.',
                                        }],
                                    })(
                                        <Input id="penomoran" placeholder="Input Penomoran" maxLength={2}/>
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} label="Parameter">
                                    {getFieldDecorator('name', {
                                        initialValue:propsvalue.name,
                                        rules: [{
                                            required: true, message: 'Please input parameter field.',
                                        }],
                                    })(
                                        <TextArea id="name" placeholder="Input Parameter"/>
                                    )}
                                </FormItem>

                                <FormItem {...formItemLayout} label="Level">
                                    {getFieldDecorator('level', {
                                        initialValue:propsvalue.level,
                                        rules: [{
                                            required: true, message: 'Please input level field.',
                                        }],
                                    })(
                                        <Select id="level"
                                                showSearch
                                                placeholder="Select level"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
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
                                        initialValue: propsvalue.risk_id ? prop.bobot : 0,
                                        rules: [{
                                            required: true, message: 'Please input bobot field.',
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
                            </div>
                            </Spin>
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
                             }}
                             onCancel={() => {
                                 this.setState({
                                     ewarning: false
                                 })
                             }}
                >
                    <IntlMessages id="sweetAlerts.youWillNotAble"/>
                </SweetAlerts>
                <SweetAlerts show={basic}
                             customClass="gx-sweet-alert-top-space"
                             title={"Input must be 0-100 %"}
                             onConfirm={()=>{
                                 this.setState({
                                     basic: false,
                                 })
                             }}/>
            </Form>
        );
    }

}

const WrapperdEditParameter = Form.create()(EditParameter);

const mapStateToProps = ({auth,parameterfaktor,jenisriko}) => {
    const {token} = auth;
    const {jenisnilaiparam,statusputparameterfaktor,getparameterfaktor} = parameterfaktor;
    const {getallrisks} = jenisriko;
    return {token, getallrisks, jenisnilaiparam,statusputparameterfaktor,getparameterfaktor}
};

export default connect(mapStateToProps, {updateFaktorParameter, getAllRisks, jenisNilaiParam, resetPutFaktorParameter, getFaktorParameter})(WrapperdEditParameter);