import React, {useState, useRef} from "react";
import {Divider, Button, Card, Table, Input, Spin, Pagination} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";

import SaveParameterKuantitatif from "./SaveParameterKuantitatif";
import EditParameterKuantitatif from "./EditParameterKuantitatif";

// import moment from 'moment';
import { connect } from 'react-redux';
import {
  fetchAllParameterKuantitatif,
  countAllParameterKuantitatif,
  deleteParameterKuantitatif,
  resetDeleteParameterKuantitatif
} from "../../../../appRedux/actions/Parameterkuantitatif";
import MySnackbarContentWrapper from "../../../../components/Snackbar/SnackBar";

function TableParameterKuantitatif ({
  authData,
  parameterKuantitatifTotal,
  fetchAllParameterKuantitatif,
  parameterKuantitatifData,
  countAllParameterKuantitatif,
  deleteParameterKuantitatif,
  deleteResponse,
  resetDeleteParameterKuantitatif
}){

    // state
    const [sortedInfo, setSortedInfo] = React.useState({});
    const [warning, setWarning] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [addbutton, setaddbutton] = React.useState(false);
    const [editbutton, seteditbutton] = React.useState(false);
    const [eid, setEid] = React.useState('');
    const [paging, setPaging] = React.useState(1);
    const [fetchdata, setFetchData] = React.useState([]);
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
    const [searchTarget, setSearchTarget] = React.useState({
      name: '',
      pr_low: '',
      pr_lowtomod: '',
      pr_mod: '',
      pr_modtohigh: '',
      pr_high: '',
      bobot: ''
    });

    // handling add / edit dialog
    const [changed, setChanged] = React.useState();

    // useEffect
    React.useEffect(() => {
      fetchAllParameterKuantitatif({
        token: authData.token,
        page: 1
      });
      countAllParameterKuantitatif(authData.token);

      if(typeof deleteResponse.statusCode !== "undefined"){
        clickDeleteSuccessButton(deleteResponse.statusCode, deleteResponse.message);
      }

    }, [changed, deleteResponse]);

    // Snackbar
    // Ref
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

    const handleChanged = value => {
      setChanged(value);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {

      setSearchTarget(oldValues => ({
        ...oldValues,
        [dataIndex] : selectedKeys[0]
      }));

      fetchAllParameterKuantitatif({
        token: authData.token,
        page: 1,
        searchData: searchTarget
      });

    }

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

      fetchAllParameterKuantitatif({
        token: authData.token,
        page: 1
      });

      countAllParameterKuantitatif(authData.token);
    }

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const onCancelDelete = () => {
        setWarning(false)
    };

    const onRefresh = () => {
        setLoading(true);
        console.log("**** SET ON FRESH CALLED *****");
        fetchAllParameterKuantitatif({
          token: authData.token,
          page: 1
        });
        countAllParameterKuantitatif(authData.token);
        setLoading(false);
    };

    const clickaddbutton = () => {
        setaddbutton(true);
        console.log(addbutton);
    };

    const clickCancelAddButton = event => {
        setaddbutton(false);
        onRefresh();
    };

    const clickCancelEditButton = event => {
        seteditbutton(false)
        onRefresh();
        setFetchData([]);
    }

    const onChangePagination = page => {
        setLoading(true);
        setPaging(page);
        fetchAllParameterKuantitatif({
          token: authData.token,
          page: page,
          searchData: searchTarget
        });
        setLoading(false);
    };

    const clickAddSuccessButton = (status, message) => {
      setaddbutton(false);

      // reload the
      setTimeout(() => handleChanged(moment().unix()), 2000);

      if(status === 201 || status === 200) {
        // NotificationManager.success("Data has saved.", `${message}`, 1000);
        handleSnackBar("success", `${message}`);
      } else {
        // NotificationManager.error("Data has not saved.", `${message}`, 1000);
        handleSnackBar("success", `${message}`);
      }

    }

    const clickEditSuccessButton = (status, message) => {

      seteditbutton(false);

      // reload the
      setTimeout(() => handleChanged(moment().unix()), 2000);

      if(status === 200 || status === 201) {
        handleSnackBar("success", `${message}`);

      } else {
        NotificationManager.error("Data Error during update.", `${message}`, 1000);
        handleSnackBar("error", `${message}`);
      }

      // reset fetch data
      setFetchData([]);
    }

    const handleDeleteButton = (id, name) => {
      setWarning(false);
      deleteParameterKuantitatif(authData.token, id);
    }

    const clickDeleteSuccessButton = (status, message) => {
      if(status === 200 || status === 201){
        console.log("a1");
        NotificationManager.success(`Success!`, `${message}`, 1500);
        handleSnackBar("success", `${message}`);
      } else {
        NotificationManager.error(`Failed!`, `${message}`, 1500);
        handleSnackBar("error", `${message}`);
      }
    }

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
                                (edData.edpr_low !== '' && dataIndex === 'pr_low') ?
                                    edData.edpr_low :
                                    (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ?
                                        edData.edpr_lowtomod :
                                        (edData.edpr_mod !== '' && dataIndex === 'pr_mod') ?
                                            edData.edpr_mod :
                                                (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ?
                                                    edData.edpr_modtohigh :
                                                        (edData.edpr_high !== '' && dataIndex === 'pr_high') ?
                                                            edData.edpr_high :
                                                                (edData.edbobot !== '' && dataIndex === 'bobot') ?
                                                                    edData.edbobot :
                                                                    selectedKeys[0]
                    }
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width:188, marginBottom:8, display:'block'}}
                />

                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
                (edData.edname !== '' && dataIndex === 'name') || (edData.edpr_low !== '' && dataIndex === 'pr_low') ||
                (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') || (edData.edpr_mod !== '' && dataIndex === 'pr_mod') ||
                (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') || (edData.edpr_high !== '' && dataIndex === 'pr_high')||
                (edData.edbobot !== '' && dataIndex === 'bobot')) ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: 'ffc069', padding:0}}
                        searchWords={[(edData.edname !== '' && dataIndex === 'name') ? edData.edname :
                                        (edData.edpr_low !== '' && dataIndex === 'pr_low') ? edData.edpr_low :
                                            (edData.edpr_lowtomod !== '' && dataIndex === 'pr_lowtomod') ? edData.edpr_lowtomod :
                                                (edData.edpr_mod !== '' && dataIndex === 'pr_mod') ? edData.edpr_mod :
                                                    (edData.edpr_modtohigh !== '' && dataIndex === 'pr_modtohigh') ? edData.edpr_modtohigh :
                                                        (edData.edpr_high !== '' && dataIndex === 'pr_high') ? edData.edpr_high :
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
        sorter: (a, b) => a.risk_name.localeCompare(b.risk_name),
        sortOrder: sortedInfo.columnKey === 'risk_name' && sortedInfo.order
    },{
        title:"Parameter",
        dataIndex:"name",
        key:"name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order
    }, {
        title:"Induk Parameter",
        dataIndex:"parameter_induk",
        key:"parameter_induk",
        ...getColumnSearchProps('parameter_induk'),
        sorter: (a, b) => a.parameter_induk.localeCompare(b.parameter_induk),
        sortOrder: sortedInfo.columnKey === 'parameter_induk' && sortedInfo.order
    }, {
        title: 'Peringkat Risiko Parameter Kuantitatif',
        children: [
            {
                title:"Low",
                dataIndex:"pr_low",
                key:"pr_low",
                ...getColumnSearchProps('pr_low'),
                sorter:(a, b) => a.pr_low.localeCompare(b.pr_low),
                sortOrder:sortedInfo.columnKey === 'pr_low' && sortedInfo.order
            }, {
                title:"Low To Moderate",
                dataIndex:"pr_lowtomod",
                key:"pr_lowtomod",
                ...getColumnSearchProps('pr_lowtomod'),
                sorter:(a, b) => a.pr_lowtomod.localeCompare(b.pr_lowtomod),
                sortOrder:sortedInfo.columnKey === 'pr_lowtomod' && sortedInfo.order
            }, {
                title:"Moderate",
                dataIndex:"pr_mod",
                key:"pr_mod",
                ...getColumnSearchProps('pr_mod'),
                sorter:(a, b) => a.pr_mod.localeCompare(b.pr_mod),
                sortOrder:sortedInfo.columnKey === 'pr_mod' && sortedInfo.order
            }, {
                title:"Moderate To High",
                dataIndex:"pr_modtohigh",
                key:"pr_modtohigh",
                ...getColumnSearchProps('pr_modtohigh'),
                sorter:(a, b) => a.pr_modtohigh.localeCompare(b.pr_modtohigh),
                sortOrder:sortedInfo.columnKey === 'pr_modtohigh' && sortedInfo.order
            }, {
                title:"High",
                dataIndex:"pr_high",
                key:"pr_high",
                ...getColumnSearchProps('pr_high'),
                sorter:(a, b) => a.pr_high.localeCompare(b.pr_high),
                sortOrder:sortedInfo.columnKey === 'pr_high' && sortedInfo.order
            }
        ]
    }, {
        title:"Bobot",
        dataIndex:"bobot",
        key:"bobot",
        getColumnSearchProps: getColumnSearchProps('bobot'),
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
                  for(let i=0;i<text.parameterVersionList.length;i++){
                    masterversionlistdata.push(parseInt(text.parameterVersionList[i].mst_version.id));
                  }

                  console.log("=====TEXT")
                  console.log(text);

                  setFetchData([
                    ...fetchdata,
                    {
                        id:parseInt(text.id),
                        risk:text.risk,
                        parameter:text.parameter,
                        name: text.name,
                        pr_low:parseInt(text.pr_low),
                        pr_lowtomod:parseInt(text.pr_lowtomod),
                        pr_mod:parseInt(text.pr_mod),
                        pr_modtohigh:parseInt(text.pr_modtohigh),
                        pr_high:parseInt(text.pr_high),
                        bobot:parseInt(text.bobot),
                        penomoran:parseInt(text.penomoran),
                        level:text.level,
                        indukparameter:text.indukparameter,
                        risk_id: parseInt(text.risk_id),
                        jenis_nilai_id:parseInt(text.jenis_nilai_id),
                        induk_id: parseInt(text.induk_id),
                        parameter_faktor_id: parseInt(text.parameter_faktor_id),
                        masterversionlist: masterversionlistdata,
                        ratioindikatorformula: text.ratioIndikatorFormulaList
                    }
                  ]);

                  console.log(text);
                }}>Edit</span>
                <Divider type="vertical"/>
                <span className="gx-link" onClick={() => {
                    setWarning(true);
                    setFetchData([
                      {
                          id:parseInt(text.id),
                          risk:text.risk,
                          parameter:text.parameter,
                          name: text.name,
                          pr_low:parseInt(text.pr_low),
                          pr_lowtomod:parseInt(text.pr_lowtomod),
                          pr_mod:parseInt(text.pr_mod),
                          pr_modtohigh:parseInt(text.pr_modtohigh),
                          pr_high:parseInt(text.pr_high),
                          bobot:parseInt(text.bobot),
                          id_indikator_pembilang:parseInt(text.id_indikator_pembilang),
                          id_indikator_penyebut:parseInt(text.id_indikator_penyebut),
                          penomoran:parseInt(text.penomoran),
                          level:text.level,
                          indukparameter:text.indukparameter,
                          risk_id: parseInt(text.risk_id),
                          jenis_nilai_id:parseInt(text.jenis_nilai_id),
                          induk_id: parseInt(text.induk_id)
                      }
                    ]);
                }}>Delete</span>
            </span>
        )
    }];


    return parameterKuantitatifData.loading ? (
      <Card title="Read Table Parameter Kuantitatif">
          <div className="table-operations">
              <Button className="ant-btn ant-btn-primary">Add</Button>
              <Button className="ant-btn">Refresh</Button>
          </div>
          <Spin tip="Loading..." spinning={true}>
              <Table dataSource={parameterKuantitatifData.parameterkuantitatifdata}
              className="gx-table-responsive"
              columns={columns} rowKey="id" pagination={false} />
              <div className="table-operations" style={{ paddingTop : '1rem', float : 'right' }}>
              </div>
          </Spin>
      </Card>
    ) : (
        <Card title={addbutton ? "Tambah Kuantitatif" : editbutton ? "Edit Data : ID["+eid+"]"  : "Read Table Parameter Kuantitatif"}>
            {
                addbutton ? <SaveParameterKuantitatif clickCancelAddButton={clickCancelAddButton} clickAddSuccessButton={clickAddSuccessButton}/> :
                editbutton ? <EditParameterKuantitatif clickCancelEditButton={clickCancelEditButton}
                                                        clickEditSuccessButton={clickEditSuccessButton} fetchdata={fetchdata} eid={eid} /> :
                        <>
                            <div className="table-operations">
                                <Button className="ant-btn ant-btn-primary" onClick={clickaddbutton}>Add</Button>
                                <Button className="ant-btn" onClick={onRefresh}>Refresh</Button>
                            </div>
                            <Spin tip="Loading..." spinning={loading}>
                                <Table dataSource={parameterKuantitatifData.parameterkuantitatifdata}
                                className="gx-table-responsive" onChange={handleChange}
                                columns={columns} rowKey="id" pagination={false} />
                                <div className="table-operations" style={{ paddingTop : '1rem', float : 'right' }}>
                                  {
                                      (parameterKuantitatifData.countallparameterkuantatitif) ?
                                          parameterKuantitatifData.countallparameterkuantatitif > 0 ?
                                              <Pagination current={paging} total={parameterKuantitatifData.countallparameterkuantatitif ? parameterKuantitatifData.countallparameterkuantatitif : 1} onChange={onChangePagination}/> : ''
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
                                          // setWarning(false);
                                          // deleteParameterKuantitatif(authData.token, fetchdata[0].id);
                                          // setTimeout(() => handleChanged(moment().unix()), 2000);
                                          // resetDeleteParameterKuantitatif();
                                          // NotificationManager.success("done", "test", 1500);

                                          handleDeleteButton(fetchdata[0].id, fetchdata[0].name);
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
}

const mapStateToProps = state => {
  return {
    authData: state.auth,
    parameterKuantitatifData: state.parameterkuantitatif,
    deleteResponse: state.parameterkuantitatif.deleteparameterkuantiatatifresult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAllParameterKuantitatif: (token, page, searchData) => dispatch(fetchAllParameterKuantitatif(token, page, searchData)),
    countAllParameterKuantitatif: (token) => dispatch(countAllParameterKuantitatif(token)),
    deleteParameterKuantitatif: (token, id) => dispatch(deleteParameterKuantitatif(token, id)),
    resetDeleteParameterKuantitatif: () => dispatch(resetDeleteParameterKuantitatif()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableParameterKuantitatif);
