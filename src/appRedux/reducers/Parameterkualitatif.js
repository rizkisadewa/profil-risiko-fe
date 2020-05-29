import {
  UPDATE_PARAMETER_KUALITATIF,
  ADD_PARAMETER_KUALITATIF,
  DELETE_PARAMETER_KUALITATIF,
  COUNT_PARAMETER_KUALITATIF,
  FETCH_ALL_PARAMETER_KUALITATIF_REQUEST,
  FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS,
  FETCH_ALL_PARAMETER_KUALITATIF_FAILURE,
  GET_PARAMETER_KUALITATIF
}from "../../constants/ActionTypes";

const initialState = {
  countallparameterkualitatif: COUNT_PARAMETER_KUALITATIF,
  loading: false,
  parameterkualitatifdata: [],
  addparameterkualitatifresult: [],
  updateparameterkualitatifresult: [],
  oneofparameterkualitatifdata: [],
  deleteparameterkualitatifresult: [],
  getparameterkualitatif: GET_PARAMETER_KUALITATIF,
  error: ''
}

const Parameterkualitatif = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_PARAMETER_KUALITATIF:
      return {
        ...state,
        countallparameterkualitatif: action.payload
      }

    case FETCH_ALL_PARAMETER_KUALITATIF_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS: {
      return {
        ...state,
        loading: false,
        parameterkualitatifdata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_PARAMETER_KUALITATIF_FAILURE: {
      return {
        ...state,
        loading: false,
        parameterkualitatifdata: [],
        error: action.payload
      }
    }

    case ADD_PARAMETER_KUALITATIF: {
      return {
        ...state,
        loading: false,
        addparameterkualitatifresult: action.payload,
        error: ''
      }
    }

    case UPDATE_PARAMETER_KUALITATIF: {
      return {
        ...state,
        loading: false,
        updateparameterkualitatifresult: action.payload,
        error: ''
      }
    }

    case DELETE_PARAMETER_KUALITATIF: {
      return {
        loading: false,
        deleteparameterkualitatifresult: action.payload,
        error: ''
      }
    }

    default:
      return state;
  }

}

export default Parameterkualitatif;
