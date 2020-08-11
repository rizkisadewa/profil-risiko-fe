import {
  EXCEL_EXPORT_REQUEST,
  EXCEL_EXPORT_SUCCESS,
  EXCEL_EXPORT_FAILURE,
  EXCEL_IMPORT_DATA_KUANTITATIF_PR_REQUEST,
  EXCEL_IMPORT_DATA_KUANTITATIF_PR_SUCCESS,
  EXCEL_IMPORT_DATA_KUANTITATIF_PR_FAILURE
} from "../../constants/ActionTypes";

const initialState = {
  loading: false,
  error: '',
  exportexceldata: [],
  importdatakuantitatifpr: []
};

const ExportExcel = (state = initialState, action) => {
  switch (action.type){
    case EXCEL_EXPORT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case EXCEL_EXPORT_SUCCESS: {
      return {
        ...state,
        loading: false,
        exportexceldata: action.payload,
        error: ''
      }
    }

    case EXCEL_EXPORT_FAILURE: {
      return {
        ...state,
        loading: false,
        exportexceldata: [],
        error: action.payload
      }
    }

    case EXCEL_IMPORT_DATA_KUANTITATIF_PR_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }

    case EXCEL_IMPORT_DATA_KUANTITATIF_PR_SUCCESS: {
      return {
        ...state,
        loading: false,
        importdatakuantitatifpr: action.payload,
        error: ''
      }
    }

    case EXCEL_IMPORT_DATA_KUANTITATIF_PR_FAILURE: {
      return {
        ...state,
        loading: false,
        importdatakuantitatifpr: [],
        error: action.payload
      }
    }

    default:
      return state

  }
}

export default ExportExcel;
