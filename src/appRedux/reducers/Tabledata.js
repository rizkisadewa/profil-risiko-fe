import {
    GET_ALL_PARAMETER_FAKTOR_TABLE,
    GET_PARAMETER_FAKTOR,
    PUT_PARAMETER_FAKTOR
} from "../../constants/ActionTypes";

const initialTable = {
    getallparameterfaktortable: GET_ALL_PARAMETER_FAKTOR_TABLE,
    getparameterfaktor: GET_PARAMETER_FAKTOR
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
        default:
            return state;
    }
}

export default tabledata;