import {
  UPDATE_MASTER_VERSION,
  ADD_MASTER_VERSION,
  DELETE_MASTER_VERSION,
  COUNT_MASTER_VERSION,
  FETCH_ALL_MASTER_VERSION_REQUEST,
  FETCH_ALL_MASTER_VERSION_SUCCESS,
  FETCH_ALL_MASTER_VERSION_FAILURE,
  GET_MASTER_VERSION
} from "../../constants/ActionTypes";


const initialState = {
  countallmasterversion : COUNT_MASTER_VERSION,
  loading: false,
  masterversionsdata: [],
  addmaterversionresult: [],
  updatemasterversionresult: [],
  oneofmasterversiondata: [],
  deletemasterversionresult: [],
  getmasterversion: GET_MASTER_VERSION,
  error: ''
}

const Masterversion = (state = initialState, action) => {
  switch (action.type) {
    case COUNT_MASTER_VERSION: {
      return {
        ...state,
        countallmasterversion: action.payload
      }
    }
    case FETCH_ALL_MASTER_VERSION_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case FETCH_ALL_MASTER_VERSION_SUCCESS: {
      return {
        ...state,
        loading: false,
        masterversionsdata: action.payload,
        error: ''
      }
    }

    case FETCH_ALL_MASTER_VERSION_FAILURE: {
      return {
        ...state,
        loading: false,
        masterversionsdata: [],
        error: action.payload
      }
    }

    case ADD_MASTER_VERSION : {
      return {
        ...state,
        loading: false,
        addmaterversionresult: action.payload,
        error: ''
      }
    }

    case UPDATE_MASTER_VERSION : {
      return {
        ...state,
        loading: false,
        updatemasterversionresult: action.payload,
        error: ''
      }
    }

    case DELETE_MASTER_VERSION : {
      return {
        ...state,
        loading: false,
        deletemasterversionresult: action.payload,
        error: ''
      }
    }

    default:
      return state;

  }
}

export default Masterversion;
