import {
  UPDATE_PARAMETER_KUANTITATIF,
  ADD_PARAMETER_KUANTITATIF,
  DELETE_PARAMETER_KUANTITATIF,
  COUNT_PARAMETER_KUANTATIF,
  FETCH_ALL_PARAMETER_KUANTITATIF_REQUEST,
  FETCH_ALL_PARAMETER_KUANTITATIF_SUCCESS,
  FETCH_ALL_PARAMETER_KUANTITATIF_FAILURE,
  GET_PARAMETER_KUANTITATIF
} from "../../constants/ActionTypes";

const initialState = {
  countallparameterkuantatitif: COUNT_PARAMETER_KUANTATIF,
  loading: false,
  parameterkuantitatifdata: [],
  addparameterkuantitatifresult: [],
  updateparameterkuantitatifresult: [],
  oneofparameterkuantitatifdata: [],
  deleteparameterkuantiatatifresult: [],
  getparameterkuantitatif: GET_PARAMETER_KUANTITATIF,
  error: ''
};

const Parameterkuantitatif = (state = initialState, action) => {
  switch (action.type) {

    case COUNT_PARAMETER_KUANTATIF: {
      return {
        ...state,
        countallparameterkuantatitif: action.payload,
      }
    }

    case FETCH_ALL_PARAMETER_KUANTITATIF_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_ALL_PARAMETER_KUANTITATIF_SUCCESS: {
      return {
        ...state,
        loading: false,
        parameterkuantitatifdata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_PARAMETER_KUANTITATIF_FAILURE: {
      return {
        ...state,
        loading: false,
        parameterkuantitatifdata: [],
        error: action.payload
      }
    }

    case ADD_PARAMETER_KUANTITATIF: {
      return {
        ...state,
        loading: false,
        addparameterkuantitatifresult: action.payload,
        error: ''
      }
    }

    case UPDATE_PARAMETER_KUANTITATIF: {
      return {
        ...state,
        loading: false,
        updateparameterkuantitatifresult: action.payload,
        error: ''
      }
    }

    case GET_PARAMETER_KUANTITATIF: {
      return {
        ...state,
        loading: false,
        getparameterkuantitatif: action.payload,
        error: ''
      }
    }

    case DELETE_PARAMETER_KUANTITATIF : {
      var newState = Object.assign({}, state);
      return {
        loading: false,
        deleteparameterkuantiatatifresult: action.payload,
        error: '',
        newState: newState
      }
    }

    default:
      return state;

  }
}

export default Parameterkuantitatif;
