import {
    GET_ALL_JENIS_PENILAIAN,
    GET_JENIS_PENILAIAN,
    PUT_JENIS_PENILAIAN,
    POST_JENIS_PENILAIAN,
    STATUS_POST_JENIS_PENILAIAN,
    DELETE_JENIS_PENILAIAN,
    STATUS_ALL_JENIS_PENILAIAN_TABLE,
    STATUS_ALL_JENIS_PENILAIAN,
    COUNT_JENIS_PENILAIAN,
    STATUS_PUT_JENIS_PENILAIAN,
} from "../../constants/ActionTypes";

const initialJenisPenilaian = {
    getalljenispenilaian: GET_ALL_JENIS_PENILAIAN,
    getjenispenilaian: GET_JENIS_PENILAIAN,
    postjenispenilaian: POST_JENIS_PENILAIAN,
    deletejenispenilaian: DELETE_JENIS_PENILAIAN,
    statuspostjenispenilaian: STATUS_POST_JENIS_PENILAIAN,
    statusalljenispenilaiantable: STATUS_ALL_JENIS_PENILAIAN_TABLE,
    statusalljenispenilaian: STATUS_ALL_JENIS_PENILAIAN,
    countjenispenilaian: COUNT_JENIS_PENILAIAN,
    statusputjenispenilaian : STATUS_PUT_JENIS_PENILAIAN,
    putjenispenilaian : PUT_JENIS_PENILAIAN
};

const jenispenilaian = (state = initialJenisPenilaian, action) => {
    switch (action.type) {
        case GET_ALL_JENIS_PENILAIAN: {
            return {
                ...state,
                getalljenispenilaian: action.payload,
            };
        }
        case GET_JENIS_PENILAIAN: {
            return {
                ...state,
                getjenispenilaian: action.payload,
            };
        }
        case PUT_JENIS_PENILAIAN: {
            return {
                ...state,
                putjenispenilaian: action.payload,
            };
        }
        case POST_JENIS_PENILAIAN: {
            return {
                ...state,
                postjenispenilaian: action.payload,
            };
        }
        case STATUS_POST_JENIS_PENILAIAN: {
            return {
                ...state,
                statuspostjenispenilaian: action.payload,
            };
        }
        case STATUS_PUT_JENIS_PENILAIAN: {
            return {
                ...state,
                statusputjenispenilaian: action.payload,
            };
        }
        case DELETE_JENIS_PENILAIAN: {
            return {
                ...state,
                deletejenispenilaian: action.payload,
            };
        }
        case STATUS_ALL_JENIS_PENILAIAN_TABLE: {
            return {
                ...state,
                statusalljenispenilaiantable: action.payload,
            };
        }
        case STATUS_ALL_JENIS_PENILAIAN: {
            return {
                ...state,
                statusalljenispenilaian: action.payload,
            };
        }
        case COUNT_JENIS_PENILAIAN: {
            return {
                ...state,
                countjenispenilaian: action.payload,
            };
        }
        default:
            return state;
    }
}

export default jenispenilaian;