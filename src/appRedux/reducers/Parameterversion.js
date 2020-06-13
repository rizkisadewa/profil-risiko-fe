import {
  ADD_PARAMETER_VERSION,
  DELETE_PARAMETER_VERSION,
  FETCH_ALL_PARAMETER_VERSION_REQUEST,
  FETCH_ALL_PARAMETER_VERSION_SUCCESS,
  FETCH_ALL_PARAMETER_VERSION_FAILURE,
  COUNT_PARAMETER_VERSION
} from "../../constants/ActionTypes";

const initialState = {
  loading: false,
  addparameterversionresult: [],
  deleteprameterversionresult: [],
  parameterversiondata: [],
  countallparameterversion : COUNT_PARAMETER_VERSION,
  error: ''
}

const Parameterversion = (state = initialState, action) => {
  switch (action.type){
    case COUNT_PARAMETER_VERSION : {
      return {
        ...state,
        countallparameterversion : action.payload
      }
    }

    case FETCH_ALL_PARAMETER_VERSION_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case FETCH_ALL_PARAMETER_VERSION_SUCCESS: {
      return {
        ...state,
        loading: false,
        parameterversiondata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_PARAMETER_VERSION_FAILURE: {
      return {
        ...state,
        loading: false,
        parameterversiondata: [],
        error: action.payload
      }
    }

    case ADD_PARAMETER_VERSION : {
      return {
        ...state,
        loading: false,
        addparameterversionresult: action.payload,
        error: ''
      }
    }

    case DELETE_PARAMETER_VERSION : {
      return {
        ...state,
        loading: false,
        deleteparameterversionresult: action.payload,
        error: ''
      }
    }

    default:
      return state;
  }
}

export default Parameterversion;
