import {
  UPDATE_PARAMETER_KUALITATIF,
  ADD_PARAMETER_KUALITATIF,
  DELETE_PARAMETER_KUALITATIF,
  COUNT_PARAMETER_KUALITATIF,
  FETCH_ALL_PARAMETER_KUALITATIF_REQUEST,
  FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS,
  FETCH_ALL_PARAMETER_KUALITATIF_FAILURE
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllParameterKualitatifRequest = () => {
  return {
    type: FETCH_ALL_PARAMETER_KUALITATIF_REQUEST
  }
}

export const fetchAllParameterKualitatifSuccess = parameterkualitatif => {
  return {
    type: FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS,
    payload: parameterkualitatif
  }
}

export const fetchAllParameterKualitatifFailure = error => {
  return {
    type: FETCH_ALL_PARAMETER_KUALITATIF_FAILURE,
    paylod: error
  }
}

// fetch all
export const fetchAllParameterKualitatif = ({token, page, searchData}) => {
  if(typeof searchData === 'undefined'){
    // if do not have any saerching data
    return (async (dispatch) => {
      dispatch(fetchAllParameterKualitatifRequest());
      try {
        // axios using validate status < 500
        await axios({
          method: "GET",
          url: `api/parameter-kualitatif?page=${page}`,
          baseURL: backendUrl,
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }).then((response) => {
          // if success then execute to payload
          const responseData = response.data;
          if(response.data.statusCode === 200 || response.data.statusCode === 201){
            dispatch(fetchAllParameterKualitatifSuccess(responseData.data.rows));
          } else {
            dispatch(fetchAllParameterKualitatifFailure(responseData.message));
          }

        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllParameterKualitatifFailure(errorMsg));
        });
      } catch (error){
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifFailure(errorMsg));
      }
    });
  } else {
    // if do have any searching data
    return(async (dispatch) => {
      dispatch(fetchAllParameterKualitatifRequest());

      try {

        var parameters = '';
        var searchParameters = '';

        let paramColumn = [
          "risk_id", "name", "penomoran", "urutan_sub", "level", "induk_id", "bobot", "jenis_nilai_id", "ratio_manual", "pr_low_name", "pr_lowtomod_name",
          "pr_mod", "pr_modtohigh", "pr_high", "version", "bulan", "tahun", "id_indikator_penyebut", "id_indikator_pembilang"
        ];

        let searchCounter = 0;

        let paramValue = [
          searchData.risk_id, searchData.name, searchData.penomoran, searchData.urutan_sub,
          searchData.level, searchData.induk_id, searchData.bobot, searchData.jenis_nilai_id,
          searchData.ratio_manual, searchData.pr_low_name, searchData.pr_lowtomod_name,
          searchData.pr_mod, searchData.pr_modtohigh, searchData.pr_high, searchData.version,
          searchData.bulan, searchData.tahun, searchData.id_indikator_penyebut,
          searchData.id_indikator_pembilang
        ];

        console.log("Param Value : ");
        console.log(paramValue);
        console.log(searchData);

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
              parameters += `&${paramColumn[i]}=${paramValue[i]}`;

              if(searchCounter > 1) {
                searchParameters += '&';
              }
              searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

            }
          }
        }

        // get total
        await axios({
          method: "GET",
          url: `api/parameter-kualitatif?${searchParameters}`,
          baseURL: backendUrl,
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }).then((response) => {
          // if success then execute to payload
          const count = response.data.data.rows;
          if(response.data.statusCode === 200 || response.data.statusCode === 201){
            dispatch({type: COUNT_PARAMETER_KUALITATIF, payload: count.length});
          } else {
            dispatch({type: COUNT_PARAMETER_KUALITATIF, payload: 0});
          }

        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllParameterKualitatifFailure(errorMsg));
        });

        // get data per page
        await axios({
          method: "GET",
          url: `api/parameter-kualitatif?page=${page}${parameters}`,
          baseURL: backendUrl,
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }).then((response) => {
          // if success then execute to payload
          const responseData = response.data;
          if(response.data.statusCode === 200 || response.data.statusCode === 201){
            dispatch(fetchAllParameterKualitatifSuccess(responseData.data.rows));
          } else {
            dispatch(fetchAllParameterKualitatifFailure(responseData.message));
          }

        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllParameterKualitatifFailure(errorMsg));
        });

      } catch (error) {
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifFailure(errorMsg));
      }
    })
  }
}

export const countAllParameterKualitatif = (token) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifRequest());

    try {
      // axios using validate status < 500
      await axios({
        method: "GET",
        url: 'api/parameter-kualitatif',
        baseURL: backendUrl,
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }).then((response) => {
        // if success then execute to payload

        console.log("*****RESPONSE FROM COUNT ALL****");
        console.log(response.data.data.rows.length);
        console.log(response.data);
        if(response.data.statusCode === 200 || response.data.statusCode === 201){
          const responseData = response.data.data.rows;
          dispatch({
            type: COUNT_PARAMETER_KUALITATIF,
            payload: responseData.length
          });
        } else {
          dispatch({
            type: COUNT_PARAMETER_KUALITATIF,
            payload: 0
          });
        }
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifFailure(errorMsg));
      });
    } catch (error){
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifFailure(errorMsg));
    }

  }
}

// adding parameter kualitatif
export const addParameterKualitatif = (token, newParameterKualitatif) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifRequest());

    try {
      const rawResponse = await axios({
          method: "POST",
          url: 'api/parameter-kualitatif',
          baseURL: backendUrl,
          headers: {
            Authorization : `Bearer ${token}`
          },
          data: newParameterKualitatif,
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
      });

      const response = rawResponse.data;

      dispatch({
        type: ADD_PARAMETER_KUALITATIF,
        payload: response
      });
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

export const resetAddParameterKualitatif = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_PARAMETER_KUALITATIF,
      payload: []
    })
  }
}

// update parameter kualitatif
export const updateParameterKualitatif = ({id, token , altered}) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifRequest());

    try {
      const rawResponse = await axios({
        method: "PUT",
        url: 'api/parameter-kualitatif/'+id,
        baseURL: backendUrl,
        headers : {
          Authorization: `Bearer ${token}`
        },
        data: altered,
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });
      const response = rawResponse.data;
      dispatch({
        type: UPDATE_PARAMETER_KUALITATIF,
        payload: response
      });
    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

export const resetUpdateParameterKualitatif = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PARAMETER_KUALITATIF,
      payload: []
    });
  }
}

// delete parameter kualitatif
export const deleteParameterKualitatif = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifRequest());

    try {
      await axios({
        method: "DELETE",
        url: 'api/parameter-kualitatif/'+id,
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
          type: DELETE_PARAMETER_KUALITATIF,
          payload: responseData
        })
      }).catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifFailure(errorMsg));
      });

    } catch (error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

export const resetDeleteParameterKualitatif = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PARAMETER_KUALITATIF,
      payload: []
    });
  }
}
