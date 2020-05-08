import React from "react";
import {Divider, Button, Card, Table, Spin} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";

// import component
import SaveParameterKualitatif from "./SaveParameterKualitatif";
import EditParameterKualitatif from "./EditParameterKualitatif";

const { Column , ColumnGroup } = Table;

class TableParameterKualitatif extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          datatable: [],
          sortedInfo: null,
          warning:false,
          deletestatus:'',
          loading:false,
          addbutton: (props.propstate) ? props.propstate.addtrue : false,
          editbutton: (props.propstate) ? props.propstate.edittrue : false,
          eid: (props.propstate) ? props.propstate.pkid : "",
          fetchdata: []
      }
  }

  componentWillMount(){
      this.setState({
          datatable : [
            {
              id:1,
              risk:'Risiko Kredit',
              parameter:'Proses penyediaan dana, tingkat kompetisi dan tingkat pertumbuhan aset',
              low:"Sumber dana berasal dari dana ritel dengan pricing kompetitif dan meningkatkan pertumbuhan aset",
              lowtomoderate: '',
              moderate:"Sumber dana berasal dari dana ritel dan korporasi dengan pricing cukup kompetitif dan meningkatkan pertumbuhan aset",
              moderatetohigh:'',
              high:"	Sumber dana berasal dana ritel dan korporasi dengan pricing spesial nisbah dan meningkatkan pertumbuhan aset",
              bobot:80,
              penomoran: 10,
              level:2,
              id_jenis_nilai : 2
            },
            {
              id:2,
              risk:'Risiko Kredit',
              parameter:'Kondisi Ekonomi',
              low:"Kondisi ekonomi baik dan kondusif sehingga meningkatkan kemampuan membayar nasabah",
              lowtomoderate: '',
              moderate:"Kondisi ekonomi cukup baik namun tidak berpengaruh kepada kemampuan membayar nasabah",
              moderatetohigh:'',
              high:"	Kondisi ekonomi tidak baik dan tidak kondusif sehingga mengurangi kemampuan membayar nasabah",
              bobot:60,
              penomoran: 11,
              level:2,
              id_jenis_nilai : 2
            },
            {
              id:3,
              risk:'Risiko Kredit',
              parameter:'Strategi dan produk baru',
              low:"Tidak terdapat perubahan strategi penyediaan dana atau pemasaran produk baru",
              lowtomoderate: '',
              moderate:"Terdapat perubahan strategi penyediaan dana atau pemasaran produk baru, namun tidak berpotensi meningkatkan eksposur risiko kredit di Bank",
              moderatetohigh:'',
              high:"Terdapat perubahan strategi penyediaan dana atau pemasaran produk baru yang menambah eksposur risiko kredit bank",
              bobot:10,
              penomoran: 11,
              level:2,
              id_jenis_nilai : 2
            },
            {
              id:4,
              risk:'Risiko Kredit',
              parameter:'Perubahan teknologi',
              low:"Perubahan teknologi meningkatkan kemampuan membayar nasabah",
              lowtomoderate: '',
              moderate:"Perubahan teknologi tidak berpengaruh kepada kemampuan membayar nasabah",
              moderatetohigh:'',
              high:"Perubahan teknologi mengurangi kemampuan membayar nasabah",
              bobot:20,
              penomoran: 11,
              level:2,
              id_jenis_nilai : 2
            },

        ]
      })

      if (this.props.cancelprop) {
          this.onRefresh();
      }
  }

  componentDidUpdate(){
      if(this.state.loading){
          setTimeout(() => {
              this.setState({
                  loading:false
              })
          },300)
      }
  }

  handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
          // filteredInfo: filters,
          sortedInfo: sorter,
      });
  };

  onCancelDelete = () => {
      this.setState({
          warning: false
      })
  };

  onRefresh = () => {
      this.setState({
          loading:true,
      });
  };

  clickAddButton = () => {
      this.setState({
          addbutton: true
      })
  };

  clickCancelAddButton = () => {
      this.setState({
          addbutton: false
      })
      this.onRefresh();
  };

  clickCancelEditButton = () => {
      this.setState({
          editbutton: false,
      })
      this.onRefresh();
  }

  handleChange = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter);
      this.setState({
          // filteredInfo: filters,
          sortedInfo: sorter,
      });
  };

  onCancelDelete = () => {
      this.setState({
          warning: false
      })
  };

  onRefresh = () => {
      this.setState({
          loading:true,
      });
  };

  clickAddButton = () => {
      this.setState({
          addbutton: true
      })
  };

  clickCancelAddButton = () => {
      this.setState({
          addbutton: false
      })
      this.onRefresh();
  };

  clickCancelEditButton = () => {
      this.setState({
          editbutton: false,
      })
      this.onRefresh();
  }

  render() {
    const {datatable, warning, loading, addbutton, editbutton, eid, fetchdata} = this.state;
    const {propstate} = this.props;
    let {sortedInfo} = this.state;
    sortedInfo = sortedInfo || {};

    return (
      <Card title={addbutton ? "Tambah Kualitatif" : editbutton ? "Edit Data : ID["+eid+"]"  : "Read Table Parameter Kualitatif"}>
        {
            addbutton ? <SaveParameterKualitatif clickCancelAddButton={this.clickCancelAddButton} addPropstate={(propstate) ? propstate : false}/> :
            editbutton ? <EditParameterKualitatif clickCancelEditButton={this.clickCancelEditButton} addPropstate={(propstate) ? propstate : false} fetchdata={fetchdata} eid={eid} /> :
                    <>
                        <div className="table-operations">
                            <Button className="ant-btn ant-btn-primary" onClick={this.clickAddButton}>Add</Button>
                            <Button className="ant-btn" onClick={this.onRefresh}>Refresh</Button>
                        </div>
                        <Spin tip="Loading..." spinning={loading}>
                            <Table dataSource={datatable} className="gx-table-responsive" onChange={this.handleChange} rowKey="id">
                                <Column
                                    title="#"
                                    dataIndex="id"
                                    key="id"
                                    sorter={(a, b) => a.id-b.id}
                                    sortOrder={sortedInfo.columnKey === 'id' && sortedInfo.order}
                                />
                                <Column
                                    title="Risk"
                                    dataIndex="risk"
                                    key="risk"
                                    sorter={(a, b) => a.risk.localeCompare(b.risk)}
                                    sortOrder={sortedInfo.columnKey === 'risk' && sortedInfo.order}
                                />
                                <Column
                                    title="Parameter"
                                    dataIndex="parameter"
                                    key="parameter"
                                    sorter={(a, b) => a.parameter.localeCompare(b.parameter)}
                                    sortOrder={sortedInfo.columnKey === 'parameter' && sortedInfo.order}
                                />
                                <ColumnGroup title="Peringkat Risiko">
                                    <Column
                                        title="Low"
                                        dataIndex="low"
                                        key="low"
                                        sorter={(a, b) => a.low.localeCompare(b.low)}
                                        sortOrder={sortedInfo.columnKey === 'low' && sortedInfo.order}
                                    />
                                    <Column
                                        title="Low To Moderate"
                                        dataIndex="lowtomoderate"
                                        key="lowtomoderate"
                                        sorter={(a, b) => a.lowtomoderate.localeCompare(b.lowtomoderate)}
                                        sortOrder={sortedInfo.columnKey === 'lowtomoderate' && sortedInfo.order}
                                    />
                                    <Column
                                        title="Moderate"
                                        dataIndex="moderate"
                                        key="moderate"
                                        sorter={(a, b) => a.moderate.localeCompare(b.moderate)}
                                        sortOrder={sortedInfo.columnKey === 'moderate' && sortedInfo.order}
                                    />
                                    <Column
                                        title="Moderate To High"
                                        dataIndex="moderatetohigh"
                                        key="moderatetohigh"
                                        sorter={(a, b) => a.moderatetohigh.localeCompare(b.moderatetohigh)}
                                        sortOrder={sortedInfo.columnKey === 'moderatetohigh' && sortedInfo.order}
                                    />
                                    <Column
                                        title="High"
                                        dataIndex="high"
                                        key="high"
                                        sorter={(a, b) => a.high.localeCompare(b.high)}
                                        sortOrder={sortedInfo.columnKey === 'high' && sortedInfo.order}
                                    />
                                </ColumnGroup>
                                <Column
                                    title="Bobot"
                                    dataIndex="bobot"
                                    key="bobot"
                                    sorter={(a, b) => a.bobot.localeCompare(b.bobot)}
                                    sortOrder={sortedInfo.columnKey === 'bobot' && sortedInfo.order}
                                />
                                <Column
                                    title="Action"
                                    key="action"
                                    render={(text, record) => (
                                        <span>
                                    <span className="gx-link" onClick={() => {
                                        this.setState({
                                            eid : text.id,
                                            editbutton: true,
                                            fetchdata : [{
                                                id:text.id,
                                                risk:text.risk,
                                                parameter:text.parameter,
                                                low:text.low,
                                                lowtomoderate:text.lowtomoderate,
                                                moderate:text.moderate,
                                                moderatetohigh:text.moderatetohigh,
                                                high:text.high,
                                                bobot:text.bobot,
                                                indikatorpembilang:text.indikatorpembilang,
                                                indikatorpenyebut:text.indikatorpenyebut,
                                                penomoran:text.penomoran,
                                                level:text.level,
                                                indukparameter:145,
                                                risk_id:10,
                                                id_jenis_nilai:text.id_jenis_nilai
                                            }]
                                        })
                                    }}>Edit</span>
                                    <Divider type="vertical"/>
                                    <span className="gx-link" onClick={() => {
                                        this.setState({
                                            warning: true
                                        })
                                    }}>Delete</span>
                                </span>
                                    )}
                                />
                            </Table>
                        </Spin>
                        <SweetAlert show={warning}
                                    warning
                                    showCancel
                                    confirmBtnText={<IntlMessages id="sweetAlerts.yesDeleteIt"/>}
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title={<IntlMessages id="sweetAlerts.areYouSure"/>}
                                    onConfirm={() => {
                                        this.setState({
                                            warning: false,
                                            deletestatus:''
                                        })
                                        NotificationManager.success("Data has deleted.", "Success !!");
                                    }}
                                    onCancel={this.onCancelDelete}
                        >
                            <IntlMessages id="sweetAlerts.youWillNotAble"/>
                        </SweetAlert>
                    </>
        }
        <NotificationContainer/>
      </Card>
    );

  }

  // Finish
}

export default TableParameterKualitatif;
