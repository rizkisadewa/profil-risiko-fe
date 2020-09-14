import {
   DASHBOARD_REPORT_REQUEST,
   DASHBOARD_REPORT_SUCCESS,
   DASHBOARD_REPORT_FAILED
} from '../../constants/ActionTypes';


const initialState = {
  loading: false,
  error: '',
  dashboardreportdata: []
}

const Dashboardreport = (state = initialState,  action) => {
  switch (action.type) {
    case DASHBOARD_REPORT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case DASHBOARD_REPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        dashboardreportdata: action.payload,
        error: ''
      }
    }

    case DASHBOARD_REPORT_FAILED: {
      return {
        ...state,
        loading: false,
        dashboardreportdata: [],
        error: action.payload
      }
    }

    default:
      return state;

  }

  // Finish block
}

export default Dashboardreport;
