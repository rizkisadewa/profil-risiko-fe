import {
  FETCH_ALL_RATIO_INDIKATOR_FORMULA_REQUEST,
  FETCH_ALL_RATIO_INDIKATOR_FORMULA_SUCCESS,
  FETCH_ALL_RATIO_INDIKATOR_FORMULA_FAILURE,
  COUNT_RATIO_INDIKATOR_FORMULA,
  ADD_RATIO_INDIKATOR_FORMULA,
  DELETE_RATIO_INDIKATOR_FORMULA,
  GET_RATIO_INDIKATOR_FORMULA,
  UPDATE_RATIO_INDIKATOR_FORMULA
} from "../../constants/ActionTypes";

const initialState = {
  countallratioindikatorformula: COUNT_RATIO_INDIKATOR_FORMULA,
  loading: false,
  ratioindikatorformuladata: [],
  addratioindikatorformularesult: [],
  updateratioindikatorformularesult: [],
  oneofratioindikatorformuladata: [],
  deleteratioindikatorformuladresult: [],
  getratioindikatorformula: GET_RATIO_INDIKATOR_FORMULA
}

const Ratioindikatorformula = (state = initialState, action) => {
  switch (action.type){
    case COUNT_RATIO_INDIKATOR_FORMULA: {
      return {
        ...state,
        countallratioindikatorformula: action.payload
      }
    }

    case FETCH_ALL_RATIO_INDIKATOR_FORMULA_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_ALL_RATIO_INDIKATOR_FORMULA_SUCCESS: {
      return {
        ...state,
        loading: false,
        ratioindikatorformuladata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_RATIO_INDIKATOR_FORMULA_FAILURE : {
      return {
        ...state,
        loading: false,
        ratioindikatorformuladata: [],
        error: ''
      }
    }

    case ADD_RATIO_INDIKATOR_FORMULA : {
      return {
        ...state,
        loading: false,
        addratioindikatorformularesult: action.payload,
        error: ''
      }
    }

    case DELETE_RATIO_INDIKATOR_FORMULA : {
      return {
        ...state,
        loading: false,
        deleteratioindikatorformuladresult: action.payload,
        error: ''
      }
    }

    case UPDATE_RATIO_INDIKATOR_FORMULA: {
      return {
        ...state,
        loading: false,
        updateratioindikatorformularesult: action.payload,
        error: ''
      }
    }

    default:
      return state

  }
}

export default Ratioindikatorformula;
