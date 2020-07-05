import {
  RISIKO_INHEREN_FETCH_REPORT_REQUEST,
  RISIKO_INHEREN_FETCH_REPORT_SUCCESS,
  RISIKO_INHEREN_FETCH_REPORT_FAILURE
} from '../../constants/ActionTypes';

const initialState = {
  loading: false,
  error: '',
  risikoinherenreportdata: []
};

const Risikoinherenreport = (state = initialState, action) => {
  switch (action.type){
    case RISIKO_INHEREN_FETCH_REPORT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case RISIKO_INHEREN_FETCH_REPORT_SUCCESS : {
      return {
        ...state,
        loading: false,
        risikoinherenreportdata: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_FETCH_REPORT_FAILURE : {
      return {
        ...state,
        loading: false,
        risikoinherenreportdata: [],
        error: action.payload
      }
    }

    default:
      return state;

    // finish condition
  }

  // finish block
}

export default Risikoinherenreport;
