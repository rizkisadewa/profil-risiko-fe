import {
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_REQUEST,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_SUCCESS,
  RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_FAILURE,
  RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
  RISIKO_INHEREN_ADD_INPUT_KUALITATIF_DUAL
} from "../../constants/ActionTypes";

import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllRisikoInherenInputKualitatifDualRequest = () => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_REQUEST
  }
}

export const fetchAllRisikoInherenInputKualitatifDualSuccess = risikoinhereninputkualitatifdia => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_SUCCESS,
    payload: risikoinhereninputkualitatifdia
  }
}

export const fetchAllRisikoInherenInputKualitatifDualFailure = error => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUALITATIF_DUAL_FAILURE,
    payload: error
  }
}

export const fetchAllRisikoInherenInputKualitatifDual = ({token, searchData}) => {
  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      dispatch(fetchAllRisikoInherenInputKualitatifDualRequest());
      axios.get('/api/input-data/ratio-indikator', {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          dispatch(fetchAllRisikoInherenInputKualitatifDualSuccess(responseData.data));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
            payload: responseData.data.length
          })
        } else {
          dispatch(fetchAllRisikoInherenInputKualitatifDualFailure(responseData.message));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
            payload: 0
          })
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKualitatifDualFailure(errorMsg));
      });
    }
  } else {
    return (dispatch) => {
      var searchParameters = '';

      let paramColumn = [
        "bulan",
        "tahun",
        "jenis",
        "version_id",
        "id_jenis_nilai",
        "page"
      ];

      let searchCounter = 0;

      let paramValue = [
        searchData.bulan,
        searchData.tahun,
        searchData.jenis,
        searchData.version_id,
        searchData.id_jenis_nilai,
        searchData.page
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

      axios.get(`/api/input-data/ratio-indikator?${searchParameters}`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then((response) => {
        const responseData = response.data;
        console.log("====> reseponseData : ")
        console.log(responseData);
        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          dispatch(fetchAllRisikoInherenInputKualitatifDualSuccess(responseData.data));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
            payload: responseData.data.length
          })
        } else {
          dispatch(fetchAllRisikoInherenInputKualitatifDualFailure(responseData.message));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUALITATIF_DUAL,
            payload: 0
          })
        }
      }).catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKualitatifDualFailure(errorMsg));
      });

    }
  }
}


// adding risiko inheren input kualitatif dual
export const addRisikoInherenInputKualitatifDual = (token, newRisikoInherenInputKualitatifDual) => {
  return async (dispatch) => {
    dispatch(fetchAllRisikoInherenInputKualitatifDualRequest());

    try {

      const rawResponse = await axios({
        method: "POST",
        url: '/api/input-data/ratio-indikator',
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        data: newRisikoInherenInputKualitatifDual,
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      dispatch({
        type: RISIKO_INHEREN_ADD_INPUT_KUALITATIF_DUAL,
        payload: response
      })

    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllRisikoInherenInputKualitatifDualFailure(errorMsg));
    }
  }
}

export const resetAddRisikoInherenInputKualitatifDual = () => {
  return async (dispatch) => {
    dispatch({
      type: RISIKO_INHEREN_ADD_INPUT_KUALITATIF_DUAL,
      payload: []
    })
  }
}
