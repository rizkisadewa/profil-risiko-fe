import {
  EXCEL_EXPORT_REQUEST,
  EXCEL_EXPORT_SUCCESS,
  EXCEL_EXPORT_FAILURE,
  EXCEL_IMPORT_DATA_KUANTITATIF_PR_REQUEST,
  EXCEL_IMPORT_DATA_KUANTITATIF_PR_SUCCESS,
  EXCEL_IMPORT_DATA_KUANTITATIF_PR_FAILURE
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchExportExcelRequest = () => {
  return {
    type: EXCEL_EXPORT_REQUEST
  }
}

export const fetchExportExcelSuccess = exportexcel => {
  return {
    type: EXCEL_EXPORT_SUCCESS,
    payload: exportexcel
  }
}

export const fetchExportExcelFailure = error => {
  return {
    type: EXCEL_EXPORT_FAILURE,
    payload: error
  }
}

export const fetchExportExcel = ({token, props}) => {
  return (dispatch) => {
    try {
      dispatch(fetchExportExcelRequest());

      let url = `${backendUrl}api/excel-export?bulan=${props.bulan}&tahun=${props.tahun}&jenis=${props.jenis}&version_id=${props.version_id}&id_jenis_nilai=${props.id_jenis_nilai}`;

      axios.get(url, {
        responseType: 'blob',
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `template-risikoinheren-data-kuantitatif-${props.bulan}_${props.tahun}.xlsx`); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();

      });
      dispatch(fetchExportExcelSuccess({
        statusCode: 200,
        message: 'Data berhasil diexport'
      }))
    } catch (error){
      dispatch(fetchExportExcelFailure({
        statusCode: 400,
        message: 'Data gagal diexport'
      }))
    }
  }
}

export const fetchImportDataKuantitatifPRRequest = () => {
  return {
    type: EXCEL_IMPORT_DATA_KUANTITATIF_PR_REQUEST
  }
}

export const fetchImportDataKuantitatifPRSuccess = importdatakuantitatifpr => {
  return {
    type: EXCEL_IMPORT_DATA_KUANTITATIF_PR_SUCCESS,
    payload: importdatakuantitatifpr
  }
}

export const fetchImportDataKuantitatifPRFailure = error => {
  return {
    type: EXCEL_IMPORT_DATA_KUANTITATIF_PR_FAILURE,
    payload: error
  }
}

export const fetchImportDataKuantitatifPR = (token, props, formData) => {
  return async (dispatch) => {
    dispatch(fetchImportDataKuantitatifPRRequest());

    let url = `${backendUrl}api/input-data/ratio-indikator/bulk/attachment?bulan=${props.bulan}&tahun=${props.tahun}&version_id=${props.version_id}&id_jenis_nilai=${props.id_jenis_nilai}`;
    await axios.post(url, formData, {
      headers: {
        Authorization: "Bearer "+token,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      const responseData = response.data;
      dispatch(fetchImportDataKuantitatifPRSuccess(responseData));
    }).catch(error => {
      dispatch(fetchImportDataKuantitatifPRFailure(error.message));
    })
  }
}

export const resetFetchImportDataKuantitatifPR = () => {
  return async (dispatch) => {
    dispatch({
      type: EXCEL_IMPORT_DATA_KUANTITATIF_PR_SUCCESS,
      payload: []
    })
  }
}
