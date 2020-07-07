import React, {useState, useRef} from "react";
import {Divider, Button, Card, Input, Table, Spin, Pagination} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import IntlMessages from "util/IntlMessages";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Snackbar from "@material-ui/core/Snackbar";

// import component
import SaveKpmrParameterKualitatif from "./SaveKpmrParameterKualitatif";
import EditKpmrParameterKualitatif from "./EditKpmrParameterKualitatif";
import { connect } from 'react-redux';
import moment from "moment";
// import actions
import {
  fetchAllParameterKualitatif,
  countAllParameterKualitatif,
  kpmrDeleteParameterKualitatif,
  resetDeleteParameterKualitatif,
  kpmrFetchAllParameterKualitatif
} from "../../../../appRedux/actions/index";
import MySnackbarContentWrapper from "../../../../components/Snackbar/SnackBar";

function TableKpmrParameterKualitatif ({
  authData,
  parameterKualitatifData,
  fetchAllParameterKualitatif,
  countAllParameterKualitatif,
  kpmrDeleteParameterKualitatif,
  resetDeleteParameterKualitatif,
  deleteResponse,
  kpmrFetchAllParameterKualitatif
}){

  // state
  const [edData, setEdData] = React.useState({
    edname:'',
    edpr_low : '',
    edpr_lowtomod : '',
    edpr_mod : '',
    edpr_modtohigh : '',
    edpr_high : '',
    edbobot : '',
    searchInput: ''
  });

  const [sortedInfo, setSortedInfo] = React.useState({});
  const [warning, setWarning] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [addbutton, setaddbutton] = React.useState(false);
  const [editbutton, seteditbutton] = React.useState(false);
  const [eid, setEid] = React.useState("");
  const [fetchdata, setFetchdata] = React.useState([]);
  const [paging, setPaging] = React.useState(1);
  // handling add / edit dialog
  const [changed, setChanged] = React.useState();

  // state for target
  const [searchTarget, setSearchTarget] = React.useState({
    risk_id: '',
    name: '',
    penomoran: '',
    urutan_sub: '',
    level: '',
    induk_id: '',
    bobot: '',
    jenis_nilai_id: '',
    ratio_manual: '',
    pr_low_name: '',
    pr_lowtomod_name: '',
    pr_mod: '',
    pr_modtohigh: '',
    pr_high: '',
    version: '',
    bulan: '',
    tahun: '',
    id_indikator_penyebut: '',
    id_indikator_pembilang: ''
  });

  // TABLE HANDLE
  // function
  const getColumnSearchProps = dataIndex => ({
      filterDropdown : ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
          <div style={{padding : 8}}>
              <Input
                  ref={node => {
                      edData.searchInput = node;
                  }}
                  placeholder={`Search ${dataIndex}`}
                  value={
                      (edData.edname !== '' && dataIndex === 'name') ?
                          edData.edname :
                      (edData.edpr_low !== '' && dataIndex === 'pr_low_name') ?
                          edData.edpr_low :
                      (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod_name') ?
                          edData.edpr_lowtomod :
                      (edData.edpr_mod !== '' && dataIndex === 'pr_mod_name') ?
                          edData.edpr_mod :
                      (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh_name') ?
                          edData.edpr_modtohigh :
                      (edData.edpr_high !== '' && dataIndex === 'pr_high_name') ?
                          edData.edpr_high :
                      (edData.edbobot !== '' && dataIndex === 'bobot') ?
                          edData.edbobot :
                      selectedKeys[0]
                  }
                  onChange={e => {

                    setSelectedKeys(e.target.value ? [e.target.value] : [])
                    setSearchTarget({
                      ...searchTarget,
                      [dataIndex] : e.target.value
                    });
                  }}
                  onPressEnter={() => handleSearch(searchTarget)}
                  style={{width:188, marginBottom:8, display:'block'}}
              />

              <Button
                  type="primary"
                  onClick={() => handleSearch(searchTarget)}
                  icon={'<SearchOutlined/>'}
                  size="small"
                  style={{width:90, marginRight:8}}
              >Search</Button>

              <Button onClick={() => handleReset(clearFilters, dataIndex)} size="small" style={{width:90}}>Reset</Button>
          </div>
      ),

      filterIcon : filtered => <SearchOutlined style={{color:
              (edData.edname !== '' && dataIndex === 'name') ?
                  '#1890ff' :
                      (edData.edpr_low !== '' && dataIndex === 'pr_low') ?
                          '#1890ff' :
                          (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ?
                              '#1890ff' :
                              (edData.edpr_mod !== '' && dataIndex === 'pr_mod') ?
                                  '#1890ff' :
                                  (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ?
                                      '#1890ff' :
                                      (edData.edpr_high !== '' && dataIndex === 'pr_high') ?
                                          '#1890ff' :
                                          (edData.edbobot !== '' && dataIndex === 'bobot') ?
                                              '#1890ff' :
                                          filtered ? '#1890ff' :
                                              undefined
      }}/>,
      onFilter : (value, record) =>
          record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange : visible => {
          if (visible){
              setTimeout(() => edData.searchInput.select());
          }
      },
      render : text =>
          (
              (edData.edname !== '' && dataIndex === 'name') || (edData.edpr_low !== '' && dataIndex === 'pr_low_name') ||
              (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod_name') || (edData.edpr_mod !== '' && dataIndex === 'pr_mod_name') ||
              (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh_name') || (edData.edpr_high !== '' && dataIndex === 'pr_high_name')||
              (edData.edbobot !== '' && dataIndex === 'bobot')
          )
          ? (
                  <Highlighter
                      highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                      searchWords={[(edData.edname !== '' && dataIndex === 'name') ? edData.edname :
                                      (edData.edpr_low !== '' && dataIndex === 'pr_low_name') ? edData.edpr_low :
                                          (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod_name') ? edData.edpr_lowtomod :
                                              (edData.edpr_mod !== '' && dataIndex === 'pr_mod_name') ? edData.edpr_mod :
                                                  (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh_name') ? edData.edpr_modtohigh :
                                                      (edData.edpr_high !== '' && dataIndex === 'pr_high_name') ? edData.edpr_high :
                                                          (edData.edbobot !== '' && dataIndex === 'bobot') ? edData.edbobot :
                                                              edData.searchText
                      ]}
                      autoEscape
                      textToHighlight={text.toString()}
                  />
          ) :
              edData.searchedColumn === dataIndex ? (
                  <Highlighter
                      highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                      searchWords={[edData.searchText]}
                      autoEscape
                      textToHighlight={text.toString()}
                  />
              ) : (text),
  });
  const columns = [
    {
        title:"#",
        dataIndex:"id",
        key:"id",
        sorter:(a, b) => a.id-b.id,
        sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    }, {
        title:"Risk",
        dataIndex:"risk_name",
        key:"risk_name",
        sorter: (a, b) => a.risk_name.localeCompare(b.risk_id),
        sortOrder: sortedInfo.columnKey === 'risk_name' && sortedInfo.order
    },{
        title:"Parameter",
        dataIndex:"name",
        key:"name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    },{
        title:"Induk Parameter",
        dataIndex:"parameter_induk",
        key:"parameter_induk",
        ...getColumnSearchProps('parameter_induk'),
        sorter: (a, b) => a.parameter_induk.localeCompare(b.parameter_induk),
        sortOrder: sortedInfo.columnKey === 'parameter_induk' && sortedInfo.order
    }, {
        title: 'Peringkat Risiko Parameter Kualitatif',
        children: [
            {
                title:"Low",
                dataIndex:"pr_low_name",
                key:"pr_low_name",
                ...getColumnSearchProps('pr_low_name'),
                sorter:(a, b) => a.pr_low_name.localeCompare(b.pr_low_name),
                sortOrder:sortedInfo.columnKey === 'pr_low_name' && sortedInfo.order
            }, {
                title:"Low To Moderate",
                dataIndex:"pr_lowtomod_name",
                key:"pr_lowtomod_name",
                ...getColumnSearchProps('pr_lowtomod_name'),
                sorter:(a, b) => a.pr_lowtomod_name.localeCompare(b.pr_lowtomod_name),
                sortOrder:sortedInfo.columnKey === 'pr_lowtomod_name' && sortedInfo.order
            }, {
                title:"Moderate",
                dataIndex:"pr_mod_name",
                key:"pr_mod_name",
                ...getColumnSearchProps('pr_mod_name'),
                sorter:(a, b) => a.pr_mod_name.localeCompare(b.pr_mod_name),
                sortOrder:sortedInfo.columnKey === 'pr_mod_name' && sortedInfo.order
            }, {
                title:"Moderate To High",
                dataIndex:"pr_modtohigh_name",
                key:"pr_modtohigh_name",
                ...getColumnSearchProps('pr_modtohigh_name'),
                sorter:(a, b) => a.pr_modtohigh_name.localeCompare(b.pr_modtohigh_name),
                sortOrder:sortedInfo.columnKey === 'pr_modtohigh_name' && sortedInfo.order
            }, {
                title:"High",
                dataIndex:"pr_high_name",
                key:"pr_high_name",
                ...getColumnSearchProps('pr_high_name'),
                sorter:(a, b) => a.pr_high_name.localeCompare(b.pr_high_name),
                sortOrder:sortedInfo.columnKey === 'pr_high_name' && sortedInfo.order
            }
        ]
    }, {
        title:"Bobot",
        dataIndex:"bobot",
        key:"bobot",
        ...getColumnSearchProps('bobot'),
        sorter:(a, b) => a.bobot.localeCompare(b.bobot),
        sortOrder:sortedInfo.columnKey === 'bobot' && sortedInfo.order,
        render: (data) => (
            data+'%'
        )
    }, {
        title:"Action",
        key:"action",
        render:(text, record) => (
            <span>
                <span className="gx-link" onClick={() => {
                  setEid(text.id);
                  seteditbutton(true);

                  // sorting value for selected master version in parameter version
                  let masterversionlistdata = [];
                  for(let i=0;i<text.master_version_list.length;i++){
                    masterversionlistdata.push(parseInt(text.master_version_list[i].version_id));
                  }

                  setFetchdata([
                    ...fetchdata,
                    {
                      id:text.id,
                      risk:text.risk,
                      name:text.name,
                      pr_low_name:text.pr_low_name,
                      pr_lowtomod_name:text.pr_lowtomod_name,
                      pr_mod_name:text.pr_mod_name,
                      pr_modtohigh_name:text.pr_modtohigh_name,
                      pr_high_name:text.pr_high_name,
                      pr_low:text.pr_low,
                      pr_lowtomod:text.pr_lowtomod,
                      pr_mod:text.pr_mod,
                      pr_modtohigh:text.pr_modtohigh,
                      pr_high:text.pr_high,
                      bobot:text.bobot,
                      indikatorpembilang:text.indikatorpembilang,
                      indikatorpenyebut:text.indikatorpenyebut,
                      penomoran:text.penomoran,
                      level:text.level,
                      induk_id:text.induk_id,
                      risk_id:text.risk_id,
                      id_jenis_nilai:text.id_jenis_nilai,
                      parameter_faktor_id: text.parameter_faktor_id,
                      masterversionlist: masterversionlistdata,
                    }
                  ]);
                }}>Edit</span>
                <Divider type="vertical"/>
                <span className="gx-link" onClick={() => {
                      setWarning(true)
                      setEid(text.id);
                }}>Delete</span>
            </span>
        )
    }
  ]

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const onCancelDelete = () => {
      setWarning(false);
  };

  const onRefresh = () => {
      setLoading(true);
      kpmrFetchAllParameterKualitatif({
        token: authData.token,
        page: 1,
        searchData: {
          jenis: "KPMR"
        }
      });
      setLoading(false);
  };

  // *** ADD BUTTON ***
  const clickAddButton = () => {
      setaddbutton(true);
  };

  const clickCancelAddButton = () => {
    setaddbutton(false);
    onRefresh();
  };

  const clickAddSuccessButton = (status, message) => {
    setaddbutton(false);

    // reload the
    setTimeout(() => handleChanged(moment().unix()), 2000);

    if(status === 201 || status === 200) {
      // NotificationManager.success("Data has saved.", `${message}`, 1000);
      console.log("Message from add success button : ");
      console.log(message);
      handleSnackBar("success", `${message}`);
    } else {
      // NotificationManager.error("Data has not saved.", `${message}`, 1000);
      handleSnackBar("success", `${message}`);
    }

  }

  // **** EDIT BUTTON ****
  const clickCancelEditButton = () => {
    seteditbutton(false);
    onRefresh();
  }

  const clickEditSuccessButton = (status, message) => {

    seteditbutton(false);

    /// reload the table
    setTimeout(() => handleChanged(moment().unix()), 2000);

    if(status === 201 || status === 200) {
      // NotificationManager.success("Data has saved.", `${message}`, 1000);
      handleSnackBar("success", `${message}`);
    } else {
      // NotificationManager.error("Data has not saved.", `${message}`, 1000);
      handleSnackBar("success", `${message}`);
    }

  }


  // handle searching
  const handleSearch = (searchTarget) => {

    fetchAllParameterKualitatif({
      token: authData.token,
      page: 1,
      searchData: searchTarget
    });

  }

  // handle reset
  const handleReset = () => {
    setSearchTarget({
      name: '',
      pr_low: '',
      pr_lowtomod: '',
      pr_mod: '',
      pr_modtohigh: '',
      pr_high: '',
      bobot: ''
    });

    setEdData({
      edname:'',
      edpr_low : '',
      edpr_lowtomod : '',
      edpr_mod : '',
      edpr_modtohigh : '',
      edpr_high : '',
      edbobot : '',
      searchInput: ''
    });

    fetchAllParameterKualitatif({
      token: authData.token,
      page: 1
    });

    countAllParameterKualitatif(authData.token);
  }

  // handle changed in useEffect
  const handleChanged = value => {
    setChanged(value);
  };

  // *** HANDLE SNACKBAR ****
  const queueRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  }
  const handleSnackBar = (type, message, open) => {
    queueRef.current.push({
      message,
      key: new Date().getTime(),
      type
    });
    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleCloseSB = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExitedSB = () => {
    processQueue();
  };

  const onChangePagination = page => {
      setLoading(true);
      setPaging(page);
      fetchAllParameterKualitatif({
        token: authData.token,
        page: page,
        searchData: searchTarget
      });
      setLoading(false);
  };

  // delete button
  const handleDeleteButton = (id) => {
    setWarning(false);
    kpmrDeleteParameterKualitatif(authData.token, id);
  }

  const clickDeleteSuccessButton = (status, message) => {
    if(status === 200 || status === 201){
      handleSnackBar("success", `${message}`);
    } else {
      handleSnackBar("error", `${message}`);
    }
  }

  // use Effect
  React.useEffect(() => {
    kpmrFetchAllParameterKualitatif({
      token: authData.token,
      page: 1,
      searchData: {
        jenis: "KPMR"
      }
    });

    countAllParameterKualitatif(authData.token);

    // handle snackbar
    if(typeof deleteResponse.statusCode !== "undefined") {
      clickDeleteSuccessButton(deleteResponse.statusCode, deleteResponse.message);
    }
  }, [changed, deleteResponse])

  return parameterKualitatifData.loading ? (
    <Card title="Read Table Parameter Kualitatif">
        <div className="table-operations">
            <Button className="ant-btn ant-btn-primary">Add</Button>
            <Button className="ant-btn">Refresh</Button>
        </div>
        <Spin tip="Loading..." spinning={true}>
            <Table dataSource={parameterKualitatifData.parameterkualitatifdata}
            className="gx-table-responsive"
            columns={columns} rowKey="id" pagination={false} />
            <div className="table-operations" style={{ paddingTop : '1rem', float : 'right' }}>
            </div>
        </Spin>
    </Card>
  ) : (
    <Card title={addbutton ? "Tambah Kualitatif" : editbutton ? "Edit Data : ID["+eid+"]"  : "Read Table Parameter Kualitatif (Multi Alternatif)"}>
      {
          addbutton ? <SaveKpmrParameterKualitatif clickCancelAddButton={clickCancelAddButton} clickAddSuccessButton={clickAddSuccessButton} /> :
          editbutton ? <EditKpmrParameterKualitatif clickCancelEditButton={clickCancelEditButton}
                                                clickEditSuccessButton={clickEditSuccessButton} fetchdata={fetchdata} eid={eid} /> :
                  <>
                      <div className="table-operations">
                          <Button className="ant-btn ant-btn-primary" onClick={clickAddButton}>Add</Button>
                          <Button className="ant-btn" onClick={onRefresh}>Refresh</Button>
                      </div>
                      <Spin tip="Loading..." spinning={loading}>
                          <Table
                            dataSource={parameterKualitatifData.parameterkualitatifdata}
                            className="gx-table-responsive"
                            onChange={handleChange}
                            rowKey="id"
                            columns={columns}
                            pagination={false}
                            />
                          <div className="table-operations" style={{ paddingTop : '1rem', float : 'right' }}>
                            {
                              (parameterKualitatifData.countallparameterkualitatif) ?
                                  parameterKualitatifData.countallparameterkualitatif > 0 ?
                                      <Pagination current={paging} total={parameterKualitatifData.countallparameterkualitatif ? parameterKualitatifData.countallparameterkualitatif : 1} onChange={onChangePagination}/> : ''
                                  : ''
                            }
                          </div>
                      </Spin>
                      <SweetAlert show={warning}
                                  warning
                                  showCancel
                                  confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt"/>}
                                  confirmBtnBsStyle="danger"
                                  cancelBtnBsStyle="default"
                                  title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                                  onConfirm={() => {
                                      handleDeleteButton(eid);
                                      // setWarning(false);
                                      // setDeletestatus('');
                                      // NotificationManager.success("Data has deleted.", "Success !!");
                                  }}
                                  onCancel={onCancelDelete}
                      >
                          <IntlMessages id="sweetAlerts.youWillNotAble"/>
                      </SweetAlert>
                  </>
      }
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={5000}
        onClose={handleCloseSB}
        onExited={handleExitedSB}
      >
        <MySnackbarContentWrapper
          onClose={handleCloseSB}
          variant={messageInfo ? messageInfo.type : undefined}
          message={messageInfo ? messageInfo.message : undefined}
        />
      </Snackbar>
    </Card>
  );

  // Finish
}

const mapStateToProps = state => {
  return {
    authData: state.auth,
    parameterKualitatifData: state.kpmrparameterkualitatif,
    deleteResponse: state.kpmrparameterkualitatif.deleteparameterkualitatifresult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllParameterKualitatif: (token, page, searchData) => dispatch(fetchAllParameterKualitatif(token, page, searchData)),
    kpmrFetchAllParameterKualitatif: (token, page, searchData) => dispatch(kpmrFetchAllParameterKualitatif(token, page, searchData)),
    countAllParameterKualitatif: (token) => dispatch(countAllParameterKualitatif(token)),
    kpmrDeleteParameterKualitatif: (token, id) => dispatch(kpmrDeleteParameterKualitatif(token, id)),
    resetDeleteParameterKualitatif: () => dispatch(resetDeleteParameterKualitatif())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableKpmrParameterKualitatif);
