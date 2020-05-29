import {
  FETCH_ALL_INGREDIENTS_REQUEST,
  FETCH_ALL_INGREDIENTS_FAILURE,
  FETCH_ALL_INGREDIENTS_SUCCESS
} from '../../constants/ActionTypes';
import axios from 'util/Api';

export const fetchAllIngredientsRequest = () => {
  return {
    type: FETCH_ALL_INGREDIENTS_REQUEST
  }
}

export const fetchAllIngredientsSuccess = ingredients => {
  return {
    type: FETCH_ALL_INGREDIENTS_SUCCESS,
    payload: ingredients
  }
}

export const fetchAllIngredientsFailure = error => {
  return {
    type: FETCH_ALL_INGREDIENTS_FAILURE,
    payload: error
  }
}

export const fetchAllIngredients = ({token, searchData})=> {
  if(typeof searchData === 'undefined') {
    return (dispatch) => {
      dispatch(fetchAllIngredientsRequest());
      axios.get(`api/ingredients`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const ingredients = response.data.data.rows;
        dispatch(fetchAllIngredientsSuccess(ingredients));
      }).catch(error => {
        const errorMsg = error.message;
          dispatch(fetchAllIngredientsFailure(errorMsg));
      })
    }
  } else {
    return (dispatch) => {
      dispatch(fetchAllIngredientsRequest());;

      // initial parameter
      // var parameters = '';
      var searchParameters = '';
      let searchCounter = 0;
      let paramColumn = ["page", "risk_id", "penomoran", "name", "level", "bobot",
      "created_by", "jenis", "risk_nama"];
      let paramValue = [searchData.page, searchData.risk_id, searchData.penomoran,
        searchData.name, searchData.level, searchData.bobot, searchData.created_by,
        searchData.jenis, searchData.risk_nama];

      // looging all columns
      for(let i=0;i<paramColumn.length;i++){
        // if contain value, then execute
        if(typeof paramValue[i] !== 'undefined'){
          // condition for number greater than 0
          if(paramValue[i] !== ""){
            searchCounter += 1;
            // parameters += `&${paramColumn[i]}=${paramValue[i]}`;

            if(searchCounter > 1) {
              searchParameters += '&';
            }
            searchParameters += `${paramColumn[i]}=${paramValue[i]}`;
          }
        }
      }

      // combine all query and execute
      axios.get(`api/ingredients?`+searchParameters, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const ingredients = response.data.data.rows;
        dispatch(fetchAllIngredientsSuccess(ingredients));
      }).catch(error => {
        const errorMsg = error.message;
          dispatch(fetchAllIngredientsFailure(errorMsg));
      });

    }
  }
  // Finish
}
