import {
    GET_ALL_RISKS,
    POST_ALL_RISKS,
    PUT_ALL_RISKS,
    DELETE_ALL_RISKS,
    STATUS_ALL_RISKS,
    STATUS_POST_RISK,
    STATUS_PUT_RISK,
    GET_RISK,
    COUNT_ALL_RISKS,
    STATUS_ALL_RISK
} from "../../constants/ActionTypes";

const initialJenisRisiko = {
    getallrisks: GET_ALL_RISKS,
    putallrisks: PUT_ALL_RISKS,
    postallrisks: POST_ALL_RISKS,
    deleteallrisks: DELETE_ALL_RISKS,
    statusallrisks: STATUS_ALL_RISKS,
    statuspostrisk: STATUS_POST_RISK,
    statusputrisk: STATUS_PUT_RISK,
    getrisk: GET_RISK,
    countallrisks: COUNT_ALL_RISKS,
    statusallrisk: STATUS_ALL_RISK,
};

const jenisrisiko = (state = initialJenisRisiko, action) => {
    switch (action.type) {
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
        case STATUS_ALL_RISKS: {
            return {
                ...state,
                statusallrisks: action.payload,
            };
        }
        case STATUS_PUT_RISK: {
            return {
                ...state,
                statusputrisk: action.payload,
            };
        }
        case STATUS_POST_RISK: {
            return {
                ...state,
                statuspostrisk: action.payload,
            };
        }
        case GET_RISK: {
            return {
                ...state,
                getrisk: action.payload,
            };
        }
        case COUNT_ALL_RISKS: {
            return {
                ...state,
                countallrisks: action.payload,
            };
        }
        case STATUS_ALL_RISK: {
            return {
                ...state,
                statusallrisk: action.payload,
            };
        }
        default:
            return state;
    }
}

export default jenisrisiko;