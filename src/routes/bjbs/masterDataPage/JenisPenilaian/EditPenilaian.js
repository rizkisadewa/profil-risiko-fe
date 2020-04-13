import React from "react";
import {Button, Input, Form, Select, InputNumber} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;

const optionsPenilaian = [
    {label:"Kuantitatif (Naik)", value:"1"},
    {label:"Kuantitatif (Turun)", value:"2"},
    {label:"Kualitatif", value:"3"}
];

class EditPenilaian extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            dataoptions : optionsPenilaian,
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

        const {dataoptions} = this.state;
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="Id">
                        <Input id="id" placeholder="Input Id" value={this.props.eid} required/>
                    </FormItem>

                    <FormItem {...formItemLayout} label="Nama">
                        <Input id="nama" placeholder="Input Nama" defaultValue={this.props.enama} required/>
                    </FormItem>

                    <FormItem {...formItemLayout} label="Jenis Penilaian">
                        <Select id="jenispenilaian"
                                defaultValue={this.props.epenilaian}
                                showSearch
                                placeholder="Select Jenis Penilaian"
                                optionFilterProp="children"
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                required>
                            {
                                dataoptions.map((prop, index) => {
                                    var value = prop.value;
                                    var label = prop.label;
                                    return (
                                        <Option value={value}>{label}</Option>
                                    )
                                })
                            }
                        </Select>
                    </FormItem>

                    <FormItem {...formItemLayout} label="Keterangan">
                        <TextArea id="keterangan" placeholder="Input Keterangan" defaultValue={this.props.eket} required/>
                    </FormItem>

                    <FormItem style={{ float : "right", paddingRight : "1rem" }}>
                        <Button onClick={this.props.clickCancelEditButton}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </FormItem>
                </Form>
            </>
        );
    }

}

export default EditPenilaian;