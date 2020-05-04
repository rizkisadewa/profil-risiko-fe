import {
    GET_ALL_PERINGKAT_RISIKO,
    GET_PERINGKAT_RISIKO,
    PUT_PERINGKAT_RISIKO,
    POST_PERINGKAT_RISIKO,
    STATUS_POST_PERINGKAT_RISIKO,
    DELETE_PERINGKAT_RISIKO,
    STATUS_ALL_PERINGKAT_RISIKO_TABLE,
    STATUS_ALL_PERINGKAT_RISIKO,
    COUNT_PERINGKAT_RISIKO,
    STATUS_PUT_PERINGKAT_RISIKO,
} from "../../constants/ActionTypes";

const initialPeringkatRisiko = {
    getallperingkatrisiko: GET_ALL_PERINGKAT_RISIKO,
    getperingkatrisiko: GET_PERINGKAT_RISIKO,
    postperingkatrisiko: POST_PERINGKAT_RISIKO,
    deleteperingkatrisiko: DELETE_PERINGKAT_RISIKO,
    statuspostperingkatrisiko: STATUS_POST_PERINGKAT_RISIKO,
    statusallperingkatrisikotable: STATUS_ALL_PERINGKAT_RISIKO_TABLE,
    statusallperingkatrisiko: STATUS_ALL_PERINGKAT_RISIKO,
    countperingkatrisiko: COUNT_PERINGKAT_RISIKO,
    statusputperingkatrisiko : STATUS_PUT_PERINGKAT_RISIKO,
    putperingkatrisiko : PUT_PERINGKAT_RISIKO
};

const peringkatrisiko = (state = initialPeringkatRisiko, action) => {
    switch (action.type) {
        case GET_ALL_PERINGKAT_RISIKO: {
            return {
                ...state,
                getallperingkatrisiko: action.payload,
            };
        }
        case GET_PERINGKAT_RISIKO: {
            return {
                ...state,
                getperingkatrisiko: action.payload,
            };
        }
        case PUT_PERINGKAT_RISIKO: {
            return {
                ...state,
                putperingkatrisiko: action.payload,
            };
        }
        case POST_PERINGKAT_RISIKO: {
            return {
                ...state,
                postperingkatrisiko: action.payload,
            };
        }
        case STATUS_POST_PERINGKAT_RISIKO: {
            return {
                ...state,
                statuspostperingkatrisiko: action.payload,
            };
        }
        case STATUS_PUT_PERINGKAT_RISIKO: {
            return {
                ...state,
                statusputperingkatrisiko: action.payload,
            };
        }
        case DELETE_PERINGKAT_RISIKO: {
            return {
                ...state,
                deleteperingkatrisiko: action.payload,
            };
        }
        case STATUS_ALL_PERINGKAT_RISIKO_TABLE: {
            return {
                ...state,
                statusallperingkatrisikotable: action.payload,
            };
        }
        case STATUS_ALL_PERINGKAT_RISIKO: {
            return {
                ...state,
                statusallperingkatrisiko: action.payload,
            };
        }
        case COUNT_PERINGKAT_RISIKO: {
            return {
                ...state,
                countperingkatrisiko: action.payload,
            };
        }
        default:
            return state;
    }
}

export default peringkatrisiko;