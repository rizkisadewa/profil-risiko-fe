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

const initialState = {
  loading: false,
  error: '',
  lockedreportdata: [],
  lockedreportstatus: [],
  lockedreportaddresult: []
}

const Lockedreport = (state = initialState, action) => {
  switch (action.type) {

    case LOCKED_REPORT_FETCH_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case LOCKED_REPORT_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        lockedreportdata: action.payload,
        error: ''
      }
    }

    case LOCKED_REPORT_FETCH_FAILURE : {
      return {
        ...state,
        loading: false,
        lockedreportdata: [],
        error: action.payload
      }
    }

    case LOCKED_REPORT_ADD_REQUEST : {
      return {
        ...state,
        loading: true
      }
    }

    case LOCKED_REPORT_STATUS_REQUEST:{
      return {
        ...state,
        loading: true
      }
    }

    case LOCKED_REPORT_STATUS_SUCCESS: {
      return {
        ...state,
        loading: false,
        lockedreportstatus: action.payload,
        error: ''
      }
    }

    case LOCKED_REPORT_STATUS_FAILURE: {
      return {
        ...state,
        loading: false,
        lockedreportstatus: [],
        error: action.payload
      }
    }

    case LOCKED_REPORT_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        lockedreportaddresult: action.payload,
        error: ''
      }
    }

    case LOCKED_REPORT_ADD_FAILURE: {
      return {
        ...state,
        loading: false,
        lockedreportaddresult: [],
        error: action.payload
      }
    }


    default:
      return state;

  }
}

export default Lockedreport;
