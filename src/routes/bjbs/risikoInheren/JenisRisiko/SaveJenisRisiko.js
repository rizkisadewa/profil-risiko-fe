import React from "react";
import {Button, Input, Select, Form} from "antd";
import connect from "react-redux/es/connect/connect";
import {addRisk, resetPostRisk} from "../../../../appRedux/actions/index";

const FormItem = Form.Item;
const {TextArea} = Input;
const Option = Select.Option;

const optionsJenis = [
    {label:"Risiko Inheren", value:"PR"},
    {label:"KPMR", value:"KPMR"}
];

class SaveJenisRisiko extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            statuspost: '',
            jenisoptions: optionsJenis,
            jenis: ''
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statuspost: nextProps.statuspostrisk
        });

        if (nextProps.statuspostrisk === 200 || nextProps.statuspostrisk === 201){
            this.props.clickAddSuccessButton(nextProps.statuspostrisk);
            this.props.resetPostRisk();
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

        const {jenisoptions, jenis} = this.state;
        const {token} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            // console.log("****VALUES ADD JENIS RISIKO / KPMR")
                            // console.log(values);
                            this.props.addRisk(values);
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

const mapStateToProps = ({auth, jenisrisiko}) => {
    const {token} = auth;
    const {statuspostrisk} = jenisrisiko;
    return {token,statuspostrisk}
};

export default connect(mapStateToProps, {addRisk, resetPostRisk})(WrappedSaveRisk);
