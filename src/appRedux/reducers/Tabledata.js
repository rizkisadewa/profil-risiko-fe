import {
    GET_ALL_PARAMETER_FAKTOR_TABLE,
    GET_PARAMETER_FAKTOR,
    PUT_PARAMETER_FAKTOR,
    POST_PARAMETER_FAKTOR,
    STATUS_POST_PARAMETER_FAKTOR,
    DELETE_PARAMETER_FAKTOR,
    GET_ALL_RISKS,
    POST_ALL_RISKS,
    PUT_ALL_RISKS,
    DELETE_ALL_RISKS,
    JENIS_NILAI_PARAM
} from "../../constants/ActionTypes";

const initialTable = {
    getallparameterfaktortable: GET_ALL_PARAMETER_FAKTOR_TABLE,
    getparameterfaktor: GET_PARAMETER_FAKTOR,
    postparameterfaktor: POST_PARAMETER_FAKTOR,
    deleteparameterfaktor: POST_PARAMETER_FAKTOR,
    statuspostparameterfaktor: STATUS_POST_PARAMETER_FAKTOR,
    getallrisks: GET_ALL_RISKS,
    putallrisks: PUT_ALL_RISKS,
    postallrisks: POST_ALL_RISKS,
    deleteallrisks: DELETE_ALL_RISKS,
    jenisnilaiparam: JENIS_NILAI_PARAM
};

const tabledata = (state = initialTable, action) => {
    switch (action.type) {
        case GET_ALL_PARAMETER_FAKTOR_TABLE: {
            return {
                ...state,
                getallparameterfaktortable: action.payload,
            };
        }
        case GET_PARAMETER_FAKTOR: {
            return {
                ...state,
                getparameterfaktor: action.payload,
            };
        }
        case PUT_PARAMETER_FAKTOR: {
            return {
                ...state,
                putparameterfaktor: action.payload,
            };
        }
        case POST_PARAMETER_FAKTOR: {
            return {
                ...state,
                postparameterfaktor: action.payload,
            };
        }
        case STATUS_POST_PARAMETER_FAKTOR: {
            return {
                ...state,
                statuspostparameterfaktor: action.payload,
            };
        }
        case JENIS_NILAI_PARAM: {
            return {
                ...state,
                jenisnilaiparam: action.payload,
            };
        }
        case DELETE_PARAMETER_FAKTOR: {
            return {
                ...state,
                deleteparameterfaktor: action.payload,
            };
        }
        case GET_ALL_RISKS: {
            return {
                ...state,
                getallrisks: action.payload,
            };
        }
        case POST_ALL_RISKS: {
            return {
                ...state,
                postallrisks: action.payload,
            };
        }
        case PUT_ALL_RISKS: {
            return {
                ...state,
                putallrisks: action.payload,
            };
        }
        case DELETE_ALL_RISKS: {
            return {
                ...state,
                deleteallrisks: action.payload,
            };
        }
        default:
            return state;
    }
}

export default tabledata;