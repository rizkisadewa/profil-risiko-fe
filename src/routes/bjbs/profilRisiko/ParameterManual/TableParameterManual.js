import React from "react";
import {Divider, Button, Card, Table, Spin} from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import {NotificationContainer, NotificationManager} from "react-notifications";
import IntlMessages from "util/IntlMessages";
import SaveParameterManual from "./SaveParameterManual";

const { Column, ColumnGroup } = Table;

class TableParameterManual extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            datatable: [],
            sortedInfo: null,
            warning:false,
            deletestatus:'',
            loading:false,
            addbutton: false,
        }
    }

    componentWillMount(){
        this.setState({
            datatable : [{
                id:1,
                risk:'Test',
                parameter:'Test',
                low:'Test',
                lowtomoderate:'Test',
                moderate:'Test',
                moderatetohigh:'Test',
                high:'Test',
                bobot:'Test',
                bulan:this.props.fetchdata[0].stringmonth,
                tahun:this.props.fetchdata[0].isyear
            },{
                id:2,
                risk:'Test',
                parameter:'Test',
                low:'Test',
                lowtomoderate:'Test',
                moderate:'Test',
                moderatetohigh:'Test',
                high:'Test',
                bobot:'Test',
                bulan:this.props.fetchdata[0].stringmonth,
                tahun:this.props.fetchdata[0].isyear
            },{
                id:3,
                risk:'Test',
                parameter:'Test',
                low:'Test',
                lowtomoderate:'Test',
                moderate:'Test',
                moderatetohigh:'Test',
                high:'Test',
                bobot:'Test',
                bulan:this.props.fetchdata[0].stringmonth,
                tahun:this.props.fetchdata[0].isyear
            },{
                id:4,
                risk:'Test',
                parameter:'Test',
                low:'Test',
                lowtomoderate:'Test',
                moderate:'Test',
                moderatetohigh:'Test',
                high:'Test',
                bobot:'Test',
                bulan:this.props.fetchdata[0].stringmonth,
                tahun:this.props.fetchdata[0].isyear
            },{
                id:5,
                risk:'Test',
                parameter:'Test',
                low:'Test',
                lowtomoderate:'Test',
                moderate:'Test',
                moderatetohigh:'Test',
                high:'Test',
                bobot:'Test',
                bulan:this.props.fetchdata[0].stringmonth,
                tahun:this.props.fetchdata[0].isyear
            }]
        })
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

    onClickCancel = () => {
        this.props.clickCancelFilterButton();
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

    render() {
        const {datatable,warning, loading, addbutton} = this.state;
        let {sortedInfo} = this.state;
        sortedInfo = sortedInfo || {};
        return (
            <Card title={addbutton ? "Tambah Parameter & Indikator" : "Read Table Parameter Manual"}>
                {
                    addbutton ? <SaveParameterManual clickCancelAddButton={this.clickCancelAddButton}/> :
                        <>
                            <div className="table-operations">
                                <Button className="ant-btn ant-btn-danger" onClick={this.onClickCancel}>Back Filter</Button>
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
                                    title="Bulan"
                                    dataIndex="bulan"
                                    key="bulan"
                                    sorter={(a, b) => a.bulan.localeCompare(b.bulan)}
                                    sortOrder={sortedInfo.columnKey === 'bulan' && sortedInfo.order}
                                />
                                <Column
                                    title="Tahun"
                                    dataIndex="tahun"
                                    key="tahun"
                                    sorter={(a, b) => a.tahun.localeCompare(b.tahun)}
                                    sortOrder={sortedInfo.columnKey === 'tahun' && sortedInfo.order}
                                />
                                <Column
                                    title="Action"
                                    dataIndex="id"
                                    key="id"
                                    render={(text, record) => (
                                        <span>
                                            <span className="gx-link">Edit</span>
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
}

export default TableParameterManual;