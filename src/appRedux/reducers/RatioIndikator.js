import {
    GET_ALL_RATIO_INDIKATOR,
    GET_RATIO_INDIKATOR,
    PUT_RATIO_INDIKATOR,
    POST_RATIO_INDIKATOR,
    STATUS_POST_RATIO_INDIKATOR,
    DELETE_RATIO_INDIKATOR,
    STATUS_ALL_RATIO_INDIKATOR_TABLE,
    STATUS_ALL_RATIO_INDIKATOR,
    COUNT_RATIO_INDIKATOR,
    STATUS_PUT_RATIO_INDIKATOR,
    GET_ALL_RATIO_INDIKATOR_TABLE
} from "../../constants/ActionTypes";

const initialRatioIndikator = {
    getallratioindikator: GET_ALL_RATIO_INDIKATOR,
    getallratioindikatortable: GET_ALL_RATIO_INDIKATOR_TABLE,
    getratioindikator: GET_RATIO_INDIKATOR,
    postratioindikator: POST_RATIO_INDIKATOR,
    deleteratioindikator: DELETE_RATIO_INDIKATOR,
    statuspostratioindikator: STATUS_POST_RATIO_INDIKATOR,
    statusallratioindikatortable: STATUS_ALL_RATIO_INDIKATOR_TABLE,
    statusallratioindikator: STATUS_ALL_RATIO_INDIKATOR,
    countratioindikator: COUNT_RATIO_INDIKATOR,
    statusputratioindikator : STATUS_PUT_RATIO_INDIKATOR,
    putratioindikator : PUT_RATIO_INDIKATOR
};

const ratioindikator = (state = initialRatioIndikator, action) => {
    switch (action.type) {
        case GET_ALL_RATIO_INDIKATOR: {
            return {
                ...state,
                getallratioindikator: action.payload,
            };
        }

        case GET_ALL_RATIO_INDIKATOR_TABLE: {
            return {
                ...state,
                getallratioindikatortable: action.payload,
            };
        }
        case GET_RATIO_INDIKATOR: {
            return {
                ...state,
                getratioindikator: action.payload,
            };
        }
        case PUT_RATIO_INDIKATOR: {
            return {
                ...state,
                putratioindikator: action.payload,
            };
        }
        case POST_RATIO_INDIKATOR: {
            return {
                ...state,
                postratioindikator: action.payload,
            };
        }
        case STATUS_POST_RATIO_INDIKATOR: {
            return {
                ...state,
                statuspostratioindikator: action.payload,
            };
        }
        case STATUS_PUT_RATIO_INDIKATOR: {
            return {
                ...state,
                statusputratioindikator: action.payload,
            };
        }
        case DELETE_RATIO_INDIKATOR: {
            return {
                ...state,
                deleteratioindikator: action.payload,
            };
        }
        case STATUS_ALL_RATIO_INDIKATOR_TABLE: {
            return {
                ...state,
                statusallratioindikatortable: action.payload,
            };
        }
        case STATUS_ALL_RATIO_INDIKATOR: {
            return {
                ...state,
                statusallratioindikator: action.payload,
            };
        }
        case COUNT_RATIO_INDIKATOR: {
            return {
                ...state,
                countratioindikator: action.payload,
            };
        }
        default:
            return state;
    }
}

export default ratioindikator;