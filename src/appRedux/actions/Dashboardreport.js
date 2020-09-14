import {
   DASHBOARD_REPORT_REQUEST,
   DASHBOARD_REPORT_SUCCESS,
   DASHBOARD_REPORT_FAILED
} from '../../constants/ActionTypes';
import axios from 'util/Api';
import { backendUrl } from 'util/Api';

export const fetchAllDashboardReportRequest = () => {
  return {
    type: DASHBOARD_REPORT_REQUEST
  }
}

export const fetchAllDashboardReportSuccess = dasboardreport => {
  return {
    type: DASHBOARD_REPORT_SUCCESS,
    payload: dasboardreport
  }
}

export const fetchAllDashboardReportFailed = error => {
  return {
    type: DASHBOARD_REPORT_FAILED,
    payload: error
  }
}

export const fetchAllDashboardReport = ({token, searchData}) => {

  if(typeof searchData === 'undefined'){
    return (async (dispatch) => {
      dispatch(fetchAllDashboardReportFailed({
        statusCode: 400,
        status: "error",
        message: "Query url harus diisi , data bulan dan tahun"
      }));
    })
  } else {
    return (async (dispatch) => {
      dispatch(fetchAllDashboardReportRequest());

      var searchParameters = '';

      let paramColumn = [
        "bulan",
        "tahun"
      ];

      let searchCounter = 1;

      let paramValue = [
        searchData.bulan,
        searchData.tahun
      ];

      // looping all column
      for(let i=0;i<paramColumn.length;i++){
        // process only for not undefined
        console.log("Param Column ke-"+i);
        console.log(" Tipe : "+typeof paramColumn[i]+", Value : "+paramColumn[i]);
        // process only for not undefined
        console.log("Param Value ke-"+i);
        console.log(" Tipe : "+typeof paramValue[i]+", Value : "+paramValue[i]);
        if(typeof paramValue[i] !== 'undefined'){
          // conditon for number greater than 0
          if(paramValue[i] !== ""){
            searchCounter += 1;

            if(searchCounter > 1) {
              searchParameters += '&';
            }
            searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

          }
        }
      }

      // execute the url
      await axios({
        method: 'GET',
        url: `/api/dashboard?${searchParameters}`,
        baseURL: backendUrl,
        headers: {
          Authorization: "Bearer "+token
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }).then((response) => {
        const responseData = response.data;
        dispatch(fetchAllDashboardReportSuccess(responseData));

      }).catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAllDashboardReportFailed(errorMsg));
      });


    })

  }


  // finish block
}
