import {
  FETCH_ALL_PARAMETER_KUANTITATIF_REQUEST,
  FETCH_ALL_PARAMETER_KUANTITATIF_SUCCESS,
  FETCH_ALL_PARAMETER_KUANTITATIF_FAILURE,
  COUNT_PARAMETER_KUANTATIF,
  ADD_PARAMETER_KUANTITATIF,
  UPDATE_PARAMETER_KUANTITATIF,
  GET_PARAMETER_KUANTITATIF,
  DELETE_PARAMETER_KUANTITATIF
} from "../../constants/ActionTypes";
import axios from 'util/Api';
import { backendUrl } from "util/Api";
import {
  addParameterversion,
  resetAddParameterversion,
} from "./Parameterversion";

export const fetchAllParameterKuantitatifRequest = () => {
  return {
    type: FETCH_ALL_PARAMETER_KUANTITATIF_REQUEST
  }
}

export const fetchAllParameterKuantitatifSuccess = parameterkuantitatif => {
  return {
    type: FETCH_ALL_PARAMETER_KUANTITATIF_SUCCESS,
    payload: parameterkuantitatif
  }
}

export const fetchAllParameterKuantitatifFailure = error => {
  return {
    type: FETCH_ALL_PARAMETER_KUANTITATIF_FAILURE,
    payload: error
  }
}

export const fetchAllParameterKuantitatif = ({token, page, searchData}) => {
  if(typeof searchData === 'undefined'){
    return (dispatch) => {
      dispatch(fetchAllParameterKuantitatifRequest());
      axios.get(`api/parameter-kuantitatif?page=${page}`, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        const parameterkuantitatif = response.data.data.rows;
        dispatch(fetchAllParameterKuantitatifSuccess(parameterkuantitatif));
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
      })
    }
  } else {
    return (dispatch) => {
      dispatch(fetchAllParameterKuantitatifRequest());

      var parameters = '';
      var searchParameters = '';

      let paramColumn = [
        "risk_id","name","level","penomoran","urutan_sub","bulan","tahun","id_indikator_pembilang",
        "id_indikator_penyebut","ratio_manual","bobot","induk_id","pr_low","pr_lowtomod",
        "pr_mod","pr_modtohigh","pr_high"
      ];

      let searchCounter = 0;

      let paramValue = [
        searchData.risk_id,searchData.name,searchData.level,searchData.penomoran,searchData.urutan_sub,searchData.bulan,searchData.tahun,searchData.id_indikator_pembilang,
        searchData.id_indikator_penyebut,searchData.ratio_manual,searchData.bobot,searchData.induk_id,searchData.pr_low,searchData.pr_lowtomod,
        searchData.pr_mod,searchData.pr_modtohigh,searchData.pr_high
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
      axios.get('api/parameter-kuantitatif?'+searchParameters, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        if(typeof response.data.data !== 'undefined'){
          const count = response.data.data.rows;
          dispatch({type: COUNT_PARAMETER_KUANTATIF, payload: count.length});
        } else {
          dispatch({type: COUNT_PARAMETER_KUANTATIF, payload: 0});
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
      })

      // get data
      axios.get('api/parameter-kuantitatif?page='+page+parameters, {
        headers: {
          Authorization: "Bearer "+token
        }
      }).then(response => {
        if(typeof response.data.data !== 'undefined'){
          const parameterkuantitatif = response.data.data.rows;
          dispatch(fetchAllParameterKuantitatifSuccess(parameterkuantitatif));
        } else {
          dispatch(fetchAllParameterKuantitatifSuccess([]));
        }
      }).catch(error => {
        const errorMsg = error.message;
        dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
      })

    }

  }

}

