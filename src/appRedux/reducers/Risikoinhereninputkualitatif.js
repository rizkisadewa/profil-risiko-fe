import {
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_REQUEST,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_SUCCESS,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_FAILURE,
  RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
  RISIKO_INHEREN_ADD_INPUT_KUALITATIF,
  RISIKO_INHEREN_DELETE_INPUT_KUALITATIF,
  RISIKO_INHEREN_GET_INPUT_KUALITATIF,
  RISIKO_INHEREN_UPDATE_INPUT_KUALITATIF
} from "../../constants/ActionTypes";

const initialState = {
  countallrisikoinhereninputkualitatif: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
  loading: false,
  risikoinhereninputkualitatifdata: [],
  addrisikoinhereninputkualitatifresult: [],
  updaterisikoinhereninputkualitatifresult: [],
  oneofrisikoinhereninputkualitatifdata: [],
  deleterisikoinherenkualitatifresult: [],
  getrisikoinherenkualitatif: RISIKO_INHEREN_GET_INPUT_KUALITATIF,
  error: ''
}

const Risikoinhereninputkualitatif = (state = initialState, action) => {
  switch(action.type) {
    case RISIKO_INHEREN_COUNT_INPUT_KUALITATIF: {
      return {
        ...state,
        countallrisikoinhereninputkualitatif: action.payload
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_SUCCESS : {
      return {
        ...state,
        loading: false,
        risikoinhereninputkualitatifdata: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_FAILURE : {
      return {
        ...state,
        loading: false,
        risikoinhereninputkualitatifdata: [],
        error: action.payload
      }
    }

    case RISIKO_INHEREN_ADD_INPUT_KUALITATIF : {
      return {
        ...state,
        loading: false,
        addrisikoinhereninputkualitatifresult: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_UPDATE_INPUT_KUALITATIF : {
      return {
        ...state,
        loading: false,
        updaterisikoinhereninputkualitatifresult: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_GET_INPUT_KUALITATIF : {
      return {
        ...state,
        loading: false,
        getrisikoinherenkualitatif: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_DELETE_INPUT_KUALITATIF : {
      return {
        ...state,
        loading: false,
        deleterisikoinherenkualitatifresult: action.payload,
        error: ''
      }
    }

    default:
      return state;

  }
}

export default Risikoinhereninputkualitatif;
