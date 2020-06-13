import {
  UPDATE_MASTER_VERSION,
  ADD_MASTER_VERSION,
  DELETE_MASTER_VERSION,
  COUNT_MASTER_VERSION,
  FETCH_ALL_MASTER_VERSION_REQUEST,
  FETCH_ALL_MASTER_VERSION_SUCCESS,
  FETCH_ALL_MASTER_VERSION_FAILURE
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllMasterVersionRequest = () => {
  return {
    type: FETCH_ALL_MASTER_VERSION_REQUEST
  }
}

export const fetchAllMasterVersionSuccess = masterversion => {
  return {
    type: FETCH_ALL_MASTER_VERSION_SUCCESS,
    payload: masterversion
  }
}

export const fetchAllMasterVersionFailure = error => {
  return {
    type : FETCH_ALL_MASTER_VERSION_FAILURE,
    payload: error
  }
}

// fetch all
export const fetchAllMasterVersion = ({token, searchData}) => {
  if(typeof searchData === 'undefined'){
    // if do not have any searching data
    return(async (dispatch) => {
      dispatch(fetchAllMasterVersionRequest());

      try {
        // execute axios validate status < 500
        await axios({
          method: 'GET',
          url: `/api/master-version`,
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
            dispatch(fetchAllMasterVersionSuccess(responseData.data.rows));
            dispatch({
              type: COUNT_MASTER_VERSION,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(fetchAllMasterVersionFailure(responseData.message));
          }
        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllMasterVersionFailure(errorMsg));
        });

      } catch (error) {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllMasterVersionFailure(errorMsg));
      }
    })
  } else {
    return(async (dispatch) => {
      dispatch(fetchAllMasterVersionRequest());

      try {
        var searchParameters = '';

        let paramColumn = [
          "id", "version_name", "created_by"
        ];

        let searchCounter = 0;

        let paramValue = [
          searchData.id, searchData.version_name, searchData.created_by
        ]

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

        // get total
        await axios({
          method: "GET",
          url: `/api/master-version?${searchParameters}`,
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
            dispatch(fetchAllMasterVersionSuccess(responseData.data.rows));
            dispatch({
              type: COUNT_MASTER_VERSION,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(fetchAllMasterVersionFailure(responseData.message));
          }
        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllMasterVersionFailure(errorMsg));
        });

      } catch (error) {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllMasterVersionFailure(errorMsg));
      }
    })
  }
}

export const countAllMasterVersion = (token) => {
  return async (dispatch) => {
    dispatch(fetchAllMasterVersionRequest());

    try {
      // execute axios validate status < 500
      await axios({
        method: 'GET',
        url: `/api/master-version`,
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
          dispatch({
            type: COUNT_MASTER_VERSION,
            payload: responseData.data.rows.length
          });
        } else {
          dispatch(fetchAllMasterVersionFailure(responseData.message));
        }
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllMasterVersionFailure(errorMsg));
      });

    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllMasterVersionFailure(errorMsg));
    }
  }
}

// adding master version
export const addMasterVersion = (token, newData) => {
  return async(dispatch) => {
    dispatch(fetchAllMasterVersionRequest());

    try {

      const rawResponse = await axios({
        method: "POST",
        url: '/api/master-version',
        baseURL: backendUrl,
        data: newData,
        headers: {
          Authorization : `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      dispatch({
        type: ADD_MASTER_VERSION,
        payload: response
      });
    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllMasterVersionFailure(errorMsg));
    }
  }
}

export const resetAddMasterVersion = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_MASTER_VERSION,
      payload: []
    })
  }
}

// update master version
export const updateMasterversion = ({id, token, altered}) => {
  return async (dispatch) => {
    dispatch(fetchAllMasterVersionRequest());

    try {
      const rawResponse = await axios({
        method: "PUT",
        url: '/api/master-version/'+id,
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
        type: UPDATE_MASTER_VERSION,
        payload: response
      });
    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllMasterVersionFailure(errorMsg));
    }
  }
}

export const resetUpdateMasterVersion = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MASTER_VERSION,
      payload: []
    });
  }
}

// delete master version
export const deleteMasterVersion = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchAllMasterVersionRequest());

    try {

      await axios({
        method: "DELETE",
        url: '/api/master-version/'+id,
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
          type: DELETE_MASTER_VERSION,
          payload: responseData
        });
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllMasterVersionFailure(errorMsg));
      })

    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllMasterVersionFailure(errorMsg));
    }
  }
}

export const resetDeleteMasterVersion = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_MASTER_VERSION,
      payload: []
    })
  }
}
