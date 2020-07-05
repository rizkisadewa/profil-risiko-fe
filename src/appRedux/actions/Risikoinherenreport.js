import {
  RISIKO_INHEREN_FETCH_REPORT_REQUEST,
  RISIKO_INHEREN_FETCH_REPORT_SUCCESS,
  RISIKO_INHEREN_FETCH_REPORT_FAILURE
} from '../../constants/ActionTypes';
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllRisikoInherenReportRequest = () => {
  return {
    type: RISIKO_INHEREN_FETCH_REPORT_REQUEST
  }
}

export const fetchAllRisikoInherenReportSuccesss = risikoinherenreport => {
  return {
    type: RISIKO_INHEREN_FETCH_REPORT_SUCCESS,
    payload: risikoinherenreport
  }
}


export const fetchAllRisikoInherenReportFailure = error => {
  return {
    type: RISIKO_INHEREN_FETCH_REPORT_FAILURE,
    payload: error
  }
}

export const fetchAllRisikoInherenReport = ({token, searchData}) => {
  if(typeof searchData !== 'undefined'){
    return(dispatch) => {
      dispatch(fetchAllRisikoInherenReportRequest());
      let url = `/api/all-report/preview?version_id=${searchData.version_id}&jenis=${searchData.jenis}&bulan=${searchData.bulan}&tahun=${searchData.tahun}&risk_id=${searchData.risk_id}`;
      axios.get(url, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          dispatch(fetchAllRisikoInherenReportSuccesss(responseData.data));
        } else {
          dispatch(fetchAllRisikoInherenReportFailure(responseData.message));
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenReportFailure(errorMsg));
      })
    }
  } else {
    return(dispatch) => {
      const errorMsg = "error, must be insert search data or parameter";
      dispatch(fetchAllRisikoInherenReportFailure(errorMsg));
    }
  }
}
