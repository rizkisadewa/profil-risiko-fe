import {
  FETCH_ALL_RATIO_INDIKATOR_FORMULA_REQUEST,
  FETCH_ALL_RATIO_INDIKATOR_FORMULA_SUCCESS,
  FETCH_ALL_RATIO_INDIKATOR_FORMULA_FAILURE,
  UPDATE_RATIO_INDIKATOR_FORMULA,
  COUNT_RATIO_INDIKATOR_FORMULA,
  ADD_RATIO_INDIKATOR_FORMULA,
  DELETE_RATIO_INDIKATOR_FORMULA,
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";

export const fetchAllRatioIndikatorFormulaRequest = () => {
  return {
    type: FETCH_ALL_RATIO_INDIKATOR_FORMULA_REQUEST
  }
}

export const fetchAllRatioIndikatorFormulaSuccess = ratioindikatorformula => {
  return {
    type: FETCH_ALL_RATIO_INDIKATOR_FORMULA_SUCCESS,
    payload: ratioindikatorformula
  }
}

export const fetchAllRatioIndikatorFormulaFailure = error => {
  return {
    type: FETCH_ALL_RATIO_INDIKATOR_FORMULA_FAILURE,
    payload: error
  }
}

// fetch all parameter
export const fetchAllRatioIndikatorFormula = ({token , searchData}) => {
  if(typeof searchData === 'undefined'){
    // if do not have any search data
    return(async (dispatch) => {
      dispatch(fetchAllRatioIndikatorFormulaRequest());

      try {
        // execute axios validate status < 500
        await axios({
          method: "GET",
          url: `/api/ratio-indikator-formula`,
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
          if(responseData.data.statusCode === 200 || responseData.data.statusCode === 201){
            dispatch(fetchAllRatioIndikatorFormulaSuccess(responseData.data.rows));
            dispatch({
              type: COUNT_RATIO_INDIKATOR_FORMULA,
              payload: responseData.data.rows.length
            })
          } else {
            dispatch(fetchAllRatioIndikatorFormulaFailure(responseData.message));
            dispatch({
              type: COUNT_RATIO_INDIKATOR_FORMULA,
              payload: 0
            });
          }
        }).catch((error) => {
          // if success dispatch the fetch failure
          const errorMsg = error.message;
          dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
        })
      } catch (error) {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
      }
    })
  } else {
    return(async (dispatch) => {
      dispatch(fetchAllRatioIndikatorFormulaRequest());

      var searchParameters = '';

      let paramColumn = [
        "seq",
        "ingredients_id",
        "ratio_indikator_id",
        "operations",
        "ingredients_name",
        "ratio_name"
      ];

      let searchCounter = 0;

      let paramValue = [
        searchData.seq,
        searchData.ingredients_id,
        searchData.ratio_indikator_id,
        searchData.operations,
        searchData.ingredients_name,
        searchData.ratio_name
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
        url: `/api/ratio-indikator-formula?${searchParameters}`,
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

        if(responseData.statusCode === 200 || responseData.statusCode === 201){
          console.log("HASIL COUNT : "+responseData.data.rows.length);
          console.log(typeof responseData.data.rows.length);
          dispatch(fetchAllRatioIndikatorFormulaSuccess(responseData.data.rows));
          dispatch({
            type: COUNT_RATIO_INDIKATOR_FORMULA,
            payload: responseData.data.rows.length
          })
        } else {
          dispatch(fetchAllRatioIndikatorFormulaFailure(responseData.message));
          dispatch({
            type: COUNT_RATIO_INDIKATOR_FORMULA,
            payload: 0
          });
        }
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
      })

    })
    // finish
  }
}

export const countAllRatioIndikatorFormula = (token) => {
  return async (dispatch) => {
    try {

      // execute axios validate status < 500
      // execute axios validate status < 500
      await axios({
        method: "GET",
        url: `/api/ratio-indikator-formula`,
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
        if(responseData.data.statusCode === 200 || responseData.data.statusCode === 201){
          dispatch({
            type: COUNT_RATIO_INDIKATOR_FORMULA,
            payload: responseData.data.rows.length
          })
        } else {
          dispatch({
            type: COUNT_RATIO_INDIKATOR_FORMULA,
            payload: 0
          });
        }
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
      })

    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
    }
  }
}

// adding ratio indikator formula
export const addRatioIndikatorFormula = (token, newData) => {
  return async (dispatch) => {
    dispatch(fetchAllRatioIndikatorFormulaRequest());

    try {

      await axios({
        method: "POST",
        url: '/api/ratio-indikator-formula',
        baseURL: backendUrl,
        data: newData,
        headers: {
          Authorization : `Bearer ${token}`
        },
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });

    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
    }
  }
}

export const resetAddRatioIndikatorFormula = () => {
  return async(dispatch) => {
    dispatch({
      type: ADD_RATIO_INDIKATOR_FORMULA,
      payload: []
    })
  }
}

// update ratio indikator formula
export const updateRatioIndikatorFormula = ({id, token, altered}) => {
  return async (dispatch) => {
    dispatch(fetchAllRatioIndikatorFormula());

    try {

      const rawResponse = await axios({
        method: "PUT",
        url : '/api/ratio-indikator-formula/'+id,
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
        type: UPDATE_RATIO_INDIKATOR_FORMULA,
        payload: response
      });
    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
    }
  }
}

export const resetUpdateRatioIndikatorFormula = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_RATIO_INDIKATOR_FORMULA,
      payload: []
    })

  }
}


// delete ratio indikator formula
export const deleteRatioIndikatorFormula = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchAllRatioIndikatorFormula());

    try {

      await axios({
        method: "DELETE",
        url: '/api/ratio-indikator-formula/'+id,
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
          type: DELETE_RATIO_INDIKATOR_FORMULA,
          payload: responseData
        });
      }).catch((error) => {
        // if success dispatch the fetch failure
        const errorMsg = error.message;
        dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
      })
    } catch (error) {
      // if success dispatch the fetch failure
      const errorMsg = error.message;
      dispatch(fetchAllRatioIndikatorFormulaFailure(errorMsg));
    }
  }
}

export const resetDeleteRatioIndikatorFormula = () => {
  return (dispatch) => {
    dispatch({
      type: DELETE_RATIO_INDIKATOR_FORMULA,
      payload: []
    })
  }
}
