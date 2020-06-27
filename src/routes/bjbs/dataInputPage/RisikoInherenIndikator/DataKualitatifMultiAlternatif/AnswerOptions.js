import React from "react";
import {Button, Modal, Radio} from "antd";

const RadioGroup = Radio.Group;

class AnswerOptions extends React.Component {

  render() {
    return (
      <>
      <Modal
        visible={this.props.visible}
        title="Silahkan pilih jawabannya di bawah ini : "
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        width={950}
        wrapClassName="vertical-center-modal"
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>Kembali</Button>,
          <Button key="submit" type="primary" loading={this.props.loading} onClick={this.props.handleOk}>
            Pilih Jawaban
          </Button>
        ]}
      >
      <RadioGroup
        options={this.props.dataoptions}
        onChange={this.props.onChange}
        value={this.props.value}
      />
      </Modal>
      </>
    );
  }
}

export default AnswerOptions;
