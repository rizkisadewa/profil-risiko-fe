import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  getAllRisks,
  getAllPeringkatRisiko,
  postParameterManual,
  resetPostParameterManual,
  getAllFaktorParameter
} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;

const optionsLevel = [
    {label:"Level Kedua (2)", value:2},
    {label:"Level Ketiga (3)", value:3},
    {label:"Level Keempat (4)", value:4},
    {label:"Level Kelima (5)", value:5}
];

class SaveParameterManual extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            basic: false,
            dataoptionsrisk : [],
            dataoptionspringkatrisiko : [],
            statuspost: ''
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
        this.props.getAllFaktorParameter({
          token:this.props.token,
          risk_id:this.state.risk_id,
          name:this.state.paramname,
          bobot:this.state.parambobot,
          risk_nama:this.state.paramriskname
        });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionspringkatrisiko : nextProps.getallperingkatrisiko,
            statuspost: nextProps.statuspostparametermanual
        });

        if (nextProps.statuspostparametermanual === 201 || nextProps.statuspostparametermanual === 200){
            this.props.clickAddSuccessButton(nextProps.statuspostparametermanual);
            this.props.resetPostParameterManual();
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };

        const {dataoptionsrisk,dataoptionspringkatrisiko,dataoptionslevel,basic} = this.state;
        const {token} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            this.props.postParameterManual(values);
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

                    <FormItem {...formItemLayout} label="Risk">
                        {getFieldDecorator('risk_id', {
                            rules: [{
                                required: true, message: 'Please input risk field.',
                            }],
                        })(
                            <Select id="risk_id"
                                    showSearch
                                    placeholder="Select risk"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {
                                    dataoptionsrisk.map((prop, index) => {
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
                            rules: [{
                                required: true, message: 'Please input penomoran field.'
                            }],
                        })(
                            <Input id="penomoran" placeholder="Input Penomoran"
                                         className="w-100"
                                         maxLength={2}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Name">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input name field.',
                            }],
                        })(
                            <Input id="name" placeholder="Input name"/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Level">
                        {getFieldDecorator('level', {
                            rules: [{
                                required: true, message: 'Please input level field.',
                            }],
                        })(
                            <Select id="level"
                                    showSearch
                                    placeholder="Select level"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {
                                    dataoptionslevel.map((prop, index) => {
                                        var value = prop.value;
                                        var label = prop.label;
                                        return (
                                            <Option value={value} key={index}>{label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Induk/Parameter">
                        {getFieldDecorator('induk_id', {
                            rules: [{
                                required: true, message: 'Please input induk/parameter field.',
                            }],
                        })(
                            <Select id="induk_id"
                                    showSearch
                                    placeholder="Select induk/parameter"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                {
                                    dataoptionspringkatrisiko.map((prop, index) => {
                                        var value = prop.id;
                                        var label = prop.name;
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
                            initialValue: 0,
                            rules: [{
                                required: true, message: 'Please input bobot field.'
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

                    <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Peringkat Risiko</label><br/>
                    <FormItem {...formItemLayout} label="Low">
                        {getFieldDecorator('pr_low', {
                            rules: [{type:"number", message: 'Input must be number type.'}],
                        })(
                            <InputNumber id="pr_low" placeholder="Input Low"
                                         className="w-100"
                                         min={0}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Low to Moderate">
                        {getFieldDecorator('pr_lowtomod', {
                            rules: [{type:"number", message: 'Input must be number type.'}],
                        })(
                            <InputNumber id="pr_lowtomod" placeholder="Input Low to Moderate"
                                         className="w-100"
                                         min={0}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Moderate">
                        {getFieldDecorator('pr_mod', {
                            rules: [{type:"number", message: 'Input must be number type.'}],
                        })(
                            <InputNumber id="pr_mod" placeholder="Input Moderate"
                                         className="w-100"
                                         min={0}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Moderate to High">
                        {getFieldDecorator('pr_modtohigh', {
                            rules: [{type:"number", message: 'Input must be number type.'}],
                        })(
                            <InputNumber id="pr_modtohigh" placeholder="Input Moderate to High"
                                         className="w-100"
                                         min={0}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="High">
                        {getFieldDecorator('pr_high', {
                            rules: [{type:"number", message: 'Input must be number type.'}],
                        })(
                            <InputNumber id="pr_high" placeholder="Input High"
                                         className="w-100"
                                         min={0}
                            />
                        )}
                    </FormItem>

                    <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                        <Button onClick={this.props.clickCancelAddButton}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>

                    <SweetAlerts show={basic}
                         customClass="gx-sweet-alert-top-space"
                         title={"Input must be 0-100 %"}
                         onConfirm={()=>{
                             this.setState({
                                 basic: false,
                             })
                     }}/>
                </Form>
            </>
        );
    }

}

const WrappedSaveParameterManual = Form.create()(SaveParameterManual);

const mapStateToProps = ({auth, jenisrisiko, peringkatrisiko, parameterfaktor, parametermanual}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {statuspostparametermanual} = parametermanual;
    const {getallparameterfaktor} = parameterfaktor;
    return {token,getallrisks,getallperingkatrisiko,statuspostparametermanual,getallparameterfaktor}
};

export default connect(mapStateToProps, {
  getAllRisks,
  getAllPeringkatRisiko,
  postParameterManual,
  resetPostParameterManual,
  getAllFaktorParameter
})(WrappedSaveParameterManual);
export {optionsLevel};
