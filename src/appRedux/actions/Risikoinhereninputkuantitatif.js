import {
  RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_REQUEST,
  RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_SUCCESS,
  RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_FAILURE,
  RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
  RISIKO_INHEREN_ADD_INPUT_KUANTITATIF,
  RISIKO_INHEREN_DELETE_INPUT_KUANTITATIF
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllRisikoInherenInputKuantitatifRequest = () => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_REQUEST
  }
}

export const fetchAllRisikoInherenInputKuantitatifSuccess = risikoinhereninputkuantitatif => {
  return {
    type : RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_SUCCESS,
    payload: risikoinhereninputkuantitatif
  }
}

export const fetchAllRisikoInherenInputKuantitatifFailure = error => {
  return {
    type: RISIKO_INHEREN_FETCH_INPUT_KUANTITATIF_FAILURE,
    payload: error
  }
}

export const fetchAllRisikoInherenInputKuantitatif = ({token, searchData}) => {
  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      dispatch(fetchAllRisikoInherenInputKuantitatifRequest());
      axios.get(`/api/input-data/ratio-indikator`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201) {
          dispatch(fetchAllRisikoInherenInputKuantitatifSuccess(responseData.data));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
            payload: responseData.data.length
          })
        } else {
          dispatch(fetchAllRisikoInherenInputKuantitatifFailure(responseData.message));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
            payload: 0
          })
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKuantitatifFailure(errorMsg));
      });
    }
  } else {
    return (dispatch) => {
      dispatch(fetchAllRisikoInherenInputKuantitatifRequest());

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


      // get total
      axios.get(`/api/input-data/ratio-indikator?${searchParameters}`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201) {
          dispatch(fetchAllRisikoInherenInputKuantitatifSuccess(responseData.data));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
            payload: responseData.data.length
          })
        } else {
          dispatch(fetchAllRisikoInherenInputKuantitatifFailure(responseData.message));
          dispatch({
            type: RISIKO_INHEREN_COUNT_INPUT_KUANTITATIF,
            payload: 0
          })
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKuantitatifFailure(errorMsg));
      });
    }
  }
}

// adding risiko inheren input kuantitatif
export const addRisikoInherenInputKuantitatif = (token, newRisikoInherenInputKuantitatif) => {
  return async (dispatch) => {
    dispatch(fetchAllRisikoInherenInputKuantitatifRequest());

    try {

      const rawResponse = await axios({
        method: "POST",
        url : '/api/input-data/ratio-indikator/bulk',
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        data: newRisikoInherenInputKuantitatif,
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      dispatch({
        type: RISIKO_INHEREN_ADD_INPUT_KUANTITATIF,
        payload: response
      });

    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllRisikoInherenInputKuantitatifFailure(errorMsg));
    }
  }
}

export const resetAddRisikoInherenInputKuantitatif = () => {
  return (dispatch) => {
    dispatch({
      type: RISIKO_INHEREN_ADD_INPUT_KUANTITATIF,
      payload: []
    })
  }
}

// delete risiko inheren input data kuantitatif
export const deleteRisikoInherenInputKuantitatif = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchAllRisikoInherenInputKuantitatifRequest());

    try {
      await axios({
        method: "DELETE",
        url: '/api/input-data/ratio-indikator/'+id,
        baseURL: backendUrl,
        headers : {
          Authorization: `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }).then((response) => {
        const responseData = response.data;
        dispatch({
          type: RISIKO_INHEREN_DELETE_INPUT_KUANTITATIF,
          payload: responseData
        });
      }).catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAllRisikoInherenInputKuantitatifFailure(errorMsg));
      })
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllRisikoInherenInputKuantitatifFailure(errorMsg));
    }
  }
}

export const resetDeleteRisikoInherenInputKuantitatif = () => {
  return (dispatch) => {
    dispatch({
      type: RISIKO_INHEREN_DELETE_INPUT_KUANTITATIF,
      payload: []
    })
  }
}
