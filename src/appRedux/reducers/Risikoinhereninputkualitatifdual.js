import {
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_REQUEST,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_SUCCESS,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_FAILURE,
  RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
  RISIKO_INHEREN_ADD_INPUT_KUALITATIF_DUAL,
  RISIKO_INHEREN_DELETE_INPUT_KUALITATIF_DUAL,
  RISIKO_INHEREN_GET_INPUT_KUALITATIF_DUAL,
  RISIKO_INHEREN_UPDATE_INPUT_KUALITATIF_DUAL
} from "../../constants/ActionTypes";

const initialState = {
  countallrisikoinhereninputkualitatifdual: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
  loading: false,
  risikoinhereninputkualitatifdualdata: [],
  addrisikoinhereninputkualitatifdualresult: [],
  updaterisikoinhereninputkualitatifdualresult: [],
  oneofrisikoinhereninputkualitatifdualdata: [],
  deleterisikoinherenkualitatifdualresult: [],
  getrisikoinherenkualitatifdual: RISIKO_INHEREN_GET_INPUT_KUALITATIF_DUAL,
  error: ''
}

const Risikoinhereninputkualitatifdual = (state = initialState, action) => {
  switch (action.type){
    case RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL: {
      return {
        ...state,
        countallrisikoinhereninputkualitatifdual: action.payload
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_SUCCESS : {
      return {
        ...state,
        loading: false,
        risikoinhereninputkualitatifdualdata: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_FAILURE : {
      return {
        ...state,
        loading: false,
        risikoinhereninputkualitatifdualdata: [],
        error: action.payload
      }
    }



    case RISIKO_INHEREN_ADD_INPUT_KUALITATIF_DUAL : {
      return {
        ...state,
        loading: false,
        addrisikoinhereninputkualitatifdualresult: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_UPDATE_INPUT_KUALITATIF_DUAL : {
      return {
        ...state,
        loading: false,
        updaterisikoinhereninputkualitatifdualresult: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_GET_INPUT_KUALITATIF_DUAL : {
      return {
        ...state,
        loading: false,
        getrisikoinherenkualitatifdual: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_DELETE_INPUT_KUALITATIF_DUAL : {
      return {
        ...state,
        loading: false,
        deleterisikoinherenkualitatifdualresult: action.payload,
        error: ''
      }
    }

    default:
      return state;


  }
}

export default Risikoinhereninputkualitatifdual;
