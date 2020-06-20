import {
  FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_REQUEST,
  FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_SUCCESS,
  FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_FAILURE,
  COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
  ADD_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
  DELETE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
  GET_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
  UPDATE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF
} from "../../constants/ActionTypes";

const initialState = {
  countallparameterkualitatifdualalternatif: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
  loading: false,
  parameterkualitatifdualalternatifdata: [],
  addparameterkualitatifdualalternatifresult: [],
  updateparameterkualitatifdualalternatifresult: [],
  oneofparameterkualitatifdualalternatifdata: [],
  deleteparameterkualitatifdualalternatifresult: [],
  getparameterkualitatifdualalternatif: GET_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
  error: ''
}

const Parameterkualitatifdualalternatif = (state = initialState, action) => {
  switch(action.type){
    case COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF: {
      return {
        ...state,
        countallparameterkualitatifdualalternatif: action.payload
      }
    }

    case FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_SUCCESS: {
      return {
        ...state,
        loading: false,
        parameterkualitatifdualalternatifdata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_FAILURE: {
      return {
        ...state,
        loading: false,
        parameterkualitatifdualalternatifdata: [],
        error: action.payload
      }
    }

    case ADD_PARAMETER_KUALITATIF_DUAL_ALTERNATIF: {
      return {
        ...state,
        loading: false,
        addparameterkualitatifdualalternatifresult: action.payload,
        error: ''
      }
    }

    case DELETE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF: {
      return {
        ...state,
        loading: false,
        deleteparameterkualitatifdualalternatifresult: action.payload,
        error: ''
      }
    }

    case UPDATE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF: {
      return {
        ...state,
        loading: false,
        updateparameterkualitatifdualalternatifresult: action.payload,
        error: ''
      }
    }

    default:
      return state;

  }

  // Finish
}

export default Parameterkualitatifdualalternatif;
