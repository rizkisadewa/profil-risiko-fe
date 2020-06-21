import {
  KPMR_FETCH_ALL_PARAMETER_KUALITATIF_REQUEST,
  KPMR_FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS,
  KPMR_FETCH_ALL_PARAMETER_KUALITATIF_FAILURE,
  KPMR_COUNT_PARAMETER_KUALIATIF,
  KPMR_ADD_PARAMETER_KUALITATIF,
  KPMR_DELETE_PARAMETER_KUALITATIF,
  KPMR_GET_PARAMETER_KUALITATIF,
  KPMR_UPDATE_PARAMETER_KUALITATIF
} from "../../constants/ActionTypes";

const initialState = {
  countallparameterkualitatif: KPMR_COUNT_PARAMETER_KUALIATIF,
  loading: false,
  parameterkualitatifdata: [],
  addparameterkualitatifresult: [],
  updateparameterkualitatifresult: [],
  oneofparameterkualitatifdata: [],
  deleteparameterkualitatifresult: [],
  getparameterkualitatif: KPMR_GET_PARAMETER_KUALITATIF,
  error: ''
}

const Kpmrparameterkualitatif = (state = initialState, action) => {
  switch(action.type){
    case KPMR_COUNT_PARAMETER_KUALIATIF: {
      return {
        ...state,
        countallparameterkualitatif: action.payload
      }
    }
    case KPMR_FETCH_ALL_PARAMETER_KUALITATIF_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case KPMR_FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS : {
      return {
        ...state,
        loading: false,
        parameterkualitatifdata: action.payload,
        error: ''
      }
    }

    case KPMR_FETCH_ALL_PARAMETER_KUALITATIF_FAILURE : {
      return {
        ...state,
        loading: false,
        parameterkualitatifdata: [],
        error: action.payload
      }
    }

    case KPMR_ADD_PARAMETER_KUALITATIF : {
      return {
        ...state,
        loading: false,
        addparameterkualitatifresult: action.payload,
        error: ''
      }
    }

    case KPMR_DELETE_PARAMETER_KUALITATIF : {
      return {
        ...state,
        loading: false,
        deleteparameterkualitatifresult: action.payload,
        error: ''
      }
    }

    case KPMR_UPDATE_PARAMETER_KUALITATIF : {
      return {
        ...state,
        loading: false,
        updateparameterkualitatifresult: action.payload,
        error: ''
      }
    }

    default:
      return state;


    // finish
  }

  // finish
}

export default Kpmrparameterkualitatif;