export const countAllParameterKuantitatif = (token) => {
    return (dispatch) => {
        dispatch(fetchAllParameterKuantitatifRequest());

        axios.get('api/parameter-kuantitatif',{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then((response) => {
          const parameterkuantitatif = response.data.data.rows;
          dispatch({type: COUNT_PARAMETER_KUANTATIF, payload: parameterkuantitatif.length});
        }).catch(function (error) {
          const errorMsg = error.message;
          dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
        });
    }
};

export const addParameterKuantitatif = (token, newParameterKuantitatif) => {

  return async (dispatch) => {
    dispatch(fetchAllParameterKuantitatifRequest());

    try {

      let bodyData = {
        risk_id : newParameterKuantitatif.risk_id,
        name : newParameterKuantitatif.name,
        level : newParameterKuantitatif.level,
        induk_id : newParameterKuantitatif.induk_id,
        penomoran : newParameterKuantitatif.penomoran,
        pr_low : newParameterKuantitatif.pr_low,
        pr_lowtomod : newParameterKuantitatif.pr_lowtomod,
        pr_mod : newParameterKuantitatif.pr_mod,
        pr_modtohigh : newParameterKuantitatif.pr_modtohigh,
        pr_high : newParameterKuantitatif.pr_high,
        bobot : newParameterKuantitatif.bobot,
        jenis_nilai_id: newParameterKuantitatif.jenis_nilai_id,
        parameter_faktor_id: newParameterKuantitatif.parameter_faktor_id,
        ratio_indikator_formula : newParameterKuantitatif.ratio_indikator_formula
      }

      const rawResponse = await axios({
        method: "POST",
        url: 'api/parameter-kuantitatif',
        baseURL: backendUrl,
        headers : {
          Authorization: `Bearer ${token}`
        },
        data: bodyData,
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
        }
      });
      const response = rawResponse.data;
      dispatch({
        type: ADD_PARAMETER_KUANTITATIF,
        payload: response
      });

      // if success
      if(response.statusCode === 200 || response.statusCode === 201){

        // update master version
        if(newParameterKuantitatif.masterversiondata.length > 0){
          // add all mater version list to parameter version
          for(let j=0;j<newParameterKuantitatif.masterversiondata.length;j++){
            dispatch(addParameterversion(token, {
              ingredients_id: response.data.id,
              version_id: newParameterKuantitatif.masterversiondata[j].id
            }))
            dispatch(resetAddParameterversion())
          }
        }
      }


    } catch(error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
    }

  }
}

export const resetAddParameterKuantitatif = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_PARAMETER_KUANTITATIF,
      payload: []
    });
  }
}

export const updateParameterKuantitatif = ({id, token, altered}) => {

  return async (dispatch) => {
    dispatch(fetchAllParameterKuantitatifRequest());

    try {
      const rawResponse = await axios({
        method: "PUT",
        url: 'api/parameter-kuantitatif/'+id,
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
        type: UPDATE_PARAMETER_KUANTITATIF,
        payload: response
      });
    } catch(error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
    }


  }
}

export const resetUpdateParameterKuantitatif = () => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PARAMETER_KUANTITATIF,
      payload: []
    });
  }
}

export const getParameterKuanttiatif = ({token, id}) => {
  return (dispatch) => {
    dispatch(fetchAllParameterKuantitatifRequest());

    axios.get('api/parameter-kuantitatif/'+id, {
      'Content-Type': 'application/json',
      Authorization: "Bearer "+token
    }).then((response) => {
      const parameterkuantitatif = response.data;

      if(parameterkuantitatif.statusCode === 201 || parameterkuantitatif.statusCode === 200) {
        dispatch({
          type: GET_PARAMETER_KUANTITATIF,
          payload: parameterkuantitatif
        });
      } else {
        dispatch(fetchAllParameterKuantitatifFailure(parameterkuantitatif.message));
      }
    }).catch(function (error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
    });
  }
}

export const deleteParameterKuantitatif = (token, id) => {
  return async (dispatch, getState) => {

    dispatch(fetchAllParameterKuantitatifRequest());

    try {
      await axios({
        method: "DELETE",
        url: 'api/parameter-kuantitatif/'+id,
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
          type: DELETE_PARAMETER_KUANTITATIF,
          payload: responseData
        });
      }).catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
      });


    } catch(error) {
      const errorMsg = error.message;
      dispatch(fetchAllParameterKuantitatifFailure(errorMsg));
    }
  }
}

export const resetDeleteParameterKuantitatif = () => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_PARAMETER_KUANTITATIF,
      payload: []
    });
  }
}
