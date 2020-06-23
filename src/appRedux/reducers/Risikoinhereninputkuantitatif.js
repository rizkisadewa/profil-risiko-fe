import {
  RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_REQUEST,
  RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_SUCCESS,
  RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_FAILURE,
  RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
  RISIKO_INHEREN_ADD_INPUT_KUANTITATIF,
  RISIKO_INHEREN_DELETE_INPUT_KUANTITATIF,
  RISIKO_INHEREN_GET_INPUT_KUANTITATIF,
  RISIKO_INHEREN_UPDATE_INPUT_KUANTITATIF
} from "../../constants/ActionTypes";

const initialState = {
  countallrisikoinhereninputkuantitatif: RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
  loading: false,
  risikoinhereninputkuantitatifdata: [],
  addrisikoinhereninputkuantitatifresult: [],
  updaterisikoinhereninputkuantitatifresult: [],
  oneofrisikoinhereninputkuantitatifdata: [],
  deleterisikoinhereninputkuantitatifresult: [],
  getrisikoinherenkuantitatif: RISIKO_INHEREN_GET_INPUT_KUANTITATIF,
  error: ''
};

const Risikoinhereninputkuantitatif = (state = initialState, action) => {
  switch (action.type) {
    case RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF: {
      return {
        ...state,
        countallrisikoinhereninputkuantitatif: action.payload
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_SUCCESS : {
      return {
        ...state,
        loading: false,
        risikoinhereninputkuantitatifdata: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_FAILURE: {
      return {
        ...state,
        loading: false,
        risikoinhereninputkuantitatifdata: [],
        error: action.payload
      }
    }

    case RISIKO_INHEREN_ADD_INPUT_KUANTITATIF : {
      return {
        ...state,
        loading: false,
        addrisikoinhereninputkuantitatifresult: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_UPDATE_INPUT_KUANTITATIF : {
      return {
        ...state,
        loading: false,
        updaterisikoinhereninputkuantitatifresult: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_GET_INPUT_KUANTITATIF : {
      return {
        ...state,
        loading: false,
        getrisikoinherenkuantitatif: action.payload,
        error: ''
      }
    }

    case RISIKO_INHEREN_DELETE_INPUT_KUANTITATIF : {
      return {
        ...state,
        loading: false,
        deleterisikoinhereninputkuantitatifresult: action.payload,
        error: ''
      }
    }

    default:
      return state;

  }
}

export default Risikoinhereninputkuantitatif;
