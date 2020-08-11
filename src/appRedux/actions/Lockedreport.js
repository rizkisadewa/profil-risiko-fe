import {
  LOCKED_REPORT_STATUS_REQUEST,
  LOCKED_REPORT_STATUS_SUCCESS,
  LOCKED_REPORT_STATUS_FAILURE,
  LOCKED_REPORT_FETCH_REQUEST,
  LOCKED_REPORT_FETCH_SUCCESS,
  LOCKED_REPORT_FETCH_FAILURE,
  LOCKED_REPORT_ADD_REQUEST,
  LOCKED_REPORT_ADD_SUCCESS,
  LOCKED_REPORT_ADD_FAILURE
} from '../../constants/ActionTypes';
import { backendUrl } from "util/Api";

import axios from 'util/Api';


/* LOCKED REPPORT FETCH */
export const fetchLockedReportRequest = () => {
  return {
    type: LOCKED_REPORT_FETCH_REQUEST
  }
}

export const fetchLockedReportSuccess = lockedreport => {
  return {
    type: LOCKED_REPORT_FETCH_SUCCESS,
    payload: lockedreport
  }
}

export const fetchLockedReportFailure = error => {
  return {
    type: LOCKED_REPORT_FETCH_FAILURE,
    payload: error
  }
}

export const fetchLockedReport = ({token, searchData}) => {
  return async (dispatch) => {
    dispatch(fetchLockedReportRequest());
    try {

      const rawResponse = await axios({
        method: "GET",
        url: `/api/locked-report?bulan=${searchData.bulan}&tahun=${searchData.tahun}&risk_id=${searchData.risk_id}`,
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      if(response.statusCode === 200 || response.statusCode === 201) {
        dispatch(fetchLockedReportSuccess(response));
      } else {
        dispatch(fetchLockedReportFailure(response));
      }

    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchLockedReportFailure(errorMsg));
    }
  }
}

/* LOCKED REPPORT FETCH */
export const lockedReportStatusRequest = () => {
  return {
    type: LOCKED_REPORT_STATUS_REQUEST
  }
}

export const lockedReportStatusSuccess = lockedreportstatus => {
  return {
    type: LOCKED_REPORT_STATUS_SUCCESS,
    payload: lockedreportstatus
  }
}

export const lockedReportStatusFailure = error => {
  return {
    type: LOCKED_REPORT_STATUS_FAILURE,
    payload: error
  }
}

export const lockedReportStatus = ({token, searchData}) => {
  return async (dispatch) => {
    dispatch(lockedReportStatusRequest());

    try {

      const rawResponse = await axios({
        method: "GET",
        url: `/api/locked-report/status?bulan=${searchData.bulan}&tahun=${searchData.tahun}&risk_id=${searchData.risk_id}`,
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      if(response.statusCode === 200 || response.statusCode === 201) {
        dispatch(lockedReportStatusSuccess(response));
      } else {
        dispatch(lockedReportStatusFailure(response));
      }

    } catch (error) {
      const errorMsg = error.message;
      dispatch(lockedReportStatusFailure(errorMsg));
    }
  }
}

/* LOCKED REPPORT ADD */
export const addLockedReportRequest = () => {
  return {
    type: LOCKED_REPORT_ADD_REQUEST
  }
}

export const addLockedReportSuccess = lockedreportaddresult => {
  return {
    type: LOCKED_REPORT_ADD_SUCCESS,
    payload: lockedreportaddresult
  }
}

export const addLockedReportFailure = error => {
  return {
    type: LOCKED_REPORT_ADD_FAILURE,
    payload: error
  }
}

export const addLockedReport = ({token, newData}) => {
  return async (dispatch) => {
    dispatch(addLockedReportRequest());

    try {

      const rawResponse = await axios({
        method: "POST",
        url: `/api/locked-report`,
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        data: {
          data: newData
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      if(response.statusCode === 200 || response.statusCode === 201) {
        dispatch(addLockedReportSuccess(response));
      } else {
        dispatch(addLockedReportFailure(response));
      }

    } catch (error) {
      const errorMsg = error.message;
      dispatch(addLockedReportFailure(errorMsg));
    }
  }
}

export const resetAddLockedReport = () => {
  return {
    type: LOCKED_REPORT_ADD_SUCCESS,
    payload: []
  }
}
