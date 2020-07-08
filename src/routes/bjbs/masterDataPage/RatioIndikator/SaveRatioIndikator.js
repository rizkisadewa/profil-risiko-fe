import React from "react";
import {Button, Input, Form, Select} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  getAllRatioIndikator,
  postRatioIndikator,
  resetPostRatioIndikator,
  jenisNilaiParam,
  fetchAllMasterVersion
} from "../../../../appRedux/actions/index";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsJenis = [
    {label:"Risiko Inheren", value:"PR"},
    {label:"KPMR", value:"KPMR"}
];

export const jenisNilaiOptions = [
    {text:"Kualitatif (Dual Alternatif)", value:21},
    {text:"Kualitatif (Multi Alternatif)", value:4},
    {text:"Kuantitatif", value:1}
];

class SaveRatioIndikator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            statuspost: '',
            dataoptions : [],
            dataoptionsmasterversion: [],
            jenisoptions: optionsJenis,
            jenis: '',
            paramjenisnilai: ''
        }
    }

    componentDidMount(){
        this.props.jenisNilaiParam({token:this.props.token});
        this.props.fetchAllMasterVersion({token: this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            statuspost : nextProps.statuspostratioindikator,
            dataoptions : nextProps.jenisnilaiparam,
            dataoptionsmasterversion : nextProps.masterversionsdata,
        });

        if (nextProps.statuspostratioindikator === 201 || nextProps.statuspostratioindikator === 200){
            this.props.clickAddSuccessButton(nextProps.statuspostratioindikator);
            this.props.resetPostRatioIndikator();
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

        const {
          dataoptions,
          jenisoptions,
          jenis,
          paramjenisnilai,
          dataoptionsmasterversion
        } = this.state;
        const {token} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            this.props.postRatioIndikator(values);
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
                                    jenisNilaiOptions.map((prop, index) => {
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

                    <FormItem {...formItemLayout} label="Master Versi">
                        {getFieldDecorator('master_version_list', {
                            rules: [{
                                required: true, message: 'Please input master version.',
                            }],
                        })(
                          <Select id="master_version_list"
                                  showSearch
                                  mode="multiple"
                                  placeholder="Select Jenis Penilaian"
                                  optionFilterProp="children"
                                  onChange={this.handleChangeMultipleSelect}
                                  style={paramjenisnilai === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          >
                              {
                                  dataoptionsmasterversion.map((prop, index) => {
                                      var value = prop.id;
                                      var label = prop.version_name;
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

const WrapperRatioIndikator = Form.create()(SaveRatioIndikator);

const mapStateToProps = ({
  auth,
  ratioindikator,
  masterparameter,
  masterversion
}) => {
    const {token} = auth;
    const {statuspostratioindikator,getallratioindikator} = ratioindikator;
    const {jenisnilaiparam} = masterparameter;
    const {masterversionsdata} = masterversion;
    return {
      token,
      statuspostratioindikator,
      getallratioindikator,
      jenisnilaiparam,
      masterversionsdata
    };
};

export default connect(mapStateToProps, {
  getAllRatioIndikator,
  postRatioIndikator,
  resetPostRatioIndikator,
  jenisNilaiParam,
  fetchAllMasterVersion
})(WrapperRatioIndikator);
