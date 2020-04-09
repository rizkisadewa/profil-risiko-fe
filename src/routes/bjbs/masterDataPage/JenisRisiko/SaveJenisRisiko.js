import React from "react";
import {Button, Modal, Input, Form} from "antd";

const FormItem = Form.Item;
const {TextArea} = Input;


class SaveJenisRisiko extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {visible: false};
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

        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="Nama">
                        <Input id="nama" required/>
                    </FormItem>

                    <FormItem {...formItemLayout} label="Keterangan">
                        <TextArea id="ket" required/>
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

export default SaveJenisRisiko;

