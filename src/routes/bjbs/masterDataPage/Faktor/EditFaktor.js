import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";
import {data} from "./../JenisRisiko/TableJenisRisiko";

const FormItem = Form.Item;
const Option = Select.Option;

const options = data;
const optionsLevel = [
    {label:"Level Pertama (1)", value:"1"},
    {label:"Level Kedua (2)", value:"2"}
];

class EditFaktor extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : options,
            dataoptionslevel : optionsLevel,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
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

        const {dataoptions, dataoptionslevel} = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Risk">
                    <Select id="risk"
                            defaultValue={this.props.erisk}
                            showSearch
                            placeholder="Select risk"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            required>
                        {
                            dataoptions.map((prop, index) => {
                                var value = prop.action;
                                var label = prop.nama;
                                return (
                                    <Option value={value}>{label}</Option>
                                )
                            })
                        }
                    </Select>
                </FormItem>

                <FormItem {...formItemLayout} label="Penomoran">
                    <Input id="penomoran" placeholder="Input Penomoran" value={this.props.eid} required/>
                </FormItem>

                <FormItem {...formItemLayout} label="Name">
                    <Input id="name" placeholder="Input Name" defaultValue={this.props.eparam} required/>
                </FormItem>

                <FormItem {...formItemLayout} label="Level">
                    <Select id="level"
                            defaultValue={this.props.elevel}
                            showSearch
                            placeholder="Select level"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            required>
                        {
                            dataoptionslevel.map((prop, index) => {
                                var value = prop.value;
                                var label = prop.label;
                                return (
                                    <Option value={value}>{label}</Option>
                                )
                            })
                        }
                    </Select>
                </FormItem>

                <FormItem {...formItemLayout} label="Bobot">
                    <InputNumber id="bobot" placeholder="Input Bobot"
                                 className="w-100"
                                 defaultValue={this.props.ebobot}
                                 min={0}
                                 max={100}
                                 formatter={value => `${value}%`}
                                 parser={value => value.replace('%', '')}
                                 required
                    />
                </FormItem>

                <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                    <Button onClick={this.props.clickCancelEditButton}>Cancel</Button>
                    <Button type="primary" htmlType="submit">Save</Button>
                </FormItem>
            </Form>
        );
    }

}

export default EditFaktor;