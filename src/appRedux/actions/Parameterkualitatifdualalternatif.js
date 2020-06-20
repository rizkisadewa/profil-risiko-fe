import {
  FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_REQUEST,
  FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_SUCCESS,
  FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_FAILURE,
  COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
  ADD_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
  DELETE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
  UPDATE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from 'util/Api';

export const fetchAllParameterKualitatifDualAlternatifRequest = () => {
  return {
    type: FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_REQUEST
  }
}

export const fetchAllParameterKualitatifDualAlternatifSuccess = parameterkualitatifdualalternatif => {
  return {
    type: FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_SUCCESS,
    payload: parameterkualitatifdualalternatif
  }
}

export const fetchAllParameterKualitatifDualAlternatifFailure = error => {
  return {
    type: FETCH_ALL_PARAMETER_KUALITATIF_DUAL_ALTERNATIF_FAILURE,
    payload: error
  }
}

// fetch all parameter kualiatatif dual alternatif
export const fetchAllParameterKualitatifDualAlternatif = ({token, page, searchData}) => {
  // check if searchData is undefined
  if(typeof searchData === 'undefined'){
    return(async (dispatch) => {
      dispatch(fetchAllParameterKualitatifDualAlternatifRequest());

      try {

        // execute axios validate status < 500
        await axios({
          method: "GET",
          url: `/api/parameter-kualitatif-general?page=${page}`,
          baseURL: backendUrl,
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }).then((response) => {
          // if success then execute and send to payload
          const responseData = response.data;
          if(responseData.statusCode === 200 || responseData.statusCode === 201){
            dispatch(fetchAllParameterKualitatifDualAlternatifSuccess(responseData.data.rows));
            dispatch({
              type: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(fetchAllParameterKualitatifDualAlternatifFailure(responseData.message));
            dispatch({
              type: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
              payload: 0
            })
          }
        }).catch((error) => {
          // if error , dispatch error
          const errorMsg = error.message;
          dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
        })

      } catch (error) {
        // if success dispatch the fecth failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
      }
    })
  } else {
    return(async (dispatch) => {
      dispatch(fetchAllParameterKualitatifDualAlternatifRequest());

      try {
        var searchParameters = '';

        let paramColumn = [
          "risk_id",
          "name",
          "level",
          "induk_id",
          "penomoran",
          "urutan_sub",
          "bobot",
          "version",
          "bulan",
          "tahun",
          "jenis",
          "jenis_nilai_id",
        ];

        let searchCounter = 1;

        let paramValue = [
          searchData.risk_id,
          searchData.name,
          searchData.level,
          searchData.induk_id,
          searchData.penomoran,
          searchData.urutan_sub,
          searchData.bobot,
          searchData.version,
          searchData.bulan,
          searchData.tahun,
          searchData.jenis,
          searchData.jenis_nilai_id,
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

              if(searchCounter > 1) {
                searchParameters += '&';
              }
              searchParameters += `${paramColumn[i]}=${paramValue[i]}`;

            }
          }
        }

        // execute axios validate status < 500
        await axios({
          method: "GET",
          url: `/api/parameter-kualitatif-general?page=${page}${searchParameters}`,
          baseURL: backendUrl,
          headers: {
            Authorization: `Bearer ${token}`
          },
          validateStatus: function(status) {
            return status < 500; // Reject only if the status code is greater than or equal to 500
          }
        }).then((response) => {
          // if success then execute and send to payload
          const responseData = response.data;
          if(responseData.statusCode === 200 || responseData.statusCode === 201){
            dispatch(fetchAllParameterKualitatifDualAlternatifSuccess(responseData.data.rows));
            dispatch({
              type: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(fetchAllParameterKualitatifDualAlternatifFailure(responseData.message));
            dispatch({
              type: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
              payload: 0
            })
          }
        }).catch((error) => {
          // if error , dispatch error
          const errorMsg = error.message;
          dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
        });

      } catch (error) {
        // if success dispatch the fecth failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
      }
    })
  }
}

// count the date for pagination need
export const countAllParameterKualitatifDualAlternatif = (token) => {
  return async(dispatch) => {
    try {
      await axios({
        method: "GET",
        url: `/api/parameter-kualitatif-general?jenis_nilai_id=21`,
        baseURL: backendUrl,
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }).then((response) => {
        // if success then execute and send to payload
        const responseData = response.data;
        if(responseData.data.statusCode === 200 || responseData.data.statusCode === 201){
          dispatch({
            type: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
            payload: responseData.data.rows.length
          });
        } else {
          dispatch({
            type: COUNT_PARAMETER_KUALIATIF_DUAL_ALTERNATIF,
            payload: 0
          })
        }
      }).catch((error) => {
        // if error , dispatch error
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
      });
    } catch (error) {
      // if success dispatch the fecth failure
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
    }
  }
}

// add parameter kualitatif dual alternatif
export const addParameterKualitatifDualAlternatif = (token, newData) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifDualAlternatifRequest());

    try {
      await axios({
        method: "POST",
        url : '/api/parameter-kualitatif-general',
        baseURL: backendUrl,
        data: newData,
        headers: {
          Authorization : `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      }).then((response) => {
        // if success then send to payload
        const responseData = response.data;
        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          dispatch({
            type: ADD_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
            payload: responseData
          });
        }
      })

    } catch (error) {
      // if success dispatch the fecth failure
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
    }
  }
}

export const resetAddParameterKualitatifDualAlternatif = () => {
  return async(dispatch) => {
    dispatch({
      type: ADD_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
      payload: []
    })
  }
}

// update parameter kualitatif dual alternatif
export const updateParameterKualitatifDualAlternatif = ({id, token, altered}) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifDualAlternatifRequest());

    try {
      const rawResponse = await axios({
        method: "PUT",
        url: '/api/parameter-kualitatif-general/'+id,
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
        type: UPDATE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
        payload: response
      });

    } catch (error) {
      // if success dispatch the fecth failure
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
    }
  }
}

export const resetUpdateParameterKualitatifDualAlternatif = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
      payload: []
    })
  }
}

// delete parameter kualitatif dual alternatif
export const deleteParameterKualitatifDualAlternatif = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterKualitatifDualAlternatifRequest());

    try {

      await axios({
        method: "DELETE",
        url: '/api/parameter-kualitatif-general/'+id,
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
          type: DELETE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
          payload: responseData
        });
      }).catch((error) => {
        // if success dispatch the fecth failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
      });

    } catch (error) {
      // if success dispatch the fecth failure
      const errorMsg = error.message;
      dispatch(fetchAllParameterKualitatifDualAlternatifFailure(errorMsg));
    }
  }
}

export const resetDeleteParameterKualitatifDualAlternatif = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PARAMETER_KUALITATIF_DUAL_ALTERNATIF,
      payload: []
    })
  }
}
