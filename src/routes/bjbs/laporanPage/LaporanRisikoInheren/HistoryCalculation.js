import React from "react";
import {Button, Modal, Table} from "antd";

const columns = [
  {
    title: 'Ratio Indikator',
    dataIndex: 'label',
  }
];

const HistoryCalculation = (props) => {

  return (


    <Modal
      visible={props.visible}
      title="Silahkan pilih jawabannya di bawah ini : "
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      width={950}
      wrapClassName="vertical-center-modal"
      footer={[
        <Button key="back" onClick={props.handleCancel}>Kembali</Button>,
        <Button key="submit" type="primary" loading={props.loading} onClick={props.handleOk}>
          Pilih Jawaban
        </Button>
      ]}
    >
      {/*
      <RadioGroup
        options={this.props.dataoptions}
        onChange={this.props.onChange}
        value={this.props.value}
      />
      */}
      <div>
        <Table
          rowSelection={{
            type: 'radio',
            onChange: props.onChange
          }}
          columns={columns}
          dataSource={props.dataoptions}
          pagination={false}
        />
      </div>

    </Modal>

  );
}

export default HistoryCalculation;
