import {
  ADD_PARAMETER_VERSION,
  DELETE_PARAMETER_VERSION,
  FETCH_ALL_PARAMETER_VERSION_REQUEST,
  FETCH_ALL_PARAMETER_VERSION_SUCCESS,
  FETCH_ALL_PARAMETER_VERSION_FAILURE,
  COUNT_PARAMETER_VERSION
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllParameterversionRequest = () => {
  return {
    type: FETCH_ALL_PARAMETER_VERSION_REQUEST
  }
}

export const fetchAllParameterversionSuccess = parameterversion => {
  return {
    type: FETCH_ALL_PARAMETER_VERSION_SUCCESS,
    payload: parameterversion
  }
}

export const fetchAllParameterversionFailure = error => {
  return {
    type: FETCH_ALL_PARAMETER_VERSION_FAILURE,
    payload: error
  }
}

// fetch all parameter version
export const fetchAllParameterversion = ({token, searchData}) => {
  if(typeof searchData === 'undefined'){
    // if do not have any searching data
    return(async (dispatch) => {
      dispatch(fetchAllParameterversionRequest());

      try {
        // execute axios validate status < 500
        await axios({
          method: "GET",
          url: `/api/parameter-version`,
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
            dispatch(fetchAllParameterversionSuccess(responseData.data.rows));
            dispatch({
              type: COUNT_PARAMETER_VERSION,
              payload: responseData.data.rows.length
            });
          } else {
            dispatch(fetchAllParameterversionFailure(responseData.message));
            dispatch({
              type: COUNT_PARAMETER_VERSION,
              payload: 0
            });
          }
        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllParameterversionFailure(errorMsg));
        });

      } catch (error) {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterversionFailure(errorMsg));
      }
    })

  } else {
    return(async (dispatch) => {
      try{
        var searchParameters = '';

        let paramColumn = [
          "version_id",
          "ingredients_id",
          "ingredients_name",
          "version_name"
        ];

        let searchCounter = 0;

        let paramValue = [
          searchData.version_id,
          searchData.ingredients_id,
          searchData.ingredients_name,
          searchData.version_name
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

        // get total
        await axios({
          method: "GET",
          url: `/api/parameter-version?${searchParameters}`,
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
            dispatch(fetchAllParameterversionSuccess(responseData.data.rows));

          } else {
            dispatch(fetchAllParameterversionFailure(responseData.message));
            dispatch({
              type: COUNT_PARAMETER_VERSION,
              payload: 0
            });
          }
        });
      } catch (error){
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterversionFailure(errorMsg));
      }

    })
  }
}

export const countAllParameterversion = (token) => {
  return async (dispatch) => {
    try {
      // execute axios validate status < 500
      await axios({
        method: "GET",
        url: `/api/parameter-version`,
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
            type: COUNT_PARAMETER_VERSION,
            payload: responseData.data.rows.length
          });
        } else {
          dispatch({
            type: COUNT_PARAMETER_VERSION,
            payload: 0
          });
        }
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllParameterversionFailure(errorMsg));
      });

    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllParameterversionFailure(errorMsg));
    }
  }
}

// adding parameter version
export const addParameterversion = (token, body) => {
  return async(dispatch) => {
    dispatch(fetchAllParameterversionRequest());

    try {

      const rawResponse = await axios({
        method: "POST",
        url : "/api/parameter-version",
        baseURL: backendUrl,
        headers: {
          Authorization : `Bearer ${token}`
        },
        data: body,
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

      const response = rawResponse.data;

      dispatch({
        type: ADD_PARAMETER_VERSION,
        payload: response
      });
    } catch (error) {
      // if failure dispatch the action
      const errorMsg = error.message;
      dispatch(fetchAllParameterversion(errorMsg));
    }
  }
}

export const resetAddParameterversion = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_PARAMETER_VERSION,
      payload: []
    });
  }
}


// delete parameter version
export const deleteParameterversion = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchAllParameterversionRequest());

    try {
      await axios({
        method: "DELETE",
        url: '/api/parameter-version/'+id,
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
          type: DELETE_PARAMETER_VERSION,
          payload: responseData
        });
      }).catch((error) => {
        // if failure dispatch the action
        const errorMsg = error.message;
        dispatch(fetchAllParameterversion(errorMsg));
      })
    } catch (error) {
      // if failure dispatch the action
      const errorMsg = error.message;
      dispatch(fetchAllParameterversion(errorMsg));
    }
  }
}

export const resetDeleteParameterversion = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PARAMETER_VERSION,
      payload: []
    })
  }
}
