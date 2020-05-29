import {
    STATUS_POST_PARAMETER_MANUAL,
    POST_PARAMETER_MANUAL,
    STATUS_ALL_PARAMETER_MANUAL_TABLE,
    COUNT_PARAMETER_MANUAL,
    STATUS_ALL_PARAMETER_MANUAL,
    GET_ALL_PARAMETER_MANUAL,
    PUT_PARAMETER_MANUAL,
    STATUS_PUT_PARAMETER_MANUAL,
    GET_PARAMETER_MANUAL,
    DELETE_PARAMETER_MANUAL
} from "../../constants/ActionTypes";

const initialTable = {
    getallparametermanualtable: GET_ALL_PARAMETER_MANUAL,
    postparametermanual: POST_PARAMETER_MANUAL,
    statuspostparametermanual: STATUS_POST_PARAMETER_MANUAL,
    statusallparametermanualtable: STATUS_ALL_PARAMETER_MANUAL_TABLE,
    statusallparametermanual: STATUS_ALL_PARAMETER_MANUAL,
    countallparametermanual: COUNT_PARAMETER_MANUAL,
    statusputparametermanual: STATUS_PUT_PARAMETER_MANUAL,
    getparametermanual: GET_PARAMETER_MANUAL,
    putparametermanual: PUT_PARAMETER_MANUAL,
    deleteparametermanual: DELETE_PARAMETER_MANUAL
};

const parametermanual = (state = initialTable, action) => {
    switch (action.type) {
        case GET_ALL_PARAMETER_MANUAL: {
            return {
                ...state,
                getallparametermanualtable: action.payload,
            };
        }
        case POST_PARAMETER_MANUAL: {
            return {
                ...state,
                postparametermanual: action.payload,
            };
        }
        case STATUS_POST_PARAMETER_MANUAL: {
            return {
                ...state,
                statuspostparametermanual: action.payload,
            };
        }
        case STATUS_ALL_PARAMETER_MANUAL_TABLE: {
            return {
                ...state,
                statusallparametermanualtable: action.payload,
            };
        }
        case STATUS_ALL_PARAMETER_MANUAL: {
            return {
                ...state,
                statusallparametermanual: action.payload,
            };
        }
        case COUNT_PARAMETER_MANUAL: {
            return {
                ...state,
                countallparametermanual: action.payload,
            };
        }
        case PUT_PARAMETER_MANUAL: {
          return {
            ...state,
            putparametermanual: action.payload,
          }
        }
        case STATUS_PUT_PARAMETER_MANUAL: {
          return {
            ...state,
            statusputparametermanual: action.payload,
          }
        }
        case GET_PARAMETER_MANUAL: {
          return {
            ...state,
            getparametermanual: action.payload
          }
        }
        case DELETE_PARAMETER_MANUAL: {
          return {
            ...state,
            deleteparametermanual: action.payload
          }
        }
        default:
            return state;
    }
}

export default parametermanual;
