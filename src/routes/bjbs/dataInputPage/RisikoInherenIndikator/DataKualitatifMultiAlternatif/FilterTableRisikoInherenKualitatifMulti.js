import React from "react";
import {Button, Card, Input, Spin, Select, Form} from "antd";

import { DatePicker } from 'antd';
// import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import {
  getAllRisks,
  fetchAllMasterVersion,
} from "../../../../../appRedux/actions/index";
import TableRisikoInherenKualitatifMulti from './TableRisikoInherenKualitatifMulti';


const {MonthPicker} = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class FilterTableRisikoInherenKualifatifMulti extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : [],
            loading:false,
            isInput:false,
            fetchdata:[],
            dataoptionsmasterversion: [],
            ismonth:'',
            isyear:'',
            stringmonth:'',
            risk_name: '',
            risk_id: 0,
            version_name: ''
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'PR', nama:'', keterangan:''});
        this.props.fetchAllMasterVersion({token: this.props.token});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            dataoptions: nextProps.getallrisks,
            dataoptionsmasterversion: nextProps.masterversionsdata
        });
    }

    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(() => {
                this.setState({
                    isInput:true,
                    loading:false
                })
            },300)
        }
    }

    yearmonthThis = () => {
        var full = new Date();
        var month = full.getMonth()+1;
        if (month >= 9) {
            month = month+1;
        } else {
            month = 0+""+(month+1);
        }
        var year = full.getFullYear();

        var fullyearmonth = '"'+year+'-'+month+'"';
        return fullyearmonth;
    };

    /*thisMonth = () => {
        var d = new Date();
        var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return months[d.getMonth()]+" "+d.getFullYear();
    };*/

    onChangeMonth = (date, dateString) => {
        var monthyear = (date, dateString);
        var spMy = monthyear.split(" ");

        var month = 0;
        if (spMy[0] === 'January'){
            month = 1;
        } else if (spMy[0] === 'February'){
            month = 2;
        } else if (spMy[0] === 'March'){
            month = 3;
        } else if (spMy[0] === 'April'){
            month = 4;
        } else if (spMy[0] === 'May'){
            month = 5;
        } else if (spMy[0] === 'June'){
            month = 6;
        } else if (spMy[0] === 'July'){
            month = 7;
        } else if (spMy[0] === 'August'){
            month = 8;
        } else if (spMy[0] === 'September'){
            month = 9;
        } else if (spMy[0] === 'October'){
            month = 10;
        } else if (spMy[0] === 'November'){
            month = 11;
        } else if (spMy[0] === 'December'){
            month = 12;
        }

        this.setState({
           ismonth:month,
           isyear:spMy[1],
           stringmonth:spMy[0]
        });
    };

    clickCancelFilterButton = () => {
        this.setState({
            isInput: false,
        })
    };

    catchRiskName = (value, i) =>{
      this.setState({
          risk_name: i.props.children,
          risk_id: value
      });
    }

    catchVersionName = (value, i) =>{
      this.setState({
          version_name: i.props.children,
      });
    }

    render() {
        const formItemLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
            },
        };
        const monthFormat = 'MMMM YYYY';
        const {getFieldDecorator} = this.props.form;
        const {
          dataoptions,
          loading,
          isInput,
          fetchdata,
          ismonth,
          isyear,
          stringmonth,
          dataoptionsmasterversion
        } = this.state;
        const {token} = this.props;
        return (
            <>
                {
                    !isInput ?
                        (<Card title={<div style={{textAlign: "center"}}>
                            <img src={require("assets/images/logobjbs-old.png")} className="gx-logo-size" alt="bjbs"
                                 title="bjbs"/><br/>
                            <label>Filter Risiko Inheren Data Kualitatif Multi Alternatif</label>
                        </div>}>
                            <div style={{textAlign: "center"}}>
                                <Spin spinning={loading} tip="Loading...">
                                    <Form onSubmit={(e) => {
                                        e.preventDefault();
                                        this.props.form.validateFields((err, values) => {

                                            if (!err) {
                                                // console.log(this.state.version_name);
                                                console.log(values);

                                                this.setState({
                                                    loading: true,
                                                    fetchdata: [{
                                                        isyear: isyear,
                                                        ismonth: ismonth,
                                                        stringmonth: stringmonth,
                                                        risks: values.risks,
                                                        risk_id: this.state.risk_id,
                                                        risk_name: this.state.risk_name,
                                                        version_id: values.version_id,
                                                        version_name: this.state.version_name
                                                    }]
                                                });
                                            }
                                        });
                                    }}>
                                        <FormItem {...formItemLayout}>
                                            <div>Choose Month and Year</div>
                                            {getFieldDecorator('yearmonth', {
                                                // initialValue:moment(this.thisMonth(), monthFormat),
                                                rules: [{
                                                    required: true, message: 'Please choose month and year.',
                                                }],
                                            })(
                                                <MonthPicker onChange={this.onChangeMonth} style={{width: '40%', textAlignLast: 'center'}}
                                                             id="yearmonth"
                                                             disabledDate={m => !m || m.isAfter(this.yearmonthThis()) || m.isSameOrBefore("1960-01")}
                                                             format={monthFormat} placeholder="Select month and year"/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout}>
                                            <div>Choose Risks</div>
                                            {getFieldDecorator('risks', {
                                                rules: [{
                                                    required: true, message: 'Please choose risks.',
                                                }],
                                            })(
                                                <Select id="risks"
                                                        style={{width: '40%', textAlignLast: 'center'}}
                                                        showSearch
                                                        allowClear
                                                        onChange={this.catchRiskName}
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

                                        <FormItem {...formItemLayout}>
                                            <div>Choose Version</div>
                                            {getFieldDecorator('version_id', {
                                                rules: [{
                                                    required: true, message: 'Please choose risks.',
                                                }],
                                            })(
                                                <Select id="version_id"
                                                        style={{width: '40%', textAlignLast: 'center'}}
                                                        showSearch
                                                        allowClear
                                                        placeholder="Select version"
                                                        onChange={this.catchVersionName}
                                                        optionFilterProp="children"
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                    {
                                                        dataoptionsmasterversion.map((prop, index) => {
                                                            var value = prop.id;
                                                            var label = prop.version_name;
                                                            return (
                                                                <Option key={index} value={value}>{label}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )}
                                        </FormItem>

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

                                        <FormItem  {...formItemLayout}>
                                            <Button type="primary" htmlType="submit" style={{width: '40%'}}>Input Data</Button>
                                        </FormItem>
                                    </Form>
                                </Spin>
                            </div>
                        </Card>) : <TableRisikoInherenKualitatifMulti fetchdata={fetchdata} clickCancelFilterButton={this.clickCancelFilterButton}/>
                }
            </>
        );
    }
}

const WrappedFilterTableRisikoInherenKualifatifMulti = Form.create()(FilterTableRisikoInherenKualifatifMulti);

const mapStateToProps = ({
  auth,
  jenisrisiko,
  masterversion,

}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {masterversionsdata} = masterversion;

    return {
      token,
      getallrisks,
      masterversionsdata
    }
};

export default connect(mapStateToProps, {
  getAllRisks,
  fetchAllMasterVersion
})(WrappedFilterTableRisikoInherenKualifatifMulti);
