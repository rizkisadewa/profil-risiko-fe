import React from "react";
import {Form, Card} from "antd";
// import {Button, Input, Form, Select, InputNumber, Spin} from "antd";
import connect from "react-redux/es/connect/connect";
import {
  fetchAllRisikoInherenInputKuantitatif,
  addRisikoInherenInputKuantitatif,
  resetAddRisikoInherenInputKuantitatif,
  fetchExportExcel,
  resetFetchImportDataKuantitatifPR,
  resetFetchAllRisikoInherenInputKuantitatif
} from "../../../../../appRedux/actions/index";
import {NotificationContainer, NotificationManager} from "react-notifications";
import TableRisikoInherenKuantitatif from './TableRisikoInherenKuantitatif';
// import local css
import './mystyle.css';

class SaveRisikoInherenKuantitatif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datarisikoinhereninputkuantitatif : [],
            paramrisk_id : props.fetchdata ? props.fetchdata[0].risks : 0,
            parambulan : props.fetchdata ? props.fetchdata[0].ismonth : 0,
            paramtahun : props.fetchdata ? props.fetchdata[0].isyear : 0,
            version_id : props.fetchdata ? props.fetchdata[0].version_id : 0,
            version_name: props.fetchdata ? props.fetchdata[0].version_name : '',
            risk_name : props.fetchdata ? props.fetchdata[0].risk_name : '',
            tableloading: true,
            isInput:false,
        }
    }

    onRefresh = () => {
      this.setState({
          tableloading: true
      });

      this.props.fetchAllRisikoInherenInputKuantitatif({token: this.props.token, searchData: {
        bulan: this.state.parambulan,
        tahun: this.state.paramtahun,
        jenis: 'PR',
        version_id: this.state.version_id,
        id_jenis_nilai: 1
      }});

      this.setState({
          tableloading: false
      });
    }

    clickImportSuccessButton = (props) => {
        // this.props.getAllFaktorParameterTable({page:this.state.paging, token:this.props.token});
        this.setState({
          tableloading: true
        });
        this.props.resetFetchAllRisikoInherenInputKuantitatif();

        this.props.fetchAllRisikoInherenInputKuantitatif({token: this.props.token, searchData: {
          bulan: this.state.parambulan,
          tahun: this.state.paramtahun,
          jenis: 'PR',
          version_id: this.state.version_id,
          id_jenis_nilai: 1
        }});

        this.setState({
          datarisikoinhereninputkuantitatif: this.state.risikoinhereninputkuantitatifdata,
          tableloading: false
        });
    }


    componentDidMount(){
      this.props.fetchAllRisikoInherenInputKuantitatif({token: this.props.token, searchData: {
        bulan: this.state.parambulan,
        tahun: this.state.paramtahun,
        jenis: 'PR',
        version_id: this.state.version_id,
        id_jenis_nilai: 1
      }});
    }

    componentWillReceiveProps(nextProps){

        this.setState({
          datarisikoinhereninputkuantitatif: nextProps.risikoinhereninputkuantitatifdata.data
        });

        if(nextProps.risikoinhereninputkuantitatifdata.statusCode === 200 || nextProps.risikoinhereninputkuantitatifdata.statusCode === 201){
          this.setState({
            tableloading: false
          })
        }

        // Notif import by excel
        switch(nextProps.importdatakuantitatifpr.statusCode){
          case 200:
          case 201:
            this.clickImportSuccessButton(nextProps.risikoinhereninputkuantitatifdata.data);
            NotificationManager.success(nextProps.importdatakuantitatifpr.message, "Success !!");
            this.props.resetFetchImportDataKuantitatifPR();
            break;
          case 400:
            this.clickImportSuccessButton(nextProps.risikoinhereninputkuantitatifdata.data);
            NotificationManager.error(nextProps.importdatakuantitatifpr.message, "Error !!");
            this.props.resetFetchImportDataKuantitatifPR();
            break;
          default:
            break;
        }

        // notif save per item
        switch(nextProps.addrisikoinhereninputkuantitatifresult.statusCode){
          case 200:
          case 201:
            NotificationManager.success(nextProps.addrisikoinhereninputkuantitatifresult.message, "Success !!");
            this.props.resetAddRisikoInherenInputKuantitatif();
            break;
          case 400:
            NotificationManager.error(nextProps.addrisikoinhereninputkuantitatifresult.message, "Failed !!");
            this.props.resetAddRisikoInherenInputKuantitatif();
            break
          default:
            break;
        }

    }

    render() {

        var monthText = '';
        switch(this.state.parambulan){
          case 1:
            monthText = "Januari";
            break;
          case 2:
            monthText = "Pebruari";
            break;
          case 3:
            monthText = "Maret";
            break;
          case 4:
            monthText = "April";
            break;
          case 5:
            monthText = "Mei";
            break;
          case 6:
            monthText = "Juni";
            break;
          case 7:
            monthText = "July";
            break;
          case 8:
            monthText = "Agustus";
            break;
          case 9:
            monthText = "September";
            break;
          case 10:
            monthText = "Oktober";
            break;
          case 11:
            monthText = "November";
            break;
          case 12:
            monthText = "Desember";
            break;
          default:
            break;
        }

        const {
            datarisikoinhereninputkuantitatif
        } = this.state;

        // const dataDummy = [
        //   {
        //     id: 1321,
        //     risk_id: 45,
        //     name: "Agunan yang diambil alih",
        //     bulan: 6,
        //     tahun: 2020,
        //     parameter_faktor: "K 20 - Sandi LBUSB kode 218 atau cross check ke P3 -- AYDA",
        //     value: "13,847"
        //   },
        //   {
        //     id: 1322,
        //     risk_id: 45,
        //     name: "Total Pembiayaan Non Bank",
        //     bulan: 6,
        //     tahun: 2020,
        //     parameter_faktor: "Hasil Penjumlahan dari Kolektibilitas",
        //     value: "20,628,243,896"
        //   }
        // ]

        return (
          <Card title={`Data Risiko Inheren Kuantitatif (hitungan dalam jutaan) : ${monthText} ${this.state.paramtahun} (${this.state.version_name})`}>
            <>
                <TableRisikoInherenKuantitatif
                  data={datarisikoinhereninputkuantitatif}
                  tableloading={this.state.tableloading}
                  bulan={this.state.parambulan}
                  tahun={this.state.paramtahun}
                  jenis='PR'
                  version_id={this.state.version_id}
                  id_jenis_nilai={1}
                  token={this.props.token}
                  clickCancelFilterButton={this.props.clickCancelFilterButton}
                />
            </>
            <NotificationContainer/>
          </Card>
        );
    }

}

const WrappedSaveRisikoInherenKuantitatif = Form.create()(SaveRisikoInherenKuantitatif);

const mapStateToProps = ({
  auth,
  risikoinhereninputkuantitatif,
  exportexcel
}) => {
    const {token} = auth;
    const {
      risikoinhereninputkuantitatifdata,
      addrisikoinhereninputkuantitatifresult
    } = risikoinhereninputkuantitatif;
    const {
      exportexceldata,
      importdatakuantitatifpr
    } = exportexcel;
    return {
      token,
      risikoinhereninputkuantitatifdata,
      addrisikoinhereninputkuantitatifresult,
      exportexceldata,
      importdatakuantitatifpr
    }
};

export default connect(mapStateToProps, {
  fetchAllRisikoInherenInputKuantitatif,
  addRisikoInherenInputKuantitatif,
  resetAddRisikoInherenInputKuantitatif,
  fetchExportExcel,
  resetFetchImportDataKuantitatifPR,
  resetFetchAllRisikoInherenInputKuantitatif
})(WrappedSaveRisikoInherenKuantitatif);
