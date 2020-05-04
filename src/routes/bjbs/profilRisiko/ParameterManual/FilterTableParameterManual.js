import React from "react";
import {Button, Card, Input, Spin, Select, Form} from "antd";

import { DatePicker } from 'antd';
// import moment from 'moment';
import connect from "react-redux/es/connect/connect";
import {getAllRisks} from "../../../../appRedux/actions/index";
import TableParameterManual from "./TableParameterManual";


const {MonthPicker} = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class FilterTableParameterManual extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : [],
            loading:false,
            isTable:false,
            fetchdata:[],
            ismonth:'',
            isyear:'',
            stringmonth:''
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
    }

    componentWillReceiveProps(nextProps) {
        // this.handleProp(nextProps);
        this.setState({
            dataoptions: nextProps.getallrisks,
        });
    }

    componentDidUpdate(){
        if(this.state.loading){
            setTimeout(() => {
                this.setState({
                    isTable:true,
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
            isTable: false,
        })
    };

    render() {
        const formItemLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
            },
        };
        const monthFormat = 'MMMM YYYY';
        const {getFieldDecorator} = this.props.form;
        const {dataoptions, loading, isTable, fetchdata, ismonth, isyear, stringmonth} = this.state;
        const {token} = this.props;
        return (
            <>
                {
                    !isTable ?
                        (<Card title={<div style={{textAlign: "center"}}>
                            <img src={require("assets/images/logobjbs-old.png")} className="gx-logo-size" alt="bjbs"
                                 title="bjbs"/><br/>
                            <label>Filter Parameter Manual</label>
                        </div>}>
                            <div style={{textAlign: "center"}}>
                                <Spin spinning={loading} tip="Loading...">
                                    <Form onSubmit={(e) => {
                                        e.preventDefault();
                                        this.props.form.validateFields((err, values) => {
                                            if (!err) {
                                                this.setState({
                                                    loading: true,
                                                    fetchdata: [{
                                                        isyear: isyear,
                                                        ismonth: ismonth,
                                                        stringmonth: stringmonth,
                                                        risks: values.risks
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
                                            <Button type="primary" htmlType="submit" style={{width: '40%'}}>Show
                                                Table</Button>
                                        </FormItem>
                                    </Form>
                                </Spin>
                            </div>
                        </Card>) : <TableParameterManual fetchdata={fetchdata} clickCancelFilterButton={this.clickCancelFilterButton}/>
                }
            </>
        );
    }
}

const WrappedFilterTableParameterManual = Form.create()(FilterTableParameterManual);

const mapStateToProps = ({auth,jenisrisiko}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    return {token,getallrisks}
};

export default connect(mapStateToProps, {getAllRisks})(WrappedFilterTableParameterManual);