import {
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_REQUEST,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_SUCCESS,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_FAILURE,
  RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
  RISIKO_INHEREN_ADD_INPUT_KUALITATIF
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllRisikoInherenInputKualitatifRequest = () => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_REQUEST
  }
}

export const fetchAllRisikoInherenInputKualitatifSuccess = risikoinhereninputkualitatif => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_SUCCESS,
    payload: risikoinhereninputkualitatif
  }
}

export const fetchAllRisikoInherenInputKualitatifFailure = error => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_FAILURE,
    payload: error
  }
}

export const fetchAllRisikoInherenInputKualitatif = ({token, page, searchData}) => {
  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      dispatch(fetchAllRisikoInherenInputKualitatifRequest());
      axios.get(`/api/input-data/ratio-indikator/kualitatif?page${page}`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          dispatch(fetchAllRisikoInherenInputKualitatifSuccess(responseData.data));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
            paylod: responseData.data.length
          });
        } else {
          dispatch(fetchAllRisikoInherenInputKualitatifFailure(responseData.message));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
            paylod: 0
          });
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKualitatifFailure(errorMsg));
      });
    }
  } else {
    return (dispatch) => {
      dispatch(fetchAllRisikoInherenInputKualitatifRequest());

      var searchParameters = '';

      let paramColumn = [
        "bulan",
        "tahun",
        "jenis",
        "version_id",
        "jenis_nilai_id",
        "risk_id"
      ];

      let searchCounter = 1;

      let paramValue = [
        searchData.bulan,
        searchData.tahun,
        searchData.jenis,
        searchData.version_id,
        searchData.jenis_nilai_id,
        searchData.risk_id
      ];

      // looping all column
      for(let i=0;i<paramColumn.length;i++){
        // process only for not undefined
        console.log("Param Column ke-"+i);
        console.log(" Tipe : "+typeof paramColumn[i]+", Value : "+paramColumn[i]);
        // process only for not undefined
        console.log("Param Value ke-"+i);
        console.log(" Tipe : "+typeof paramValue[i]+", Value : "+paramValue[i]);
        if(typeof paramValue[i] !== 'undefined'){
          // conditon for number greater than 0
          if(paramValue[i] !== ""){
            searchCounter += 1;

            if(searchCounter > 1) {
              searchParameters += '&';
            }
            searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

          }
        }
      }

      axios.get(`/api/input-data/ratio-indikator/kualitatif?page=${page}${searchParameters}`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          dispatch(fetchAllRisikoInherenInputKualitatifSuccess(responseData.data));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
            paylod: responseData.data.length
          });
        } else {
          dispatch(fetchAllRisikoInherenInputKualitatifFailure(responseData.message));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF,
            paylod: 0
          });
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKualitatifFailure(errorMsg));
      });


    }
  }
}

// adding risiko inheren input kualitatif
export const addRisikoInherenInputKualitatif = (token, newRisikoInherenInputKualitatif) => {
  return async (dispatch) => {
    dispatch(fetchAllRisikoInherenInputKualitatifRequest());

    try {

      const rawResponse = await axios({
        method: "POST",
        url: '/api/input-data/ratio-indikator/kualitatif',
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        data: newRisikoInherenInputKualitatif,
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      dispatch({
        type: RISIKO_INHEREN_ADD_INPUT_KUALITATIF,
        payload: response
      })

    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllRisikoInherenInputKualitatifFailure(errorMsg));
    }
  }
}

export const resetAddRisikoInherenInputKualitatif = () => {
  return (dispatch) => {
    dispatch({
      type: RISIKO_INHEREN_ADD_INPUT_KUALITATIF,
      payload: []
    })
  }
}
