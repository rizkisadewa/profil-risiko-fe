import React from "react";
import {Button, Input, Form, Spin, Select} from "antd";

import connect from "react-redux/es/connect/connect";
import {updateRisk, resetPutRisk, getRisk} from "../../../../appRedux/actions/index";
import IntlMessages from "util/IntlMessages";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsJenis = [
    {label:"Risiko Inheren", value:"PR"},
    {label:"KPMR", value:"KPMR"}
];


class EditJenisRisiko extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            ewarning: false,
            datavalue:[],
            statusput:'',
            jenis: '',
            propsvalue: [],
            jenisoptions: optionsJenis,
            propsid : props.eid
        };
    }

    componentWillMount(){
        this.props.getRisk({id:this.props.eid, token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statusput : nextProps.statusputrisk,
            propsvalue : nextProps.getrisk
        });

        if(nextProps.statusputrisk === 200 || nextProps.statusputrisk === 201){
            this.props.clickEditSuccessButton(nextProps.statusputrisk);
            this.props.resetPutRisk();
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

        const {ewarning, datavalue, propsvalue, jenis, jenisoptions} = this.state;
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
                            // console.log(values);
                        }
                    });
                }}>
                    {
                        fetchdata.map((prop, index) =>{
                            return(
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

                                        <FormItem {...formItemLayout} label="Nama">
                                            {getFieldDecorator('nama', {
                                                initialValue:propsvalue.nama,
                                                rules: [{
                                                    required: true, message: 'Please input nama field.',
                                                }],
                                            })(
                                                <Input id="nama" placeholder="Input Nama"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Keterangan">
                                            {getFieldDecorator('keterangan', {
                                                initialValue:propsvalue.keterangan,
                                                rules: [{
                                                    required: true, message: 'Please input keterangan field.',
                                                }],
                                            })(
                                                <TextArea id="keterangan" placeholder="Input Keterangan"/>
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
                                     this.props.updateRisk(datavalue);
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

const mapStateToProps = ({auth,jenisrisiko}) => {
    const {token} = auth;
    const {statusputrisk,getrisk} = jenisrisiko;
    return {token,statusputrisk, getrisk}
};

export default connect(mapStateToProps, {updateRisk, resetPutRisk, getRisk})(WrapperdEditJenisRisiko);
