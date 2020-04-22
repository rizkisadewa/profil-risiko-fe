import {
    JENIS_NILAI_PARAM
} from "../../constants/ActionTypes";

const initialJenisParam = {
    jenisnilaiparam: JENIS_NILAI_PARAM
};

const masterparameter = (state = initialJenisParam, action) => {
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