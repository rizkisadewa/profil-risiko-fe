import {
  KPMR_FETCH_ALL_PARAMETER_KUALITATIF_REQUEST,
  KPMR_FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS,
  KPMR_FETCH_ALL_PARAMETER_KUALITATIF_FAILURE,
  KPMR_COUNT_PARAMETER_KUALIATIF,
  KPMR_ADD_PARAMETER_KUALITATIF,
  KPMR_DELETE_PARAMETER_KUALITATIF,
  KPMR_UPDATE_PARAMETER_KUALITATIF
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from 'util/Api';

export const kpmrFetchAllParameterKualitatifRequest = () => {
  return {
    type : KPMR_FETCH_ALL_PARAMETER_KUALITATIF_REQUEST
  }
}

export const kpmrFetchAllParameterKualitatifSuccess = parameterkualitatif => {
  return {
    type: KPMR_FETCH_ALL_PARAMETER_KUALITATIF_SUCCESS,
    payload: parameterkualitatif
  }
}

export const kpmrFetchAllParameterKualitatifFailure = error => {
  return {
    type: KPMR_FETCH_ALL_PARAMETER_KUALITATIF_FAILURE,
    payload: error
  }
}

// fetch all parameter kualitatif for KPMR
export const kpmrFetchAllParameterKualitatif = ({token, page, searchData}) => {
  // check if search Data is undefined
  if(typeof searchData === 'undefined'){
    return(async (dispatch) => {
      dispatch(kpmrFetchAllParameterKualitatifRequest());

      try {

        // execute axios validate status < 500
        await axios({
          method: "GET",
          url: `/api/parameter-kualitatif-general?page=${page}&is_relate_to_rin=true`,
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
            dispatch(kpmrFetchAllParameterKualitatifSuccess(responseData.data.rows));
            dispatch({
              type: KPMR_COUNT_PARAMETER_KUALIATIF,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(kpmrFetchAllParameterKualitatifFailure(responseData.message));
            dispatch({
              type: KPMR_COUNT_PARAMETER_KUALIATIF,
              payload: 0
            });
          }
        }).catch((error) => {
          // if error send to the reducer of fetch failure
          const errorMsg = error.message;
          dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
        })

      } catch (error) {
        // if error send to the reducer of fetch failure
        const errorMsg = error.message;
        dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
      }
    });
  } else {
    return(async (dispatch) => {
      dispatch(kpmrFetchAllParameterKualitatifRequest());

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
          url: `/api/parameter-kualitatif-general?page=${page}&is_relate_to_rin=true${searchParameters}`,
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
            dispatch(kpmrFetchAllParameterKualitatifSuccess(responseData.data.rows));
            dispatch({
              type: KPMR_COUNT_PARAMETER_KUALIATIF,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(kpmrFetchAllParameterKualitatifFailure(responseData.message));
            dispatch({
              type: KPMR_COUNT_PARAMETER_KUALIATIF,
              payload: 0
            });
          }
        }).catch((error) => {
          // if error send to the reducer of fetch failure
          const errorMsg = error.message;
          dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
        })


      } catch (error) {
        // if error send to the reducer of fetch failure
        const errorMsg = error.message;
        dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
      }
    });
  }
}

// count the data for pagination need
export const kpmrCountAllParameterKualitatif = (token) => {
  return async(dispatch) => {
    try {
      await axios({
        method: "GET",
        url: `/api/parameter-kualitatif-general?jenis='KPMR'`,
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
          dispatch({
            type: KPMR_COUNT_PARAMETER_KUALIATIF,
            payload: response.data.rows.length
          });
        } else {
          dispatch({
            type: KPMR_COUNT_PARAMETER_KUALIATIF,
            payload: 0
          });
        }
      }).catch((error) => {
        // if error send to the reducer of fetch failure
        const errorMsg = error.message;
        dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
      })

    } catch (error) {
      // if error
      const errorMsg = error.message;
      dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

// add parameter kualitatif for KPMR
export const kpmrAddParameterKualitatif = (token, newData) => {
  return async (dispatch) => {
    dispatch(kpmrFetchAllParameterKualitatifRequest());

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
            type: KPMR_ADD_PARAMETER_KUALITATIF,
            payload: responseData
          });
        }
      }).catch((error) => {
        // if error send to the reducer of fetch failure
        const errorMsg = error.message;
        dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
      })


    } catch (error) {
      // if error
      const errorMsg = error.message;
      dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

export const resetKpmrAddParameterKualitatif = () => {
  return async(dispatch) => {
    dispatch({
      type: KPMR_ADD_PARAMETER_KUALITATIF,
      payload: []
    })
  }
}

// update parameter kualitatif for KPMR
export const kpmrUpdateParameterKualitatif = ({id, token, altered}) => {
  return async (dispatch) => {
    dispatch(kpmrFetchAllParameterKualitatifRequest());

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
        type: KPMR_UPDATE_PARAMETER_KUALITATIF,
        payload: response
      });

    } catch (error) {
      // if error
      const errorMsg = error.message;
      dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

export const resetKpmrUpdateParameterKualitatif = () => {
  return (dispatch) => {
    dispatch({
      type: KPMR_UPDATE_PARAMETER_KUALITATIF,
      payload: []
    })
  }
}

// delete parameter kualitatif for KPMR
export const kpmrDeleteParameterKualitatif = (token, id) => {
  return async (dispatch) => {
    dispatch(kpmrFetchAllParameterKualitatifRequest());

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
          type: KPMR_DELETE_PARAMETER_KUALITATIF,
          payload: responseData
        })
      }).catch((error) => {
        // if error
        const errorMsg = error.message;
        dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
      })
    } catch (error) {
      // if error
      const errorMsg = error.message;
      dispatch(kpmrFetchAllParameterKualitatifFailure(errorMsg));
    }
  }
}

export const resetKpmrDeleteParameterKualitatif = () => {
  return async (dispatch) => {
    dispatch({
      type: KPMR_DELETE_PARAMETER_KUALITATIF,
      payload: []
    })
  }
}
