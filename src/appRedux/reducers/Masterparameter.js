import {
    JENIS_NILAI_PARAM
} from "../../constants/ActionTypes";

const initialState = {
    jenisnilaiparam: []
};

const masterparameter = (state = initialState, action) => {
    switch (action.type) {
        case JENIS_NILAI_PARAM: {
            return {
                ...state,
                jenisnilaiparam: action.payload,
            };
        }
        default:
            return state;
    }
}

export default masterparameter;
