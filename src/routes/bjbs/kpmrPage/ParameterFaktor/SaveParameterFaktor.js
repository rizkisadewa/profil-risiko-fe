import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  getAllRisks,
  postFaktorParameter,
  resetPostFaktorParameter,
  fetchAllMasterVersion,
  jenisNilaiParam
} from "../../../../appRedux/actions/index";
import SweetAlerts from "react-bootstrap-sweetalert";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsLevel = [
    {label:"Level Pertama (1)", value:"1"}
];

class SaveParameterFaktor extends React.PureComponent{
    constructor(props) {
        super(props);
        // this.handleProp=this.handleProp.bind(this);
        this.state = {
            dataoptions : [],
            dataoptionslevel : optionsLevel,
            basic: false,
            statuspost: '',
            paramjenisnilai:'',
            dataoptionsmasterversion: [],
            dataoptionsjenisnilai: []
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'KPMR', nama:'', keterangan:''});
        this.props.fetchAllMasterVersion({token: this.props.token});
        this.props.jenisNilaiParam({token:this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            dataoptions : nextProps.getallrisks,
            statuspost : nextProps.statuspostparameterfaktor,
            dataoptionsmasterversion : nextProps.masterversionsdata,
            dataoptionsjenisnilai: nextProps.jenisnilaiparam
        });

        if (nextProps.statuspostparameterfaktor === 201 || nextProps.statuspostparameterfaktor === 200){
            this.props.clickAddSuccessButton(nextProps.statuspostparameterfaktor);
            this.props.resetPostFaktorParameter();
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
          dataoptionslevel,
          basic,
          paramjenisnilai,
          dataoptionsmasterversion,
          dataoptionsjenisnilai
        } = this.state;
        const {token, addPropstate} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                            values.jenis = 'KPMR';
                            this.props.postFaktorParameter(values);
                            console.log("****SUBMIT DATA PARAMETER FAKTOR KPMR")
                            console.log(values);
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
                            rules: [{
                                required: true, message: 'Please input penomoran field.',
                            }],
                        })(
                            <Input id="penomoran" placeholder="Input Penomoran" maxLength={2}/>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Name">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input parameter field.',
                            }],
                        })(
                            <TextArea id="name" placeholder="Input Name"/>
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

                    <FormItem {...formItemLayout} label="Jenis Penilaian">
                        {getFieldDecorator('jenis_nilai_id', {
                            initialValue: addPropstate ? addPropstate.pkjenisnilai : '',
                            rules: [{
                                required: true, message: 'Please input jenis penilaian field.',
                            }],
                        })(
                            <Select id="jenis_nilai_id"
                                    showSearch
                                    placeholder="Select Jenis Penilaian"
                                    optionFilterProp="children"
                                    onChange={(value)=>{
                                        this.setState({
                                            paramjenisnilai:value
                                        });
                                    }}
                                    style={paramjenisnilai === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="" disabled>Select jenis penilaian</Option>
                                {
                                    dataoptionsjenisnilai.map((prop, index) => {
                                        var value = prop.value;
                                        var label = prop.text;

                                        if (label === 'Kualitatif (Multi Alternatif)'){
                                            return (
                                                <Option value={value} key={index}>{label}</Option>
                                            )
                                        } else {
                                            return '';
                                        }
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
                                  placeholder="Select Master Versi"
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

const WrappedSaveParameterFaktor = Form.create()(SaveParameterFaktor);

const mapStateToProps = ({
  auth,
  parameterfaktor,
  jenisrisiko,
  masterversion,
  masterparameter
}) => {
    const {token} = auth;
    const {statuspostparameterfaktor} = parameterfaktor;
    const {getallrisks} = jenisrisiko;
    const {masterversionsdata} = masterversion;
    const {jenisnilaiparam} = masterparameter;
    return {
      statuspostparameterfaktor,
      token,
      getallrisks,
      masterversionsdata,
      jenisnilaiparam
    }
};

export default connect(mapStateToProps, {
  postFaktorParameter,
  getAllRisks,
  resetPostFaktorParameter,
  fetchAllMasterVersion,
  jenisNilaiParam
})(WrappedSaveParameterFaktor);
