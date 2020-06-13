import {
  GET_ALL_RISIKO_INHEREN_RATIO_INDIKATOR,
  GET_RISIKO_INHEREN_RATIO_INDIKATOR,
  PUT_RISIKO_INHEREN_RATIO_INDIKATOR,
  POST_RISIKO_INHEREN_RATIO_INDIKATOR,
  STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR,
  DELETE_RISIKO_INHEREN_RATIO_INDIKATOR,
  STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR_TABLE,
  STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR,
  COUNT_RISIKO_INHEREN_RATIO_INDIKATOR,
  STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR
} from "../../constants/ActionTypes";

const initialRisikoInherenRatioIndikator = {
    getallrisikoinherenratioindikator: GET_ALL_RISIKO_INHEREN_RATIO_INDIKATOR,
    getrisikoinherenratioindikator: GET_RISIKO_INHEREN_RATIO_INDIKATOR,
    postrisikoinherenratioindikator: POST_RISIKO_INHEREN_RATIO_INDIKATOR,
    deleterisikoinherenratioindikator: DELETE_RISIKO_INHEREN_RATIO_INDIKATOR,
    statuspostrisikoinherenratioindikator: STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR,
    statusallrisikoinherenratioindikatortable: STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR_TABLE,
    statusallrisikoinherenratioindikator: STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR,
    countrisikoinherenratioindikator: COUNT_RISIKO_INHEREN_RATIO_INDIKATOR,
    statusputrisikoinherenratioindikator : STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR,
    putrisikoinherenratioindikator : PUT_RISIKO_INHEREN_RATIO_INDIKATOR
};

const risikoinherenratioindikator = (state = initialRisikoInherenRatioIndikator, action) => {
    switch (action.type) {
        case GET_ALL_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                getallrisikoinherenratioindikator: action.payload,
            };
        }
        case GET_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                getrisikoinherenratioindikator: action.payload,
            };
        }
        case PUT_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                putrisikoinherenratioindikator: action.payload,
            };
        }
        case POST_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                postrisikoinherenratioindikator: action.payload,
            };
        }
        case STATUS_POST_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                statuspostrisikoinherenratioindikator: action.payload,
            };
        }
        case STATUS_PUT_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                statusputrisikoinherenratioindikator: action.payload,
            };
        }
        case DELETE_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                deleterisikoinherenratioindikator: action.payload,
            };
        }
        case STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR_TABLE: {
            return {
                ...state,
                statusallrisikoinherenratioindikatortable: action.payload,
            };
        }
        case STATUS_ALL_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                statusallrisikoinherenratioindikator: action.payload,
            };
        }
        case COUNT_RISIKO_INHEREN_RATIO_INDIKATOR: {
            return {
                ...state,
                countrisikoinherenratioindikator: action.payload,
            };
        }
        default:
            return state;
    }
}

export default risikoinherenratioindikator;
