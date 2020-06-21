import React from "react";
import {Button, Input, Form, Spin, Select} from "antd";
import connect from "react-redux/es/connect/connect";
import IntlMessages from "util/IntlMessages";
import {updateRatioIndikator, resetPutRatioIndikator, getRatioIndikator, jenisNilaiParam} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsJenis = [
    {label:"Risiko Inheren", value:"PR"},
    {label:"KPMR", value:"KPMR"}
];

class EditRatioIndikator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ewarning: false,
            datavalue:[],
            statusput:'',
            propsvalue : [],
            propsid : props.eid,
            dataoptions : [],
            jenis: '',
            jenisoptions: optionsJenis,
        }
    }

    componentWillMount(){
        this.props.getRatioIndikator({id:this.props.eid, token:this.props.token});
    }

    componentDidMount(){
        this.props.jenisNilaiParam({token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statusput : nextProps.statusputratioindikator,
            propsvalue : nextProps.getratioindikator,
            dataoptions : nextProps.jenisnilaiparam
        });

        if (nextProps.statusputratioindikator === 200 || nextProps.statusputratioindikator === 201){
            this.props.clickEditSuccessButton(nextProps.statusputratioindikator);
            this.props.resetPutRatioIndikator();
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

        const {ewarning, datavalue, propsvalue, dataoptions, jenisoptions, jenis} = this.state;
        const {fetchdata, token} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            e.preventDefault();
                            this.props.form.validateFields((err, values) => {
                                if (!err) {
                                    this.setState({
                                        ewarning: true,
                                        datavalue:values
                                    });
                                }
                            });
                        }
                    });
                }}>
                    {
                        fetchdata.map((prop, index) => {
                            return (
                                <div key={index}>
                                    <Spin spinning={propsvalue.id ? false : true} tip="Loading...">
                                        <FormItem {...formItemLayout}>
                                            {getFieldDecorator('token', {
                                                initialValue: token,
                                                rules: [{
                                                    required: true, message: 'Please input token field.',
                                                }],
                                            })(
                                                <Input id="token" type="hidden" placeholder="Input Token"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Name">
                                            {getFieldDecorator('name', {
                                                initialValue: propsvalue.name,
                                                rules: [{
                                                    required: true, message: 'Please input name field.',
                                                }],
                                            })(
                                                <Input id="name" placeholder="Input Name"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Description">
                                            {getFieldDecorator('description', {
                                                initialValue: propsvalue.description,
                                                rules: [{
                                                    required: true, message: 'Please input description field.',
                                                }],
                                            })(
                                                <TextArea id="description" placeholder="Input description"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Jenis">
                                            {getFieldDecorator('jenis', {
                                                initialValue:propsvalue.jenis,
                                                rules: [{
                                                    required: true, message: 'Please input level field.',
                                                }],
                                            })(
                                              <Select id="jenis"
                                                      showSearch
                                                      placeholder="Select jenis"
                                                      optionFilterProp="children"
                                                      onChange={(value)=>{
                                                          this.setState({
                                                              jenis:value,
                                                          });
                                                      }}
                                                      style={jenis === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                  <Option value="" disabled>Select level</Option>
                                                  {
                                                      jenisoptions.map((prop, index) => {
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

                                        <FormItem {...formItemLayout} label="Jenis Penilaian">
                                            {getFieldDecorator('id_jenis_nilai', {
                                                initialValue: prop.id_jenis_nilai,
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
                                                                <Option value={value} key={index}>{label}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout}>
                                            {getFieldDecorator('id', {
                                                initialValue: propsvalue.id,
                                                rules: [{
                                                    required: true, message: 'Please input name field.',
                                                }],
                                            })(
                                                <Input id="id" type="hidden" placeholder="Input Id"/>
                                            )}
                                        </FormItem>

                                        <FormItem style={{float: "right", paddingRight: "1rem"}}>
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
                                     this.props.updateRatioIndikator(datavalue);
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


const WrapperEditRatioIndikator = Form.create()(EditRatioIndikator);

const mapStateToProps = ({auth, ratioindikator, masterparameter}) => {
    const {token} = auth;
    const {statusputratioindikator,getratioindikator} = ratioindikator;
    const {jenisnilaiparam} = masterparameter;
    return {token, statusputratioindikator, getratioindikator, jenisnilaiparam};
};

export default connect(mapStateToProps, {updateRatioIndikator, resetPutRatioIndikator, getRatioIndikator, jenisNilaiParam})(WrapperEditRatioIndikator);
