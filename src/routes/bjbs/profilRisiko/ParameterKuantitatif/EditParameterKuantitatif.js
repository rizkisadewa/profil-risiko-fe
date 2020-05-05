import React from "react";
import connect from "react-redux/es/connect/connect";
import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import {getAllRisks,getAllPeringkatRisiko,jenisNilaiParam,getAllRatioIndikator} from "../../../../appRedux/actions/index";
import {optionsLevel} from "./SaveParameterKuantitatif";
import SweetAlerts from "react-bootstrap-sweetalert";
import {Link} from "react-router-dom";

const FormItem = Form.Item;
const Option = Select.Option;

class EditParameterKuantitatif extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dataoptionslevel : optionsLevel,
            basic: false,
            ewarning: false,
            dataoptionsrisk : [],
            dataoptionspringkatrisiko : [],
            propsvalue : [],
            propsid : props.eid,
            dataoptionsratioindikator : [],
            dataoptions : [],
            fetchdata: (props.addPropstate) ? [{
                id:'',
                risk:'',
                parameter:'',
                low:'',
                lowtomoderate:'',
                moderate:'',
                moderatetohigh:'',
                high:'',
                bobot:'',
                indikatorpembilang:'',
                indikatorpenyebut:'',
                penomoran:'',
                level:'',
                indukparameter:'',
                risk_id:'',
                id_jenis_nilai:''
            }] : props.fetchdata,
            //state value
            paramparameter:(props.addPropstate) ? props.addPropstate.pkparameter : props.fetchdata[0].parameter,
            paramlow:(props.addPropstate) ? props.addPropstate.pklow : props.fetchdata[0].low,
            paramlowtomoderate:(props.addPropstate) ? props.addPropstate.pklowtomoderate : props.fetchdata[0].lowtomoderate,
            parammoderate:(props.addPropstate) ? props.addPropstate.pkmoderate : props.fetchdata[0].moderate,
            parammoderatetohigh:(props.addPropstate) ? props.addPropstate.pkmoderatetohigh : props.fetchdata[0].moderatetohigh,
            paramhigh:(props.addPropstate) ? props.addPropstate.pkhigh : props.fetchdata[0].high,
            parambobot:(props.addPropstate) ? props.addPropstate.pkbobot : props.fetchdata[0].bobot,
            parampenomoran:(props.addPropstate) ? props.addPropstate.pkpenomoran : props.fetchdata[0].penomoran,
            paramlevel:(props.addPropstate) ? props.addPropstate.pklevel : props.fetchdata[0].level,
            paramindukparameter:(props.addPropstate) ? props.addPropstate.pkindukparameter : props.fetchdata[0].indukparameter,
            paramrisk_id:(props.addPropstate) ? props.addPropstate.pkrisk_id : props.fetchdata[0].risk_id,
            paramjenisnilai:(props.addPropstate) ? props.addPropstate.pkjenisnilai : props.fetchdata[0].id_jenis_nilai,
            paramindikatorpembilang:(props.addPropstate) ? props.addPropstate.pkindikatorpembilang : props.fetchdata[0].indikatorpembilang,
            paramindikatorpenyebut:(props.addPropstate) ? props.addPropstate.pkindikatorpenyebut : props.fetchdata[0].indikatorpenyebut,
            paramid:(props.addPropstate) ? props.addPropstate.pkid : props.fetchdata[0].id
        }
    }

    componentDidMount(){
        this.props.getAllRisks({token:this.props.token, page:'', jenis:'', nama:'', keterangan:''});
        this.props.getAllPeringkatRisiko({page:'', token:this.props.token, description:'', name:'', jenis_nilai:''});
        this.props.jenisNilaiParam({token:this.props.token});
        this.props.getAllRatioIndikator({token:this.props.token});
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dataoptionsrisk : nextProps.getallrisks,
            dataoptionspringkatrisiko : nextProps.getallperingkatrisiko,
            dataoptions : nextProps.jenisnilaiparam,
            dataoptionsratioindikator : nextProps.getallratioindikator
        });
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

        const {fetchdata,dataoptionsrisk,dataoptionspringkatrisiko,dataoptionslevel,basic,dataoptions,dataoptionsratioindikator,
            paramparameter,
            paramlow,
            paramlowtomoderate,
            parammoderate,
            parammoderatetohigh,
            paramhigh,
            parambobot,
            parampenomoran,
            paramlevel,
            paramindukparameter,
            paramrisk_id,
            paramjenisnilai,
            paramindikatorpenyebut,
            paramindikatorpembilang,
            paramid
        } = this.state;
        const {token} = this.props;
        const {getFieldDecorator} = this.props.form;

        return (
            <>
                <Form onSubmit={(e)=>{
                    e.preventDefault();
                    this.props.form.validateFields((err, values) => {
                        if (!err) {
                        }
                    });
                }}>
                    {
                        fetchdata.map((prop, index) =>{
                            return (
                                <div key={index}>
                                    <Spin spinning={paramid ? false : true} tip="Loading...">

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
                                                initialValue: paramrisk_id,
                                                rules: [{
                                                    required: true, message: 'Please input risk field.',
                                                }],
                                            })(
                                                <Select id="risk_id"
                                                        showSearch
                                                        placeholder="Select risk"
                                                        optionFilterProp="children"
                                                        onChange={(value)=>{
                                                            this.setState({
                                                                paramrisk_id:value,
                                                            });
                                                        }}
                                                        style={paramrisk_id === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                    <Option value="" disabled>Select risk</Option>
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
                                                initialValue: parampenomoran,
                                                rules: [{
                                                    required: true, message: 'Please input penomoran field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="penomoran" placeholder="Input Penomoran"
                                                             className="w-100"
                                                             min={0}
                                                             max={99}
                                                             maxLength={2}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     parampenomoran:value,
                                                                 });
                                                             }}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Name">
                                            {getFieldDecorator('name', {
                                                initialValue: paramparameter,
                                                rules: [{
                                                    required: true, message: 'Please input name field.',
                                                }],
                                            })(
                                                <Input id="name" placeholder="Input Name"
                                                       onChange={(e,value) =>{
                                                           this.setState({
                                                               paramparameter:e.target.value,
                                                           });
                                                       }}/>
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Level">
                                            {getFieldDecorator('level', {
                                                initialValue: paramlevel,
                                                rules: [{
                                                    required: true, message: 'Please input level field.',
                                                }],
                                            })(
                                                <Select id="level"
                                                        showSearch
                                                        placeholder="Select level"
                                                        optionFilterProp="children"
                                                        onChange={(value)=>{
                                                            this.setState({
                                                                paramlevel:value,
                                                            });
                                                        }}
                                                        style={paramlevel === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                    <Option value="" disabled>Select level</Option>
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
                                            {getFieldDecorator('peringkatrisiko', {
                                                initialValue: paramindukparameter,
                                                rules: [{
                                                    required: true, message: 'Please input induk/parameter field.',
                                                }],
                                            })(
                                                <Select id="peringkatrisiko"
                                                        showSearch
                                                        placeholder="Select induk/parameter"
                                                        optionFilterProp="children"
                                                        onChange={(value)=>{
                                                            this.setState({
                                                                paramindukparameter:value,
                                                            });
                                                        }}
                                                        style={paramindukparameter === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                                    <Option value="" disabled>Select induk/parameter</Option>
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
                                                initialValue: parambobot,
                                                rules: [{
                                                    required: true, message: 'Please input bobot field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="bobot" placeholder="Input Bobot"
                                                             className="w-100"
                                                             min={0}
                                                             max={100}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     parambobot:value,
                                                                 });
                                                             }}
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
                                            {getFieldDecorator('id_jenis_nilai', {
                                                initialValue: paramjenisnilai,
                                                rules: [{
                                                    required: true, message: 'Please input jenis penilaian field.',
                                                }],
                                            })(
                                                <Select id="id_jenis_nilai"
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
                                                        dataoptions.map((prop, index) => {
                                                            var value = prop.value;
                                                            var label = prop.text;

                                                            if (label === 'Kuantitatif (Naik)' || label === 'Kuantitatif (Turun)'){
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

                                        <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Peringkat Risiko</label><br/>
                                        <FormItem {...formItemLayout} label="Low">
                                            {getFieldDecorator('low', {
                                                initialValue: paramlow,
                                                rules: [{
                                                    required: true, message: 'Please input low field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Low"
                                                             className="w-100"
                                                             min={0}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     paramlow:value,
                                                                 });
                                                             }}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Low to Moderate">
                                            {getFieldDecorator('lowtomoderate', {
                                                initialValue: paramlowtomoderate,
                                                rules: [{
                                                    required: true, message: 'Please input low to moderate field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Low to Moderate"
                                                             className="w-100"
                                                             min={0}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     paramlowtomoderate:value,
                                                                 });
                                                             }}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Moderate">
                                            {getFieldDecorator('moderate', {
                                                initialValue: parammoderate,
                                                rules: [{
                                                    required: true, message: 'Please input moderate field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Moderate"
                                                             className="w-100"
                                                             min={0}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     parammoderate:value,
                                                                 });
                                                             }}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Moderate to High">
                                            {getFieldDecorator('moderatetohigh', {
                                                initialValue: parammoderatetohigh,
                                                rules: [{
                                                    required: true, message: 'Please input moderate to high field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input Moderate to High"
                                                             className="w-100"
                                                             min={0}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     parammoderatetohigh:value,
                                                                 });
                                                             }}
                                                />
                                            )}
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="High">
                                            {getFieldDecorator('high', {
                                                initialValue: paramhigh,
                                                rules: [{
                                                    required: true, message: 'Please input high field.'
                                                },{type:"number", message: 'Input must be number type.'}],
                                            })(
                                                <InputNumber id="low" placeholder="Input High"
                                                             className="w-100"
                                                             min={0}
                                                             onChange={(value)=>{
                                                                 this.setState({
                                                                     paramhigh:value,
                                                                 });
                                                             }}
                                                />
                                            )}
                                        </FormItem>

                                        <label style={{ textDecoration: 'underline', fontWeight: 'bold', textAlign: 'center'}}>Indikator Ratio/Ukuran</label><br/>
                                        <FormItem {...formItemLayout} label="Indikator Pembilang">
                                            {getFieldDecorator('indikatorpembilang', {
                                                initialValue: paramindikatorpembilang,
                                                rules: [{
                                                    required: true, message: 'Please input indikator pembilang field.',
                                                }],
                                            })(
                                                <Select id="indikatorpembilang"
                                                        showSearch
                                                        placeholder="Select indikator pembilang"
                                                        optionFilterProp="children"
                                                        onChange={(value)=>{
                                                            this.setState({
                                                                paramindikatorpembilang:value
                                                            });
                                                        }}
                                                        style={paramindikatorpembilang === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="" disabled>Select indikator penyebut</Option>
                                                    {
                                                        dataoptionsratioindikator.map((prop, index) => {
                                                            var value = prop.id;
                                                            var label = prop.name;
                                                            return (
                                                                <Option value={value} key={index}>{label}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )}
                                            <Link to={{pathname:'/bjbs/masterdata/ratioindikator',
                                                ratioProps:{
                                                    rparameter:paramparameter ,
                                                    rlow:paramlow,
                                                    rlowtomoderate:paramlowtomoderate,
                                                    rmoderate:parammoderate,
                                                    rmoderatetohigh:parammoderatetohigh,
                                                    rhigh:paramhigh,
                                                    rbobot:parambobot,
                                                    rpenomoran:parampenomoran,
                                                    rlevel:paramlevel,
                                                    rindukparameter:paramindukparameter,
                                                    rrisk_id:paramrisk_id,
                                                    rjenisnilai:paramjenisnilai,
                                                    rindikatorpenyebut:paramindikatorpenyebut,
                                                    rindikatorpembilang:paramindikatorpembilang,
                                                    rid:paramid,
                                                    redittrue : true,
                                                }}
                                            }>Tambah Parameter</Link>
                                        </FormItem>

                                        <FormItem {...formItemLayout} label="Indikator Penyebut">
                                            {getFieldDecorator('indikatorpenyebut', {
                                                initialValue: paramindikatorpenyebut,
                                                rules: [{
                                                    required: true, message: 'Please input indikator penyebut field.',
                                                }],
                                            })(
                                                <Select id="indikatorpenyebut"
                                                        showSearch
                                                        placeholder="Select indikator penyebut"
                                                        optionFilterProp="children"
                                                        onChange={(value)=>{
                                                            this.setState({
                                                                paramindikatorpenyebut:value
                                                            });
                                                        }}
                                                        style={paramindikatorpenyebut === '' ? { color: '#BFBFBF'} : {textAlign:'left'}}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Option value="" disabled>Select indikator penyebut</Option>
                                                    {
                                                        dataoptionsratioindikator.map((prop, index) => {
                                                            var value = prop.id;
                                                            var label = prop.name;
                                                            return (
                                                                <Option value={value} key={index}>{label}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            )}
                                            <Link to={{pathname:'/bjbs/masterdata/ratioindikator',
                                                ratioProps:{
                                                    rparameter:paramparameter ,
                                                    rlow:paramlow,
                                                    rlowtomoderate:paramlowtomoderate,
                                                    rmoderate:parammoderate,
                                                    rmoderatetohigh:parammoderatetohigh,
                                                    rhigh:paramhigh,
                                                    rbobot:parambobot,
                                                    rpenomoran:parampenomoran,
                                                    rlevel:paramlevel,
                                                    rindukparameter:paramindukparameter,
                                                    rrisk_id:paramrisk_id,
                                                    rjenisnilai:paramjenisnilai,
                                                    rindikatorpenyebut:paramindikatorpenyebut,
                                                    rindikatorpembilang:paramindikatorpembilang,
                                                    rid:paramid,
                                                    redittrue : true,
                                                }}
                                            }>Tambah Parameter</Link>
                                        </FormItem>

                                        <FormItem {...formItemLayout}>
                                            {getFieldDecorator('id', {
                                                initialValue: paramid,
                                                rules: [{
                                                    required: true, message: 'Please input id field.'
                                                }],
                                            })(
                                                <Input id="id" placeholder="Input id" type="hidden"/>
                                            )}
                                        </FormItem>

                                        <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                                            {/*<Button onClick={this.props.clickCancelEditButton}>Cancel</Button>*/}
                                            <Link className="ant-btn" to={{pathname:'/bjbs/profilrisiko/parameterkuantitatif', cancelProps:{
                                                    propscancel:true
                                                }}}>Cancel</Link>
                                            <Button type="primary" htmlType="submit">Edit</Button>
                                        </FormItem>

                                    </Spin>
                                </div>
                            );
                        })
                    }

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

const WrappedEditParameterKuantitatif = Form.create()(EditParameterKuantitatif);

const mapStateToProps = ({auth, jenisrisiko, peringkatrisiko, masterparameter, ratioindikator}) => {
    const {token} = auth;
    const {getallrisks} = jenisrisiko;
    const {getallperingkatrisiko} = peringkatrisiko;
    const {jenisnilaiparam} = masterparameter;
    const {getallratioindikator} = ratioindikator;
    return {token,getallrisks,getallperingkatrisiko,jenisnilaiparam,getallratioindikator}
};

export default connect(mapStateToProps, {getAllRisks,getAllPeringkatRisiko,jenisNilaiParam,getAllRatioIndikator})(WrappedEditParameterKuantitatif);