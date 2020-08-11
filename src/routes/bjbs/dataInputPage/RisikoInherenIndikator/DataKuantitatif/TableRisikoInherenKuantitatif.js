import React from "react";
import { Upload, Form, Button, Spin, Table } from 'antd';
import { UploadOutlined  } from '@ant-design/icons';
import {NotificationContainer, NotificationManager} from "react-notifications";
import Grid from "@material-ui/core/Grid";
import NumberFormat from 'react-number-format';
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';
import {
  fetchExportExcel,
  fetchImportDataKuantitatifPR,
  addRisikoInherenInputKuantitatifPerItem
} from "../../../../../appRedux/actions/index";
import moment from 'moment';


function TableRisikoInherenKuantitatif(props){

  // state
  const [newValue, setNewValue] = React.useState({
    value: ''
  });
  const [loading, setLoading] = React.useState([]);
  const [fileList, setFilelist] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);
  const {
    fetchExportExcel,
    fetchImportDataKuantitatifPR,
    addRisikoInherenInputKuantitatifPerItem
  } = props;

  const enterLoading = (index) => {
    setLoading(oldLoading => {
      let newLoadings = [...oldLoading];
      newLoadings[index] = true;
      setLoading(newLoadings);
    });
  };

  const enterLoadingFalse = (index) => {
    setLoading(oldLoading => {
      let newLoadings = [...oldLoading];
      newLoadings[index] = false;
      setLoading(newLoadings);
    });
  };

  // Handle Change TextField
  const handleChange = name => event => {
    setNewValue({ ...newValue, [name]: event.target.value });
  };

  // handling add / edit dialog
  const [changed, setChanged] = React.useState();

  const handleChanged = value => {
    setChanged(value);
  };

  React.useEffect(() => {

  }, [changed])

  const beforeUpload = (file) => {

      // console.log("====> FILE INFO : ");
      // console.log(`File type : ${file.type}`);
      // console.log(`File size : ${file.size}`);
      // console.log(`File flag : ${file.flag}`);

      // const isJPG = file.type === 'xls/';
      // if (!isJPG) {
      //   message.error('You can only upload JPG file!');
      // }
      // return false;
      console.log(/xls|xlsx/.test(file.name));
      if (!/xls|xlsx/.test(file.name)) {
          NotificationManager.error(`Excel format error`)
          return false;
      }
      NotificationManager.success(`Sudah memilih format file yg benar`)
      setFilelist([file]);
      return false;
  }

  const handleUpload = () => {
    const formData = new FormData();

    formData.append('datakuantitatifpr', fileList[0]);
    console.log("====> FILE LIST THAT WOULD BE UPLOADED")
    console.log(fileList);
    console.log(formData);
    console.log(props);

    setUploading(true);

    // handling upload file to backend
    fetchImportDataKuantitatifPR(props.token, {bulan: props.bulan,
      tahun: props.tahun,
      version_id: props.version_id,
      id_jenis_nilai: props.id_jenis_nilai
    }, formData);

    setTimeout(() => {
      handleChanged(moment().unix());
      setUploading(false);
      setFilelist([]);
    }, 2000);

  };

  const uploadProps = {
    onRemove: file => {
        setFilelist([])
      },
    beforeUpload: file => {
      // console.log("====FILE ORIGINAL : ");
      // console.log(file);
      // handleChange(file);
      beforeUpload(file);

      return false;
    },
    fileList
  };

  const handleExcelExport = () => {
    fetchExportExcel({
      token: props.token,
      props: {
        bulan: props.bulan,
        tahun: props.tahun,
        jenis: props.jenis,
        version_id: props.version_id,
        id_jenis_nilai: props.id_jenis_nilai
      }
    });
  }

  const handleSavePerItem = (
    text,
    record,
    index
  ) => {
    console.log("==> YOU CLICKED SAVE : ");
    console.log(text);
    console.log(record);
    console.log(index);
    console.log(newValue);
    enterLoading(index);
    let newValueFormated = newValue.value;
    newValueFormated = newValueFormated.substring(4);
    newValueFormated = newValueFormated.split(',').join('');
    console.log(newValueFormated);
    addRisikoInherenInputKuantitatifPerItem(props.token, {
      id_indikator: record.ratio_indikator_id,
    	id_jenis_nilai: 1,
    	value: Number(newValueFormated),
    	bulan: props.bulan,
    	tahun: props.tahun,
    	parameter_version_id: record.version_id
    });

    enterLoadingFalse(index);

  }

  // Back to filter
  const onClickCancel = () => {
      props.clickCancelFilterButton();
  };

  const columns = [
    {
      title: 'Ratio Indikator',
      dataIndex: 'ratio_indikator.name',
      key: 'ratio_indikator.name',
      width: '50%',
    },
    {
      title: 'Input Nilai',
      key: 'value',
      dataIndex: 'value',
      width: '40%',
      render: (text, record) => (
        // <TextField
        //   style={{ width: '100%' }}
        //   defaultValue={text}
        //   InputProps={{
        //     inputComponent: NumberFormatCustom
        //   }}
        //   onChange={handleChange("value")}
        // />
        <NumberFormat
          style={{ width: '100%' }}
          defaultValue={text}
          customInput={TextField}
          prefix={'Rp.  '}
          type="text"
          thousandSeparator={true}
          onChange={handleChange("value")}
        />
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (text, record, index) => (
        <React.Fragment>
          <span>
            <Button
              className="ant-btn ant-btn-primary"
              icon="save"
              key={index}
              loading={loading[index]}
              onClick={() => {
                handleSavePerItem(text, record, index);
              }}
            />
          </span>

          {/* <span>
            <Button
              className="ant-btn ant-btn-danger"
              icon="smile"
              onClick={() => {
                enterLoadingFalse(index, {
                  statusCode: 400,
                  message: "Data berhasil diupdate"
                })
              }}
            />
          </span>
          */}
        </React.Fragment>
      ),
    },
  ];

  return(
    <div>
      <Spin tip="Loading..." spinning={props.tableloading}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12} lg={3}>
            <Button
              className="ant-btn ant-btn-primary"
              icon="download"
              style={{ width: "100%" }}
              onClick={() => {
                handleExcelExport();
              }}
            >Download Template (Data Input)</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={5}>
            <Button className="ant-btn ant-btn-danger" onClick={onClickCancel}>Back Filter</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Upload
              {...uploadProps}
              >
              <Button>
                <UploadOutlined
                /> Select File
              </Button>
            </Upload>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Button
              className="ant-btn ant-btn-secondary"
              onClick={handleUpload}
              style={{ width: "100%" }}
              disabled={fileList.length === 0}
              loading={uploading}
            >
              {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
          </Grid>
        </Grid>
        <Table columns={columns} dataSource={props.data} />
      </Spin>
      <NotificationContainer/>
    </div>
  )
}

const WrappedTableRisikoInherenKuantitatif = Form.create()(TableRisikoInherenKuantitatif);

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchExportExcel: (token, props) => dispatch(fetchExportExcel(token, props)),
        fetchImportDataKuantitatifPR: (token, props, formData) => dispatch(fetchImportDataKuantitatifPR(token, props, formData)),
        addRisikoInherenInputKuantitatifPerItem: (token, newRisikoInherenInputKuantitatif) => dispatch(addRisikoInherenInputKuantitatifPerItem(token, newRisikoInherenInputKuantitatif))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedTableRisikoInherenKuantitatif);
